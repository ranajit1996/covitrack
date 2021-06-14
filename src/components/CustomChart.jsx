import React from 'react'
import ReactApexChart from 'react-apexcharts'

const CustomChart = ({ data, datelabels, title, pathColor, backgroundColor }) => {
    const state = {
        series: [{
            name: title,
            data: data
        }],
        options: {
            chart: {
                type: 'line',
                zoom: {
                    enabled: true
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                lineCap: 'round',
                colors: pathColor,
                dashArray: 0,
            },
            title: {
                text: title,
                align: 'left'
            },
            grid: {
                row: {
                    colors: [backgroundColor, 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: datelabels,
                labels: {
                    show: false
                }
            },
        },
    }

    return (
        <ReactApexChart options={state.options} series={state.series} type="line" height={300} width={600} />
    )
}

export default CustomChart
