Rails.application.routes.draw do
  root 'dontpad#index'

  post 'dontpad' => 'dontpad#update'
end
