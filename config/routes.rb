Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'images#new'

  resources :images, only: [:new, :create]
  resource :play, only: [:create]
  get "/play", to: "plays#index", as: "play_index"

end
