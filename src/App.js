import React, { Component } from 'react'
import axios from 'axios'

class App extends Component {
  state = {
    currentUrl: 'https://api.exchangeratesapi.io/latest?base=USD',
    historicalUrl:
      'https://api.exchangeratesapi.io/history?start_at=2009-03-06&end_at=2019-03-06'
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
        <h1>Currency Trader</h1>
        <select className="from-currency" />
        <select className="to-currency" />
      </>
    )
  }
}

export default App
