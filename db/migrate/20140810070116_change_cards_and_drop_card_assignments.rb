class ChangeCardsAndDropCardAssignments < ActiveRecord::Migration
  def change
    add_column :cards, :user_id, :integer
    add_column :cards, :estimated_mins, :integer
    add_column :cards, :actual_mins, :integer
    add_column :cards, :due_time, :datetime
    add_column :cards, :start_time, :datetime
    add_column :cards, :completion_time, :datetime
    add_column :cards, :recent_start, :datetime
    add_column :cards, :recent_end, :datetime

    drop_table :card_assignments
  end
end
