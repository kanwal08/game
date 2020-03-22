class ImagesController < ApplicationController
  
  def create
    message = Image.create!(image_params)
    redirect_to message
  end

  private
    def image_params
      params.require(:image).permit(images: [])
    end
end
