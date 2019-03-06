import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Forex() {
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const today = todaysDate()
    const prevDate = startDate(today)
    const apiUrl = `https://api.exchangeratesapi.io/history?start_at=${prevDate}&end_at=${today}&base=USD`
    axios.get(apiUrl).then(resp => {
      console.log({ resp })
    })
  }, [currentPage, {}])

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
        <select className="from-currency" />
        <select className="to-currency" />
      </section>
      <section className="current-rate">
        <p>{} trading at </p>
        <p>
          {} {}
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
