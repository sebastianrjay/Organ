class CreateTracks < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
      t.string :name, null: false
      t.json :roll

      t.timestamps null: false
    end
  end
end
