class StaticPagesController < ApplicationController
  def root
    logged_in? ? render(:root) : redirect_to(new_user_url)
  end
end
