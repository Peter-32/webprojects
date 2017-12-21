Rails.application.routes.draw do
  resources :widgets

  root :to => "articles#index"
  get '/projects', to: 'projects#index', as: 'projects'
  get '/projects/champion', to: 'projects#champion', as: 'champion'
  get '/projects/network', to: 'projects#network', as: 'network'
  get '/projects/scala_java_network', to: 'projects#scala_java_network', as: 'scala_java_network'
  get '/projects/numbers', to: 'projects#numbers', as: 'numbers'
  get '/projects/q_and_a', to: 'projects#q_and_a', as: 'q_and_a'
  get '/projects/crosses_largest_area', to: 'projects#crosses_largest_area', as: 'crosses_largest_area'
  get '/projects/xml/Jungle', to: 'projects#getxmljungle'
  get '/projects/xml/Middle', to: 'projects#getxmlmiddle'
  get '/projects/xml/Top', to: 'projects#getxmltop'
  post '/projects/crosses_answer', to: 'projects#crosses_answer'
  get '/articles', to: 'articles#index', as: 'articles'
  get '/contact', to: 'contact#index', as: 'contact'
  post '/user', to: 'users#create'
  post '/contact', to: 'contact#create'


  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
