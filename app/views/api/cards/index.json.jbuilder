json.array! @cards do |card|
  json.extract! card, :id, :title, :list_id, :description, :ord, :estimated_mins, :actual_mins, :due_time, :start_time, :completion_time, :recent_start, :recent_end

  if card.user
    json.assigned_member card.user.email
  end

  json.status card.status
  json.assigned card.assigned?(current_user)
end