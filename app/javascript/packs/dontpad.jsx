import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash';

export class Dontpad extends React.Component {

  constructor(props) {
    super()
    this.state = {
      content: props.content
    }
  }

  requestUpdate = _.debounce(() => {
    fetch(`/dontpad`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "text": this.state.content })
    })
  }, 750)

  saveText = (event) => {
    const content = event.target.value
    this.setState({ "content": content })
    this.requestUpdate()
  }

  render() {
    return (
      <textarea onChange={event => this.saveText(event)} defaultValue={this.state.content}></textarea>
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
