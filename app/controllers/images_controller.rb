class ImagesController < ApplicationController
  
  def new
    @image = Image.new
    @title = "Home"
  end
  
  def create
    image_params[:image].each do |img |
      Image.create(image: img)
    end
    redirect_to new_play_path
  end

  private
    def image_params
      params.require(:images).permit(image: [])
    end

end
