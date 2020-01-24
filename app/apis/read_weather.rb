
module ReadWeather

  API_ID = Rails.application.credentials.open_weather_map[:api_id]

  def weather_data(locations = nil)
    locations
    .map do |location|
      fetch_city_weather(location) end
  end

  def fetch_city_weather(city)
    data = JSON.parse( RestClient.get( url(city) ))
  end

  private

  def url(city)
    "http://api.openweathermap.org/data/2.5/weather?q=#{city}&appid=#{API_ID}"
  end

end
