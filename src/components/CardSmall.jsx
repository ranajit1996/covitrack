import { Grid, Typography } from '@material-ui/core'
import { TrendingDownRounded, TrendingUpRounded } from '@material-ui/icons'
import React from 'react'
import CountUp from 'react-countup'

const CardSmall = ({ width, height, title, trendingUp, delta, total, primaryColor, secondaryColor, backgroundColor }) => {
    return (
        <div style={{ width: width, height: height, padding: '8px', borderRadius: '15px', background: backgroundColor }}>
            {/* Card title */}
            <Grid container direction='column' justify='center' alignItems='center'>
                <Grid container direction='row' justify='center' alignItems='center'>
                    <Grid item>
                        <Typography variant='h6' style={{ color: primaryColor }}>
                            {title}
                        </Typography>
                    </Grid>
                    {trendingUp !== undefined && <Grid item style={{ marginLeft: '8px' }}>
                        {trendingUp && <TrendingUpRounded style={{ color: primaryColor }} />}
                        {!trendingUp && <TrendingDownRounded style={{ color: primaryColor }} />}
                    </Grid>}
                </Grid>

                {/* Delta numbers */}
                {delta !== undefined && <Grid item style={{ color: secondaryColor }}>
                    <CountUp
                        end={parseInt(delta)}
                        duration={1}
                        formattingFn={(number) => `+ ${number.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}`}
                    />
                </Grid>}

                {/* Total numbers */}
                <Grid item>
                    <Typography variant='h5' style={{ color: primaryColor }}>
                        <CountUp
                            end={parseInt(total)}
                            duration={1}
                            formattingFn={(number) => number.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}
                        />
                    </Typography>
                </Grid>

            </Grid>
        </div>
    )
}

export default CardSmall
