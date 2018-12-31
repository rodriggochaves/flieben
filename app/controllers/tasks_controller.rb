class TasksController < ApplicationController
  
  protect_from_forgery unless: -> { request.format.json? }

  def index
    @tasks = Task.all
    render json: { tasks: @tasks }
  end

  def complete
    task = Task.find params[:id]
    task.update(completed: true)
    render json: { task: task }, status: 200
  end
end
