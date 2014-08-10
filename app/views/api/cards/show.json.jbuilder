json.extract! @card, :id, :title, :list_id, :description, :ord, :estimated_mins, :actual_mins, :due_time, :start_time, :completion_time, :recent_start, :recent_end

json.assigned_member @card.user.email