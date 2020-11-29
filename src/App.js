import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import Home from './Components/Home/Home'
import Villagers from './Components/Villagers/Villagers'
import Fossils from './Components/Fossils/Fossils'
import Bugs from './Components/Bugs/Bugs'
import Items from './Components/Items/Items'

import classes from './App.module.css'

const App = () => {
  const [active, setActive] = useState({
    villagers: null,
    home: null,
    bugs: null,
    fossiles: null,
    items: null,
  })

  const activeNav = (e) => {
    console.log(e.target.textContent)
    if (e.target.textContent === 'Villagers') {
      console.log('this is working')
      setActive({ villagers: true })
    }
    if (e.target.textContent === 'Bugs') {
      setActive({ bugs: true })
    }
    if (e.target.textContent === 'Fossils') {
      setActive({ fossils: true })
    }
    if (e.target.textContent === 'Items') {
      console.log('working')
      setActive({ items: true })
    }
    if (e.target.textContent === 'Home') {
      setActive({ home: true })
    }
  }

  return (
    <Router>
      <nav className={classes.Nav}>
        <li>
          <Link
            to='/'
            className={active.home ? classes.Active : null}
            onClick={(e) => activeNav(e)}
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            to='/villagers'
            onClick={(e) => activeNav(e)}
            className={active.villagers ? classes.Active : null}
          >
            Villagers
          </Link>
        </li>

        <li>
          <Link
            to='/bugs'
            onClick={(e) => activeNav(e)}
            className={active.bugs ? classes.Active : null}
          >
            Bugs
          </Link>
        </li>

        <li>
          <Link
            to='fossils'
            onClick={(e) => activeNav(e)}
            className={active.fossils ? classes.Active : null}
          >
            Fossils
          </Link>
        </li>

        <li>
          <Link
            to='items'
            onClick={(e) => activeNav(e)}
            className={active.items ? classes.Active : null}
          >
            Items
          </Link>
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
