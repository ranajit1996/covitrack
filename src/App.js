import Logo from './assets/coronavirus.svg'
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
<<<<<<< HEAD
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Kanchan KK
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
=======
    <React.Fragment>
      {/* Header Component */}
      <Grid container direction="row" alignItems="center">

        {/* Logo */}
        <Grid style={{ display: 'flex', justifyContent: "center" }} item xs={12} md={3}>
          <div>
            <img className="logoImage" src={Logo} alt="Logo" />
          </div>
          <div>
            <h1 className="logoText">COVITRACK</h1>
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
>>>>>>> 8701de79489051a1f474430a46aa6b6ae1eb5cd9
  );
}

export default App;
