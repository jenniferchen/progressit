json.array! @all_boards do |board|
  json.extract! board, :id, :title
  json.owned board.owned?(current_user)
end