# == Schema Information
#
# Table name: boards
#
#  id         :integer          not null, primary key
#  title      :string(255)      not null
#  user_id    :integer          not null
#  created_at :datetime
#  updated_at :datetime
#

class Board < ActiveRecord::Base
  validates :title, :user, presence: true

  belongs_to :user
  has_many :lists, dependent: :destroy
  has_many :cards, through: :lists, source: :cards
  has_many :board_memberships
  has_many :members, through: :board_memberships, source: :user

  def is_member?(u)
    return true if u.id == self.user_id
    board_memberships.where(user_id: u.id).exists?
  end

  def owned?(u)
    self.user_id == u.id ? true : false
  end

  def total_estimated
    self.cards.sum('estimated_mins')
  end

  def total_actual
    self.cards.where('completion_time IS NOT NULL').sum('actual_mins')
  end

  def total_completed
    self.cards.where('completion_time IS NOT NULL').sum('estimated_mins')
  end
end
