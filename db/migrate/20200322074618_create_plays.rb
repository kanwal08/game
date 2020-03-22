class CreatePlays < ActiveRecord::Migration[6.0]
  def change
    create_table :plays do |t|
      t.integer :timer
      t.references :image, foreign_key: true
      t.timestamps
    end
  end
end
