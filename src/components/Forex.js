import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Forex() {
  const [currentPage, setCurrentPage] = useState(1)
  const [baseCurrency, setBaseCurrency] = useState('MXN')
  const [compareCurrency, setCompareCurrency] = useState('MXN')
  // const [exchangeInfo, setExchangeInfo] = useState([])
  // const [exchangeDates, setExchangeDates] = useState([])
  const [currencyList, setCurrencyList] = useState([])
  const [exchangeRate, setExchangeRate] = useState(1)

  useEffect(() => {
    loadApi()
  }, [currentPage])

  const loadApi = () => {
    const today = todaysDate()
    // const prevDate = startDate(today)
    const apiUrl = `https://api.exchangeratesapi.io/history?start_at=${today}&end_at=${today}&base=${baseCurrency}`
    axios.get(apiUrl).then(resp => {
      // setExchangeInfo(resp.data.rates)
      // setExchangeDates(Object.entries(resp.data.rates))
      setCurrencyList(Object.entries(Object.values(resp.data.rates)[0]))
    })
  }

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

  // const startDate = today => {
  //   const dateParts = today.split('-')
  //   dateParts[0] -= 10
  //   return dateParts.join('-')
  // }

  const setComparison = (source, currency) => {
    if (source == 'base') {
      setBaseCurrency(currency)
      loadApi()
      for (let i = 0; i < currencyList.length; i++) {
        if (currencyList[i][0] == compareCurrency) {
          setExchangeRate(currencyList[i][1])
        }
      }
    } else {
      setCompareCurrency(currency)
      for (let i = 0; i < currencyList.length; i++) {
        if (currencyList[i][0] == currency) {
          setExchangeRate(currencyList[i][1])
        }
      }
    }

    // getOneYearAvg()
  }

  // const getRate = () => {
  //   for (let i = 0; i < currencyList.length; i++) {
  //     if (currencyList[i][0] == compareCurrency) {
  //       setExchangeRate(currencyList[i][1])
  //     }
  //   }
  // }

  return (
    <>
      <header>
        <h1>Currency Trader</h1>
      </header>
      <section className="menus">
        <h2>Select currencies to compare: </h2>
        <select
          className="from-currency"
          onChange={event => setComparison('base', event.target.value)}
        >
          {currencyList.map((currency, index) => {
            return (
              <option
                key={index}
                value={currencyList[index][0]}
                name={currencyList[index][0]}
              >
                {currencyList[index][0]}
              </option>
            )
          })}
        </select>
        <select
          className="to-currency"
          onChange={event => setComparison('compare', event.target.value)}
        >
          {currencyList.map((currency, index) => {
            return (
              <option
                key={index}
                value={currencyList[index][0]}
                name={currencyList[index][0]}
              >
                {currencyList[index][0]}
              </option>
            )
          })}
        </select>
      </section>
      <section className="current-rate">
        <p>{baseCurrency} trading at </p>
        <p>
          {exchangeRate} {compareCurrency}
        </p>
      </section>
      {/* <section className="historical-rates">
        <h3>1 year average: </h3>
        <p className="one-yr-avg">
          {} {}
        </p>
        <h3>10 year average: </h3>
        <p className="ten-yr-avg">
          {} {}
        </p>
      </section>
      <section className="explanation">
        <p className="green-text">Green: </p>
        <p>Trading below average</p>
        <p className="red-text">Red: </p>
        <p>Trading above average</p>
      </section> */}
    </>
  )
}
