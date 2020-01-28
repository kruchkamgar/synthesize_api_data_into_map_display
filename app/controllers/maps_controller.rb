
class MapsController < ApplicationController
  include RandomNumbers
  include ReadWeather

  def index
  end

  def show
    coordinates = coordinates_(map_params[:quantity])

    byebug
    weather = weather_data( coordinates )

    render json: coordinates.zip(weather)

  end


  private

  def map_params
    params.permit(:quantity)
  end

end
