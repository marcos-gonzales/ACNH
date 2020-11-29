import React, { useState, useEffect } from 'react'
import axios from 'axios'
import classes from './Fossils.module.css'

const Fossils = () => {
  const [getFossils, setFossils] = useState(null)
  const [getInputValue, setInputValue] = useState('')

  useEffect(() => {
    axios
      .get(`http://acnhapi.com/v1a/fossils`)
      .then((fossils) => setFossils(fossils.data))
  }, [])

  const filterResults = (e) => {
    setInputValue(e.target.value.toLowerCase())
  }

  if (!getFossils) return <h1>Loading...</h1>

  const filterResult = getFossils.filter((fossil) => {
    return fossil.name['name-USen'].toLowerCase().includes(getInputValue)
  })

  return (
    <>
      <div className={classes.SearchInput}>
        <label>Search</label>
        <input
          type='text'
          placeholder='Spino Skull..'
          onChange={(e) => filterResults(e)}
        />
      </div>
      <div className={classes.FossilContainer}>
        {filterResult.map((fossil) => (
          <div className={classes.Fossil} key={fossil.name['name-USen']}>
            <p>{fossil.name['name-USen']}</p>
            <p>Price: {fossil.price}</p>
            <img
              src={fossil.image_uri}
              alt={fossil.name['name-USen']}
              loading='lazy'
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default Fossils
