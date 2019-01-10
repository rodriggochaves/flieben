import React from 'react'
import ReactDOM from 'react-dom'

export class Dontpad extends React.Component {

  saveText = (event) => {
    fetch(`/dontpad`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "text": event.target.value })
    })
  }

  render() {
    return (
      <textarea onChange={event => this.saveText(event)} />
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Dontpad />,
    document.getElementById("dontpad-anchor"),
  )
})
