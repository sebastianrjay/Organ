class RenameTrackUserIdToComposerIdAndAddIndexes < ActiveRecord::Migration
  def change
    rename_column :tracks, :user_id, :composer_id
    add_index :tracks, :composer_id, using: :btree
    add_index :users, :session_token, unique: true, using: :btree
  end
end
