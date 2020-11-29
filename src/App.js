import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import Home from './Components/Home/Home'
import Villagers from './Components/Villagers/Villagers'
import Fossils from './Components/Fossils/Fossils'
import Bugs from './Components/Bugs/Bugs'
import Items from './Components/Items/Items'

import classes from './App.module.css'

const App = () => {
  const [active, setActive] = useState(true)

  return (
    <Router>
      <nav className={classes.Nav}>
        <li>
          <Link to='/'>Home</Link>
        </li>

        <li>
          <Link to='/villagers'>Villagers</Link>
        </li>

        <li>
          <Link to='/bugs'>Bugs</Link>
        </li>

        <li>
          <Link to='fossils'>Fossils</Link>
        </li>

        <li>
          <Link to='items'>Items</Link>
        </li>
      </nav>

      <div className={classes.ProjectContainer}>
        <div style={{ display: 'flex' }}>
          <img
            className={classes.HeroImage}
            src={`${process.env.PUBLIC_URL}/images/acnh_title.png`}
            alt='Animal Crossing New Horizons'
          />
        </div>

        <Switch>
          <Route path='/villagers'>
            <Villagers />
          </Route>

          <Route path='/fossils'>
            <Fossils />
          </Route>

          <Route path='/bugs'>
            <Bugs />
          </Route>

          <Route path='/items'>
            <Items />
          </Route>

          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
