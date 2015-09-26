class Track < ActiveRecord::Base
  attr_writer :deletable
  validates :name, presence: true, uniqueness: true

  belongs_to :composer, {
    class_name: 'User',
    foreign_key: :user_id
  }

  def as_json(options = {})
    super((options || {}).merge({methods: [:deletable], except: [:created_at,
      :updated_at, :user_id]})
    )
  end

  def deletable
    @deletable || false
  end
end
