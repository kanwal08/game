class PlaysController < ApplicationController

  def index
  	@images = Image.order('RANDOM()').limit(10)
  	@plays = Play.order(id: :desc).all
  end

  def create
    play = Play.new(play_params)
    render json: {result: play.save}.to_json
  end

  private
    def play_params
      params.require(:play).permit(:timer, :image_id)
    end
end
