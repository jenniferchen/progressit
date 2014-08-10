module Api
  class UsersController < ApiController
    before_action :require_board_member!

    def index
      @board = current_board
      @members = @board.members
      render :index
    end

    def show
      @user = User.find(params[:id])
      render :show
    end

    private

    def current_board
      Board.find(params[:board_id])
    end
  end
end
