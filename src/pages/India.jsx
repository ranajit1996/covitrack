import { Grid, makeStyles, Typography } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import axios from 'axios'
import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import CardSmall from '../components/CardSmall'
import CustomChart from '../components/CustomChart'

const useStyles = makeStyles((theme) => ({
    card: {
        margin: 4,
    }
}))

function India() {
    const styles = useStyles()

    const [data, setData] = useState(undefined)
    const [stateData, setStateData] = useState(undefined)
    const [chartData, setChartData] = useState(undefined)
    const cardWidth = 140
    const cardHeight = 100

    const chartDataMonths = 1   // Number of months to show data in charts

    const tableColumnWidth = 150
    const columnInfo = [
        { field: 'state', headerName: 'State', width: tableColumnWidth + 70 },
        { field: 'confirmed', headerName: 'Confirmed', width: tableColumnWidth },
        { field: 'active', headerName: 'Active', width: tableColumnWidth },
        { field: 'recovered', headerName: 'Recovered', width: tableColumnWidth },
        { field: 'deaths', headerName: 'Deceased', width: tableColumnWidth },
        { field: 'lastUpdatedTime', headerName: 'Last Updated Time', width: tableColumnWidth + 50, sortable: false },
    ]

    useEffect(() => {
        axios.get("https://api.covid19india.org/data.json")
            .then((response) => {
                if (response.status === 200) {
                    setData(response.data["statewise"][0])
                    let tData = response.data["cases_time_series"]
                    prepareChartData(tData)
                    let sData = _.tail(response.data["statewise"])
                    prepareStatwiseData(sData)
                    console.log("data fetched...")
                }
                else {
                    alert("Error: Something wrong with response!")
                }
            })
            .catch((error) => {
                alert("Error: " + error)
            })
    }, [])

    const prepareChartData = (data) => {
        let confirmed = []
        let recovered = []
        let deceased = []
        let dates = []
        data.forEach((obj) => {
            confirmed.push(obj["dailyconfirmed"])
            recovered.push(obj["dailyrecovered"])
            deceased.push(obj["dailydeceased"])
            dates.push(obj["date"])
        })

        confirmed = _.takeRight(confirmed, chartDataMonths * 30)
        recovered = _.takeRight(recovered, chartDataMonths * 30)
        deceased = _.takeRight(deceased, chartDataMonths * 30)
        dates = _.takeRight(dates, chartDataMonths * 30)

        setChartData({
            confirmed,
            recovered,
            deceased,
            dates
        })
        console.log("chart data prepared...")
    }

    const prepareStatwiseData = (data) => {
        let sData = []
        data.forEach((obj, index) => {
            if (obj["statecode"].localeCompare("UN") !== 0) {
                sData.push({
                    id: index,
                    confirmed: parseInt(obj["confirmed"]),
                    active: parseInt(obj["active"]),
                    recovered: parseInt(obj["recovered"]),
                    deaths: parseInt(obj["deaths"]),
                    state: obj["state"],
                    lastUpdatedTime: obj["lastupdatedtime"]
                })
            }
        })
        setStateData(sData)
        console.log("state data prepared...")

    }

    return (
        <div style={{ textAlign: 'center', marginTop: '16px', overflow: 'auto' }}>

            <Grid container direction="row">
                <Grid container direction="column" alignItems="center" xs={12} lg={6}>
                    <Grid container direction="row" justify="center">
                        {/* Confirmed */}
                        <Grid item className={styles.card}>
                            {(data !== undefined) && (chartData !== undefined) && <CardSmall
                                width={cardWidth}
                                height={cardHeight}
                                title='Confirmed'
                                trendingUp={parseInt(_.last(chartData["confirmed"])) > parseInt(_.nth(chartData["confirmed"], chartData["confirmed"].length - 2))}
                                delta={data["deltaconfirmed"]}
                                total={data["confirmed"]}
                                primaryColor='#ff053a'
                                secondaryColor='#ff5177'
                                backgroundColor='#ffdfe6'
                            />}
                        </Grid>

                        {/* Active */}
                        <Grid item className={styles.card}>
                            {(data !== undefined) && (chartData !== undefined) && <CardSmall
                                width={cardWidth}
                                height={cardHeight}
                                title='Active'
                                total={data["active"]}
                                primaryColor='#007bff'
                                backgroundColor='#eff7ff'
                            />}
                        </Grid>

                        {/* Recovered */}
                        <Grid item className={styles.card}>
                            {(data !== undefined) && (chartData !== undefined) && <CardSmall
                                width={cardWidth}
                                height={cardHeight}
                                title='Recovered'
                                trendingUp={parseInt(_.last(chartData["recovered"])) > parseInt(_.nth(chartData["recovered"], chartData["recovered"].length - 2))}
                                delta={data["deltarecovered"]}
                                total={data["recovered"]}
                                primaryColor='#2ca847'
                                secondaryColor='#2ca847'
                                backgroundColor='#e4f4e7'
                            />}
                        </Grid>

                        {/* Deceased */}
                        <Grid item className={styles.card}>
                            {(data !== undefined) && (chartData !== undefined) && <CardSmall
                                width={cardWidth}
                                height={cardHeight}
                                title='Deceased'
                                trendingUp={parseInt(_.last(chartData["deceased"])) > parseInt(_.nth(chartData["deceased"], chartData["deceased"].length - 2))}
                                delta={data["deltadeaths"]}
                                total={data["deaths"]}
                                primaryColor='#6c757d'
                                secondaryColor='#6c757d'
                                backgroundColor='#f6f6f7'
                            />}
                        </Grid>
                    </Grid>
                    <Grid item>
                        {(data !== undefined) && <Typography variant="caption">
                            {`Last updated on ${data["lastupdatedtime"].split(" ")[0]} at ${data["lastupdatedtime"].split(" ")[1]}`}
                        </Typography>}
                    </Grid>
                    <Grid item style={{ marginTop: 30, width: '100%' }}>
                        {(stateData !== undefined) && <div style={{ height: 750 }}>
                            <DataGrid rows={stateData} columns={columnInfo} />
                        </div>}
                    </Grid>
                </Grid>

                {(chartData !== undefined) && <Grid container direction="column" alignItems="center" style={{ overflow: 'hidden' }} xs={12} lg={6}>
                    <Grid item>
                        <CustomChart data={chartData["confirmed"]} datelabels={chartData["dates"]} title="Confirmed Cases" pathColor="#ff053a" backgroundColor="#ffdfe6" />
                    </Grid>
                    <Grid item>
                        <CustomChart data={chartData["recovered"]} datelabels={chartData["dates"]} title="Recovered Cases" pathColor="#2ca847" backgroundColor="#e4f4e7" />
                    </Grid>
                    <Grid item>
                        <CustomChart data={chartData["deceased"]} datelabels={chartData["dates"]} title="Deceased Cases" pathColor="#6c757d" backgroundColor="#f6f6f7" />
                    </Grid>
                </Grid>}
            </Grid>



        </div>
    )
}

export default India
