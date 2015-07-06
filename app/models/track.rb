class Track < ActiveRecord::Base
  validates :name, presence: true, unique: true

  belongs_to :user
end
