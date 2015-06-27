class Api::TracksController < ApplicationController
  def index
    @tracks = Track.all
    render json: @tracks
  end

  def create
    if params[:track][:delete]
      destroy
    else
      @track = Track.new(track_params)
      @track.save
      render json: @track
    end
  end

  def destroy
    @track_matches = Track.where("name = ?", params[:track][:name])
    if @track_matches.length != 1
      @track_matches = Track.where("roll = ?", params[:track][:roll])
    end

    @track_matches[0].delete if @track_matches.length == 1
    render json: {}
  end

  private

    def track_params
      params.require(:track).permit(:name, :roll, :delete)
    end
end
