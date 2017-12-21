class UsersController < ApplicationController
  #order: index, show, new, edit, create, update and destroy
  def index
    redirect_to contacts_path
  end

  def show
    redirect_to contacts_path
  end

  def new
    redirect_to contacts_path
  end

  def create
    @user = User.new(params.require(:user).permit(:name, :email))
    @user.save
    redirect_to contact_path
  end

end
