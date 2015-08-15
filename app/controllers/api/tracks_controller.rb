class Api::TracksController < ApplicationController

  def index
    @tracks = Track.all
    render json: @tracks
  end

  def create
    @track = Track.new(track_params)
    @track.user_id = current_user.id

    if @track.save
      flash[:errors] = []
      render json: @track
    else
      flash[:errors] = @track.errors.full_messages
      render json: @track, status: :unprocessable_entity
    end
  end

  def destroy
    @track = Track.includes(:composer).find_by_id(params[:id])

    if @track && @track.composer == current_user
      @track.delete
    else
      flash[:errors] = "You are not authorized to delete this track."
    end

    render json: {}
  end

  private

    def track_params
      params.require(:track).permit(:name, :roll, :delete)
    end
end
