# == Schema Information
#
# Table name: cards
#
#  id              :integer          not null, primary key
#  title           :string(255)      not null
#  list_id         :integer          not null
#  description     :text
#  ord             :float            default(0.0)
#  created_at      :datetime
#  updated_at      :datetime
#  user_id         :integer
#  estimated_mins  :integer
#  actual_mins     :integer
#  due_time        :datetime
#  start_time      :datetime
#  completion_time :datetime
#  recent_start    :datetime
#  recent_end      :datetime
#

class Card < ActiveRecord::Base
  belongs_to :list
  has_many :items
  belongs_to :user

  def completed?
    !!completion_time
  end
end
