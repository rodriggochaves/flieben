class DontpadController < ApplicationController
  http_basic_authenticate_with name: ENV['USERNAME'], password: ENV['PASSWORD'] if Rails.env.production?
  protect_from_forgery unless: -> { request.format.json? }

  def home
    @project = Project.last
  end

  def update
    project = Project.first
    project.update(content: params[:text])
    head :ok
  end
end
