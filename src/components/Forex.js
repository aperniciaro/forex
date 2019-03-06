import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Forex() {
  const [currentPage, setCurrentPage] = useState(1)
  const [baseCurrency, setBaseCurrency] = useState('USD')
  const [compareCurrency, setCompareCurrency] = useState('USD')
  const [exchangeInfo, setExchangeInfo] = useState([])
  const [exchangeDates, setExchangeDates] = useState([])
  const [currencyList, setCurrencyList] = useState([])

  useEffect(() => {
    const today = todaysDate()
    const prevDate = startDate(today)
    const apiUrl = `https://api.exchangeratesapi.io/history?start_at=${prevDate}&end_at=${today}&base=${baseCurrency}`
    axios.get(apiUrl).then(resp => {
      setExchangeInfo(resp.data.rates)
      setExchangeDates(Object.values(resp.data.rates))
      setCurrencyList(Object.keys(Object.values(resp.data.rates)[0]))
    })
  }, [currentPage])

  const todaysDate = () => {
    let currentDate = new Date()
    let dd = currentDate.getDate()
    let mm = currentDate.getMonth() + 1
    const yyyy = currentDate.getFullYear()

    if (dd < 10) {
      dd = '0' + dd
    }

    if (mm < 10) {
      mm = '0' + mm
    }

    return yyyy + '-' + mm + '-' + dd
  }

  const startDate = today => {
    const dateParts = today.split('-')
    dateParts[0] -= 10
    return dateParts.join('-')
  }

  return (
    <>
      <header>
        <h1>Currency Trader</h1>
      </header>
      <section className="menus">
        <select
          className="from-currency"
          defaultValue="USD"
          onChange={event => setBaseCurrency(event.target.value)}
        >
          {currencyList.map((currency, index) => {
            return (
              <option
                key={index}
                value={currencyList[index]}
                name={currencyList[index]}
              >
                {currencyList[index]}
              </option>
            )
          })}
        </select>
        <select
          className="to-currency"
          defaultValue="USD"
          onChange={event => setCompareCurrency(event.target.value)}
        >
          {currencyList.map((currency, index) => {
            return (
              <option
                key={index}
                value={currencyList[index]}
                name={currencyList[index]}
              >
                {currencyList[index]}
              </option>
            )
          })}
        </select>
      </section>
      <section className="current-rate">
        <p>{baseCurrency} trading at </p>
        <p>
          {} {compareCurrency}
        </p>
      </section>
      <section className="historical-rates">
        <h5>1 year average: </h5>
        <p className="one-yr-avg">
          {} {}
        </p>
        <h5>10 year average: </h5>
        <p className="ten-yr-avg">
          {} {}
        </p>
      </section>
      <section className="explanation">
        <p className="green-text">Green: </p>
        <p>Trading below average</p>
        <p className="red-text">Red: </p>
        <p>Trading above average</p>
      </section>
    </>
  )
}
