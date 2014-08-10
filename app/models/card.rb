# == Schema Information
#
# Table name: cards
#
#  id              :integer          not null, primary key
#  title           :string(255)      not null
#  list_id         :integer          not null
#  description     :text
#  ord             :integer          default(1000)
#  created_at      :datetime
#  updated_at      :datetime
#  user_id         :integer
#  estimated_mins  :integer          not null
#  actual_mins     :integer          default(0)
#  due_time        :datetime         not null
#  start_time      :datetime
#  completion_time :datetime
#  recent_start    :datetime
#  recent_end      :datetime
#

class Card < ActiveRecord::Base

  validates :title, :list_id, :estimated_mins, :due_time, presence: true

  belongs_to :list
  has_many :items
  belongs_to :user

  def status
    return "Completed" if completion_time
    return "In Progress" if start_time
    return "Assigned" if user_id
    "Unassigned"
  end

  def assigned?(u)
    self.user == u ? true : false
  end
end
