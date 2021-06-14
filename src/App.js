import Logo from './assets/coviTracker_LOW.png'
import './App.css'
import { Grid, Tab, Tabs } from '@material-ui/core'
import React, { useState } from 'react'
import SwipeableViews from 'react-swipeable-views'
import India from './pages/India'
import Global from './pages/Global'
import Vaccine from './pages/Vaccine'
import Oxygen from './pages/Oxygen'

function App() {
  const [pageIndex, setPageIndex] = useState(0)

  const handleChange = (event, newValue) => {
    setPageIndex(newValue)
  }

  const handleIndexChange = (value) => {
    setPageIndex(value)
  }

  return (
    <React.Fragment>
      {/* Header Component */}
      <Grid container direction="row" alignItems="center">

        {/* Logo */}
        <Grid style={{ display: 'flex', justifyContent: "center" }} item xs={12} md={3}>
          <div>
            <img className="logoImage" src={Logo} alt="Logo"/>
          </div>
        </Grid>

        {/* Tab bar */}
        <Grid item xs={12} md={9}>
          <Grid container justify="center" alignItems="center">
            <Tabs value={pageIndex} onChange={handleChange}>
              <Tab label="India" />
              <Tab label="Global" />
              <Tab label="Vaccines" />
              <Tab label="Oxygen" />
            </Tabs>
          </Grid>
        </Grid>
      </Grid>

      {/* Tab pages */}
      <SwipeableViews index={pageIndex} onChange={handleIndexChange} onSwitching={handleIndexChange}>
        <India />
        <Global />
        <Vaccine />
        <Oxygen />
      </SwipeableViews>
    </React.Fragment>
  );
}

export default App;
