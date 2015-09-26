class Api::TracksController < ApplicationController

  def index
    sample_len = [Track.count, 3].min
    @tracks = Track.take(sample_len)
    @tracks.each do |track|
      track.deletable = true if track.user_id == current_user.id
    end
    render json: @tracks
  end

  def create
    @track = Track.new(track_params)
    @track.user_id = current_user.id

    if @track.save
      flash[:errors] = []
      render json: { id: @track.id, name: @track.name, deletable: true }
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
      params.require(:track).permit(:name, :roll)
    end
end
