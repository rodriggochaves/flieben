import React from 'react'
import ReactDOM from 'react-dom'

export class Dontpad extends React.Component {

  constructor() {
    super()
  }

  saveText(event) {
    const content = event.target.value
    fetch(`/dontpad`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "text": content })
    })
  }

  render() {
    return (
      <textarea onChange={event => this.saveText(event)} defaultValue={this.props.content}></textarea>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const anchor = document.getElementById("dontpad-anchor")
  const content = anchor.dataset.content
  
  ReactDOM.render(
    <Dontpad content={content} />,
    anchor,
  )
})
