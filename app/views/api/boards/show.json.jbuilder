json.extract! @board, :id, :title, :created_at, :updated_at
json.owned @board.owned?(current_user)

json.members @board.members do |member|
  json.id member.id
  json.email member.email
  json.gravatar_url member.gravatar_url
end

json.lists @board.lists do |list|
  json.extract! list, :id, :title, :ord, :created_at, :updated_at
  json.owned @board.owned?(current_user)

  json.cards list.cards do |card|
    json.extract! card, :id, :title, :list_id, :description, :ord, :estimated_mins, :actual_mins, :due_time, :start_time, :completion_time, :recent_start, :recent_end
    
    json.owned @board.owned?(current_user)

    if card.user
      json.assigned_member card.user.email
    end

    json.status card.status
  end
end