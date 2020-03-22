class ImagesController < ApplicationController
  
  def new
    @image = Image.new
    @title = "Home"
  end
  
  def create
    image_params[:image].each do |img |
      @image = Image.new(image: img)
      unless @image.save
      	render :new
      	return
      end
    end
    redirect_to play_index_path
  end

  private
    def image_params
      params.require(:images).permit(image: [])
    end

end
