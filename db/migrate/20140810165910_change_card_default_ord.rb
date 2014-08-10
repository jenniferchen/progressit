class ChangeCardDefaultOrd < ActiveRecord::Migration
  def change
    change_column :cards, :ord, :integer, default: 1000
  end
end
