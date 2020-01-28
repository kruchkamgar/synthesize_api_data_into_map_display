Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get '/maps', to: 'maps#index'
  get '/maps/:quantity', to: 'maps#show'

end
