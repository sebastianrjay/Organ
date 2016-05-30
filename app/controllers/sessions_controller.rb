class SessionsController < ApplicationController

  before_action :require_logged_out!, only: [:new, :create]
  before_action :require_logged_in!, only: :destroy

  def new; end

  def create
    user = User.find_by_username(params[:user][:username])
    
    if user && user.try(:authenticate, params[:user][:password])
      login!(user)
      redirect_to root_url
    else
      flash.now[:errors] = ["Invalid username and password combination"]
      render :new
    end
  end

  def destroy
    logout!
    redirect_to root_url
  end
end
