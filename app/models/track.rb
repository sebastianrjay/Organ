class Track < ActiveRecord::Base
  extend SearchHelper

  attr_writer :deletable

  validates :name, presence: true, uniqueness: true

  belongs_to :composer, class_name: 'User', foreign_key: :composer_id

  def as_json(options = {})
    # Normally it's bad practice to monkey-patch the JSON conversion for all 
    # instances, but this app is so tiny that it's the DRYest solution.
    super({
      include: [{ composer: { only: :username }}],
      methods: [:deletable, :id],
      except: [:created_at, :updated_at, :composer_id]
    }.merge(options))
  end

  def authorize_deletion!(user)
    @deletable = true if user.id == self.composer_id
  end

  def deletable
    @deletable || false
  end

  def self.recent(limit = 3)
    # Randomly sample 3 (or limit) of the most recently created tracks
    sample_len = [count, limit].min

    includes(:composer).order(created_at: :desc).sample(sample_len)
  end

  def self.search_by_composer(query, limit = 3)
    User.limit(limit)
        .includes(:tracks)
        .substring_search(:username, query)
        .map(&:tracks)        # Array of arrays...
        .reduce(&:+) || []    # ...reduced into a single array
  end

  def self.search_by_name(query, limit = 3)
    Track.limit(limit).includes(:composer).substring_search(:name, query)
  end

  def self.search_by_name_and_composer(query, limit = 3)
    (Track.search_by_name(query, limit) + Track.search_by_composer(query, limit))
        .uniq { |track| track.name }
        .take(limit)
  end
end
