module Api
  class BoardsController < ApiController
    def create
      @board = Board.new(board_params)
      @board.user_id = current_user.id
      if @board.save
        @board.board_memberships.create!(user_id: current_user.id)
        render json: @board
      else
        render json: @board.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @board = current_user.boards.find(params[:id])
      @board.try(:destroy)
      render json: {}
    end

    def index
      @all_boards = current_user.boards + current_user.member_boards
      render :index
    end

    def show
      @board = Board.includes(:members, lists: {cards: :items}).find(params[:id])
      if @board.is_member?(current_user)
        render :show
      else
        render json: ["You aren't a member of this board"], status: 403
      end
    end

    private

    def board_params
      params.require(:board).permit(:title)
    end
  end
end
