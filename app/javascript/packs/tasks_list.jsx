import React from 'react'
import ReactDOM from 'react-dom'

export class TasksList extends React.Component {
  constructor() {
    super()
    this.state = {
      todoTasks: [],
      completedTasks: []
    }
  }

  componentDidMount() {
    this.fetchTodoTasks()
  }

  fetchTodoTasks() {
    fetch("/tasks")
      .then(response => response.json())
      .then(data => {
        this.setState({ todoTasks: data.tasks })
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
        const todoTasks = this.state.todoTasks.filter(task => task.id != data.task.id)
        const completedTasks = [data.task, ...this.state.completedTasks]
        this.setState({ todoTasks, completedTasks })
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
        const todoTasks = this.state.todoTasks.concat(data.task)
        this.setState({ todoTasks })
        input.value = ''
      })
  }

  editTask = (event, task) => {
    event.preventDefault()
    event.target.innerHTML = 'finish'
    event.target.closest(".task").querySelectorAll("input[type='text']")[0].removeAttribute('readOnly')
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
        {this.state.todoTasks.map(task => {
          return (
            <div key={task.id} >
              <form className={this.taskClassName(task) + " ui form"}>
                <div className="fields">
                  <div className="fourteen wide field">
                    <input
                      type="text"
                      readOnly={true}
                      onDoubleClick={event => this.editTask(event, task)}
                      defaultValue={task.description}
                    />
                  </div>
                  <div className="two wide field">
                    <button
                      className="ui icon button"
                      onClick={event => this.completeTask(event)}>
                      &#x2714;
                    </button>
                    <button
                      className="ui button"
                      onClick={event => this.editTask(event, task)}>
                      edit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )
        })}
        {this.state.completedTasks.map(task => {
          return (
            <div key={task.id} >
              <p className={this.taskClassName(task)}>
                <button
                  className="ui icon button"
                  onClick={() => this.completeTask(task)}>
                  &#x2714;
                </button>
                <span>&nbsp;{task.description}</span>
              </p>
              <br />
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