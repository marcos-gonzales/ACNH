import React, { useEffect, useState } from 'react'

import classes from './Villagers.module.css'

import axios from 'axios'

const Villagers = () => {
  const [getVillager, setVillagerData] = useState(null)
  const [getInputValue, setInputValue] = useState('')

  const filterVillagers = (e) => {
    setInputValue(e.target.value.toLowerCase())
  }

  useEffect(() => {
    axios.get(`http://acnhapi.com/v1a/villagers/`).then((villagers) => {
      setVillagerData(villagers.data)
    })
  }, [])

  if (!getVillager) return <h1>Loading...</h1>

  let filterVillagerSearch = getVillager.filter((villager) => {
    return (
      villager.name['name-USen'].toLowerCase().includes(getInputValue) ||
      villager.species.toLowerCase().includes(getInputValue) ||
      villager['birthday-string'].toLowerCase().includes(getInputValue)
    )
  })

  return (
    <>
      <div className={classes.SearchInput}>
        <label>Search</label>
        <input
          type='text'
          placeholder='Name Birthday or Species...'
          onChange={(e) => filterVillagers(e)}
        />
      </div>
      <div className={classes.Container}>
        {filterVillagerSearch.map((villager) => (
          <div className={classes.Card} key={villager.name['name-USen']}>
            <h2>{villager.name['name-USen']}</h2>
            <p>Saying: {`${villager.saying}`}</p>
            <p>Personality: {villager.personality}</p>
            <p>B-day: {villager['birthday-string']}</p>
            <p>Species: {villager.species}</p>
            <p>Hobby: {villager.hobby}</p>
            <img
              src={villager.image_uri}
              alt={villager.name['name-USen']}
              lazy='true'
              style={{
                borderRadius: '50%',
                height: '120px',
                width: '120px',
                paddingBottom: '10px',
              }}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default Villagers
