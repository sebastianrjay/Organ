class Api::TracksController < ApplicationController
  def index
    @tracks = Track.all
    render json: @tracks
  end

  def create
    @track = Track.new(track_params)
    @track.save
    render json: @track
  end

  def destroy
  end

  private

    def track_params
      params.require(:track).permit(:name, :roll)
    end
end
