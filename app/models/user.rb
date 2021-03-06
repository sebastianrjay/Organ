class User < ActiveRecord::Base
  extend SearchHelper

  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates_format_of :email, with: /\A(|(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})\z/i
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :password_digest, :session_token, presence: true

  before_validation :ensure_session_token!

  has_many :tracks, inverse_of: :composer, foreign_key: :composer_id

  has_secure_password

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save!
  end

  private

    def ensure_session_token!
      self.session_token ||= SecureRandom.urlsafe_base64
    end
end
