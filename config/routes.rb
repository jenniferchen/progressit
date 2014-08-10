Progressi::Application.routes.draw do
  root to: 'static_pages#root'

  resources :users, only: [:new, :create]
  resource :session

  namespace :api, defaults: { format: :json } do
    resources :boards, except: [:new, :edit] do
      resources :board_memberships, only: [:create, :destroy]
      resources :users, only: [:index]
    end
    resources :lists, only: [:create, :update, :destroy]
    resources :cards, only: [:show, :create, :update, :destroy]
    resources :users, only: [:show]
  end
end
