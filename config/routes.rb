Rails.application.routes.draw do
  root 'dontpad#home'

  post 'dontpad' => 'dontpad#update'
end
