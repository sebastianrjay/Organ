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
    @track = Track.includes(:composer).where("name = ? AND roll = ?",
      params[:track][:name], params[:track][:roll])
      .select {|track| track.composer == current_user}[0]

    if @track
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
