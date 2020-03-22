class PlaysController < ApplicationController

  def create
    play = Play.create!(play_params)
    redirect_to play
  end

  private
    def play_params
      params.require(:play).permit(:timer, :image_id)
    end
end
