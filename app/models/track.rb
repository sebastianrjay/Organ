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

  def self.recent
    # Randomly sample at most 3 of the 10 most recently created tracks
    sample_len = [count, 3].min

    includes(:composer).order(created_at: :desc).limit(10).sample(sample_len)
  end

  def self.search(query)
    (
      Track.includes(:composer).substring_search(:name, query) +
      (User.includes(:tracks)
              .substring_search(:username, query)
              .map(&:tracks)
              .inject(&:+) || [])
    ).uniq { |track| track.name }.take(3)
  end
end
