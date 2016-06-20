class Api::TracksController < ApplicationController
  before_action :require_logged_in!

  def create
    @track = Track.new(track_params)
    @track.user_id = current_user.id

    if @track.save
      @track.deletable = true if current_user == @track.composer
      render json: @track
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
    # Randomly sample at most 3 of the 10 most recently created tracks
    sample_len = [Track.count, 3].min
    @tracks = Track.includes(:composer).order(created_at: :desc)
                    .limit(10).sample(sample_len)

    @tracks.each do |track|
      track.deletable = true if current_user == track.composer
    end

    render json: @tracks
  end

  def search
    query = ThinkingSphinx::Query.wildcard(ThinkingSphinx::Query.escape(params[:query]))
    @tracks = Track.search query

    render json: @tracks
  end

  private

    def track_params
      params.require(:track).permit(:name, :query, :roll)
    end
end
