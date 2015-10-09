class Api::TracksController < ApplicationController

  def index
    # Randomly sample 3 tracks from the first 10 tracks saved to the DB; if less
    # than 3 tracks are saved, sample the number of tracks saved
    @tracks = Track.includes(:composer).limit(10)
    sample_len, indexes = [Track.count, 3].min, []
    until indexes.length == sample_len
      new_idx = (Random.rand * @tracks.length).to_i
      indexes << new_idx unless indexes.include?(new_idx)
    end

    tracks = []
    indexes.each do |idx|
      @tracks[idx].deletable = true if current_user == @tracks[idx].composer
      tracks << @tracks[idx]
    end

    render json: tracks
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
      flash[:errors] << "You are not authorized to delete this track."
      render json: @track, status: :unprocessable_entity
    end

    render json: {}
  end

  private

    def track_params
      params.require(:track).permit(:name, :roll)
    end
end
