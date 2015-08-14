class StaticPagesController < ApplicationController
  def root
    logged_in? ? render(:root) : redirect_to(new_session_url)
  end
end
