class HomeController < ApplicationController
  http_basic_authenticate_with name: ENV['USERNAME'], password: ENV['PASSWORD']

  def index; end

  def dontpad
    @project = Project.last
  end
end
