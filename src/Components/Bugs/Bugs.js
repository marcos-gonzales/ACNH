import React, { useEffect, useState } from 'react'
import axios from 'axios'
import classes from './Bugs.module.css'

const Items = () => {
  const [getBugs, setBugs] = useState(null)
  const [searchBug, setSearchBugs] = useState('')
  const [whichSearch, setWhichSearch] = useState(null)
  const [getMonth, setMonth] = useState(null)

  useEffect(() => {
    axios.get(`http://acnhapi.com/v1a/bugs/`).then((bugs) => setBugs(bugs.data))
  }, [])

  const filterBugResult = (e) => {
    setWhichSearch(null)
    setSearchBugs(e.target.value.toLowerCase())
  }

  const seasonalBugs = () => {
    if (whichSearch) {
      return setWhichSearch(null)
    }
    let month = new Date()
    setMonth(month.getMonth())
    setWhichSearch(true)
  }

  if (!getBugs) return <h1>Getting bugs...</h1>
  let searchBugs

  if (whichSearch) {
    searchBugs = getBugs.filter((bugSearch) => {
      return bugSearch.availability['month-array-northern'].includes(
        getMonth + 1
      )
    })
  } else {
    searchBugs = getBugs.filter((bugSearch) => {
      return (
        bugSearch.name['name-USen'].includes(searchBug) ||
        bugSearch.availability['month-northern'].includes(searchBug)
      )
    })
  }

  return (
    <>
      <div className={classes.InputSearch}>
        <div>
          <label>Search</label>
          <input
            type='text'
            placeholder='month or bugname...'
            onChange={(e) => filterBugResult(e)}
          ></input>
        </div>
        <button className={classes.BugButton} onClick={seasonalBugs}>
          Bugs in Season
        </button>
      </div>

      <div className={classes.BugsContainer}>
        {searchBugs.map((bugs) => (
          <div
            key={bugs.name['name-USen']}
            className={classes.BugCard}
            style={{
              background:
                bugs.availability.rarity === 'Common'
                  ? '#ddf'
                  : bugs.availability.rarity === 'Uncommon'
                  ? '#d2f9d2'
                  : bugs.availability.rarity === 'Rare'
                  ? '#ffbdff'
                  : '#fbd7a9',
            }}
          >
            <p
              style={{
                fontWeight: '600',
                color: 'gray',
                textDecoration: 'underline',
              }}
            >
              {bugs.name['name-USen']}
            </p>
            <p>{bugs.availability.location}</p>
            <p>Month Northern: {bugs.availability['month-northern']}</p>
            {/* {bugs.availability['month-northern'].includes(12 || 1 || 2) ? (
              <img
                src={`${process.env.PUBLIC_URL}/images/winter.jpg`}
                style={{ height: '100px', width: '100px' }}
              />
            ) : bugs.availability['month-northern'].includes(9 || 10 || 11) ? (
              <img
                src={`${process.env.PUBLIC_URL}/images/fall.jpg`}
                style={{ height: '100px', width: '100px' }}
              />
            ) : bugs.availability['month-northern'].includes(6 || 7 || 8) ? (
              <img
                src={`${process.env.PUBLIC_URL}/images/summer.jpg`}
                style={{ height: '100px', width: '100px' }}
              />
            ) : (
              <img
                src={`${process.env.PUBLIC_URL}/images/spring.jpg`}
                style={{ height: '100px', width: '100px' }}
              />
            )} */}
            <p>Time Available: {bugs.availability.time}</p>
            <p>Rarity: {bugs.availability.rarity}</p>
            <img
              lazy='true'
              style={{ height: '100px', width: '100px' }}
              src={bugs.image_uri}
              alt={bugs.name['name-nameEN']}
            />
            {/* <p>{bugs['catch-phrase']}</p> */}
          </div>
        ))}
      </div>
    </>
  )
}

export default Items
