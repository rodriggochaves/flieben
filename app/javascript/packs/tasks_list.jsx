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

  render() { 
    return (
      <div>
        {this.state.tasks.map(task => {
          return (
            <p key={task.id} 
               className={this.taskClassName(task)}
               onDoubleClick={() => this.completeTask(task)}>
                {task.description}
            </p>
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