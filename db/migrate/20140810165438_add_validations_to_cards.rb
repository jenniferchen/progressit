class AddValidationsToCards < ActiveRecord::Migration
  def change
    change_column :cards, :estimated_mins, :integer, null: false
    change_column :cards, :actual_mins, :integer, default: 0
    change_column :cards, :due_time, :datetime, null: false
  end
end
