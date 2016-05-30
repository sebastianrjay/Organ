class Track < ActiveRecord::Base
  attr_writer :deletable
  validates :name, presence: true, uniqueness: true

  belongs_to :composer, class_name: 'User', foreign_key: :user_id

  def as_json(options = {})
    # Normally it's bad practice to monkey-patch the JSON conversion for all 
    # instances, but this app is so tiny that it's the DRYest solution.
    super(options.merge({ include: [{ composer: { only: :username }}],
      methods: [:deletable, :id], except: [:created_at, :updated_at, :user_id] })
    )
  end

  def deletable
    @deletable || false
  end
end
