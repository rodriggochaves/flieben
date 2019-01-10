Rails.application.routes.draw do
  root 'home#dontpad'

  get '/tasks' => 'tasks#index'
  post '/tasks' => 'tasks#create'
  post '/tasks/:id/complete' => 'tasks#complete'
end
