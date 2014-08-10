module Api
  class BoardMembershipsController < ApiController
    def create
      @member = User.find_by(email: params[:user][:email])
      @board_membership = BoardMembership.new(board_id: params[:board_id], user_id: @member.id)
      if @board_membership.save
        render json: @board_membership
      else
        render json: @board_membership.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @board_membership = BoardMembership.find(params[:id])
    end
  end
end
