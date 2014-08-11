json.array! @all_boards do |board|
  json.extract! board, :id, :title
  json.owned board.owned?(current_user)
  json.total_estimated board.total_estimated
  json.total_actual board.total_actual
  json.total_completed board.total_completed
end