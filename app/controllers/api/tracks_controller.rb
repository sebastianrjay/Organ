class Api::TracksController < ApplicationController

  def index
    sample_len = [Track.count, 3].min
    @tracks = Track.includes(:composer).limit(10).sample(sample_len)

    @tracks.each do |track|
      track.deletable = true if current_user == track.composer
    end

    render json: @tracks
  end

  def create
    @track = Track.new(track_params)
    @track.user_id = current_user.id

    if @track.save
      @track.deletable = true if current_user == @track.composer
      render json: @track
    else
      flash[:errors] = @track.errors.full_messages
      render json: @track, status: :unprocessable_entity
    end
  end

  def destroy
    @track = Track.includes(:composer).find_by_id(params[:id])

    if @track.composer == current_user
      @track.delete
    else
      flash.now[:errors] = ["You are not authorized to delete this track."]
      render json: @track, status: :unprocessable_entity
    end

    render json: {}
  end

  private

    def track_params
      params.require(:track).permit(:name, :roll)
    end
end
