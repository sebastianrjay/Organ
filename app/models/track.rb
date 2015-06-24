class Track < ActiveRecord::Base
  validates :name, presence: true
end
