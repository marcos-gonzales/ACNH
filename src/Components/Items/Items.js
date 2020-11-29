import React, { useState, useEffect } from 'react'

import axios from 'axios'
import classes from './Items.module.css'

const Items = () => {
  const [getItems, setItems] = useState(null)
  const [searchInput, setSearchInput] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(20)

  useEffect(() => {
    axios
      .get(`http://acnhapi.com/v1a/houseware/`)
      .then((items) => setItems(items.data))
      .catch((err) => <h1>oops something went wrong fetching data..</h1>)
  }, [])

  if (!getItems) return <h1>Loading...</h1>

  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(getItems.length / itemsPerPage); i++) {
    pageNumbers.push(i)
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const lastItem = currentPage * itemsPerPage
  const firstItem = lastItem - itemsPerPage
  const currentItems = getItems.slice(firstItem, lastItem)

  const searchItem = (e) => {
    setSearchInput(e.target.value.toLowerCase())
  }

  const filterSearch = getItems.map((item) => {
    return item.filter((singleItem) => {
      return singleItem.name['name-USen'].toLowerCase().includes(searchInput)
    })
  })

  return (
    <>
      <div className={classes.SearchContainer}>
        <label>Search</label>
        <input
          type='text'
          onChange={(e) => searchItem(e)}
          placeholder='ironwood kitchen...'
        />
      </div>

      <div className={classes.SearchContainer}>
        {searchInput.length > 0
          ? filterSearch.map((items) => {
              return items.map((item__) => (
                <div key={item__.name['name-USen']}>
                  <h2>{item__.name['name-USen']}</h2>
                  {item__['buy-price'] ? (
                    <p>Buy Price: {item__['buy-price']}</p>
                  ) : null}
                  {item__['sell-price'] ? (
                    <p>Sell Price: {item__['sell-price']}</p>
                  ) : null}
                  {item__.source ? <p>Source: {item__.source}</p> : null}
                  <img
                    src={item__.image_uri}
                    alt={item__.name['name-USen']}
                    loading='lazy'
                  />
                </div>
              ))
            })
          : null}
      </div>
      <div className={classes.ItemContainer}>
        {currentItems.map((singleItem) => {
          return singleItem.map((item, index) => (
            <div className={classes.ItemCard} key={index}>
              <h2>{item.name['name-USen']}</h2>
              {item['buy-price'] ? <p>Buy Price: {item['buy-price']}</p> : null}

              {item['sell-price'] ? (
                <p>Sell Price: {item['sell-price']}</p>
              ) : null}

              <p>Source: {item.source}</p>
              <img
                src={item.image_uri}
                alt={item.name['name-USen']}
                lazy='true'
              />
            </div>
          ))
        })}

        <ul className={classes.Pagination}>
          {pageNumbers.map((pageNumber, index) => (
            <li
              key={pageNumber}
              style={{
                color: currentPage === index + 1 ? 'purple' : 'blue',
              }}
            >
              <button
                className={classes.Links}
                onClick={() => paginate(pageNumber)}
              >
                {pageNumber}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Items
