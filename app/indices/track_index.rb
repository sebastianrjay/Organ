ThinkingSphinx::Index.define :track, with: :real_time do
  # fields
  indexes name, :sortable => true
  indexes composer.username, :as => :composer, :sortable => true

  # attributes
  has created_at, :type => :timestamp
end