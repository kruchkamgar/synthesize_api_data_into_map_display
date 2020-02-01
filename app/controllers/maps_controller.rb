
class MapsController < ApplicationController
  include RandomNumbers
  include ReadWeather

  def index
  end

  def show
    coordinates = make_coordinates(map_params[:quantity])
    weather = weather_data( coordinates )

    render json: weather
  end


  private

  def map_params
    params.permit(:quantity)
  end

end
