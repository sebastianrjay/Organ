class UsersController < ApplicationController

  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      redirect_to root_path
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def new; end

  private

    def user_params
      params.require(:user).permit(:username, :email, :password)
    end
end
