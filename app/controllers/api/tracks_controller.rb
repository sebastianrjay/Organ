class Api::TracksController < ApplicationController
  before_action :require_logged_in!

  def create
    @track = Track.new(track_params)
    @track.user_id = current_user.id

    if @track.save
      @track.authorize_deletion!(current_user)
      render json: @track.as_json.merge({ composer: { username: current_user.username } })
    else
      render json: @track.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @track = Track.includes(:composer).find_by_id(params[:id])

    if @track.composer == current_user
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
    @tracks = Track.search(params[:query])
    @tracks.each { |track| track.authorize_deletion!(current_user) }

    render json: @tracks
  end

  private

    def track_params
      params.require(:track).permit(:name, :roll)
    end
end
