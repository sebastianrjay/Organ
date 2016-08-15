class Api::TracksController < ApplicationController
  before_action :require_logged_in!

  def create
    @track = Track.new(track_params)
    @track.composer_id = current_user.id

    if @track.save
      @track.authorize_deletion!(current_user)
      render json: @track
    else
      render json: @track.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @track = Track.find_by_id(params[:id])

    if @track.composer_id == current_user.id
      @track.destroy
      render json: {}
    else
      error_msg = ["You are not authorized to delete this track."]
      render json: error_msg, status: :unprocessable_entity
    end
  end

  def recent
    @tracks = Track.recent
    @tracks.each { |track| track.authorize_deletion!(current_user) }

    render json: @tracks
  end

  def search
    @tracks = Track.search_by_name_and_composer(params[:query])
    @tracks.each { |track| track.authorize_deletion!(current_user) }

    render json: @tracks
  end

  private

    def track_params
      params.require(:track).permit(:name, :roll)
    end
end
