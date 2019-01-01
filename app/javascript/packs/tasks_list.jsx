import React from 'react'
import ReactDOM from 'react-dom'

class TasksList extends React.Component {
  constructor() {
    super()
    this.state = {
      tasks: []
    }
  }

  componentDidMount() {
    fetch("/tasks")
      .then(response => response.json())
      .then(data => {
        this.setState({tasks: data.tasks})
      })
  }

  taskClassName(task) {
    return task.completed ? 'task completed' : 'task'
  }

  completeTask = (task) => {
    fetch(`/tasks/${task.id}/complete`, {
      method: 'POST'
    })
      .then(response => response.json())
      .then(data => {
        const newTasks = this.state.tasks.map(task => {
          if(task.id == data.task.id) {
            return data.task
          } else {
            return task
          }
        })
        this.setState({ tasks: newTasks })
      })
  }

  createTask = (event) => {
    event.preventDefault()
    const input = event.target.querySelectorAll("input[name='description']")[0]
    const description = input.value
    fetch('/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "description": description })
    })
      .then(response => response.json())
      .then(data => {
        const newTasks = this.state.tasks
        newTasks.push(data.task)
        this.setState({tasks: newTasks})
        input.value = ''
      })
  }

  render() { 
    return (
      <div>
        <br />
        <form className="new-task ui form" action="/tasks" onSubmit={(event) => { this.createTask(event) }}>
          <div className="field">
            <input type="text" name="description"/>
          </div>
        </form>
        <br />
        {this.state.tasks.map(task => {
          return (
            <div key={task.id} >
              <p className={this.taskClassName(task)}>
                <button
                    className="ui button"
                    onClick={() => this.completeTask(task)}>
                    x
                </button>
                <span>{task.description}</span>
              </p>
              <br/>
            </div>
          )
        })}
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <TasksList name="React" />,
    document.getElementById("tasks-list-anchor"),
  )
})