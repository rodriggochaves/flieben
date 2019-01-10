class TasksController < ApplicationController
  
  protect_from_forgery unless: -> { request.format.json? }

  def index
    @tasks = Task.where(completed: false)
    render json: { tasks: @tasks }
  end

  def create
    task = Task.new(description: params[:description])
    task.save
    render json: { task: task }, status: 201
  end

  def complete
    task = Task.find params[:id]
    task.update(completed: !task.completed)
    render json: { task: task }, status: 200
  end

  def dontpad
    project = Project.first
    project.update(content: params[:text])
    head :ok
  end
end
