import React, { Component } from 'react'
import axios from 'axios'

class App extends Component {
  state = {
    currentUrl: 'https://api.exchangeratesapi.io/latest?base=USD',
    historicalUrl:
      'https://api.exchangeratesapi.io/history?start_at=2009-03-06&end_at=2019-03-06&base=USD'
  }

  componentDidMount() {
    axios.get(this.state.currentUrl).then(resp => {
      console.log({ resp })
    })
    axios.get(this.state.historicalUrl).then(resp => {
      console.log({ resp })
    })
  }

  render() {
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
}

export default App
