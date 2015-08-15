class Track < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true

  belongs_to :composer, {
    class_name: 'User',
    foreign_key: :user_id
  }

  def as_json(options = {})
    super(only: [:id, :name])
  end
end
