
module ReadWeather

  API_ID = Rails.application.credentials.open_weather_map[:api_id]

  def weather_data(coordinates = nil)
    coordinates
    .map do |coordinates|
      byebug
      data = JSON.parse( RestClient.get( url(coordinates) )) end
  end

  private

  def url(coordinates)
    "http://api.openweathermap.org/data/2.5/weather?lat=#{coordinates[:lat]}&lon=#{coordinates[:lon]}&appid=#{API_ID}"
  end

end
