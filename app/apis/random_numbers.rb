require 'uri'
require 'net/https'

module RandomNumbers

  API_KEY = Rails.application.credentials.random_org[:api_key]
  API_URL = 'https://api.random.org/json-rpc/2/invoke'
  REQ_ID = "22094"
  # data-specific arguments
  LAT_RANGE = [ -90, 90 ]
  LON_RANGE = [ -180, 180 ]
  DECIMAL_PLACES = 6
  BASE = 10
  # ?
  REPLACEMENT = true

  # def coordinates_(quantity = 0)

    # formed_coordinates = fetch_numbers(quantity)
    # made_coordinates =
    # formed_coordinates
    # .map do |integer_with_decimal|
    #   integer_with_decimal.join('').to_f end

  # end

  def make_coordinates(quantity=0)

    integer_responses =
    Hash[
      lat:
        send_post_request(
          make_integer_req_hash(quantity, *LAT_RANGE) ),
      lon:
        send_post_request(
          make_integer_req_hash(quantity, *LON_RANGE) ) ]

    integers_arrays =
    Hash[
      lat:
        JSON.parse(
          integer_responses[:lat]
          .body
        )["result"]["random"]["data"],
      lon:
        JSON.parse(
          integer_responses[:lon]
          .body
        )["result"]["random"]["data"] ]

    integer_pairs = integers_arrays[:lat].zip(integers_arrays[:lon])

    decimals =
    JSON.parse(
      send_post_request(
        make_decimal_req_hash(quantity.to_i * 2) )
      .body
    )["result"]["random"]["data"]  # two decimals per coordinate (for LAT, LON)

    made_coordinates =
    integer_pairs
    .map do |pair|
      Hash[
        lat: pair[0] + decimals.shift.to_f,
        lon: pair[1] + decimals.shift.to_f ] end

  end

  private

  # ///////////// helpers ///////////// #


  # uri = URI('https://myapp.com/api/v1/resource')
  def send_post_request(req_hash)
    # retried = false
    # begin

    uri = URI(API_URL)

    req =
    Net::HTTP::Post.new(
      uri,
      'Content-Type' => 'application/json' )
    req.body = req_hash.to_json

    res =
    Net::HTTP
    .start(uri.hostname, uri.port, :use_ssl => uri.scheme == 'https', read_timeout: 15) do |http|
      http.request(req) end

    # rescue Errno::ECONNREFUSED, Net::ReadTimeout => error
    #   unless retried
    #     retried = true
    #     retry
    #   else error end
    # end
  end #send_post_request

  def make_integer_req_hash (quantity, min, max)
    Hash[
      jsonrpc: JSON_RPC,
      method: INTEGER_METHOD,
      id: REQ_ID,
      params:
        Hash[
          n: quantity,
          min: min,
          max: max,
          replacement: REPLACEMENT,
          base: BASE,
          apiKey: API_KEY ]
    ]
  end

  def make_decimal_req_hash (quantity)
    Hash[
      jsonrpc: JSON_RPC,
      method: DECIMAL_METHOD,
      id: REQ_ID,
      params:
        Hash[
          n: quantity,
          decimalPlaces: DECIMAL_PLACES,
          replacement: REPLACEMENT,
          apiKey: API_KEY ]
    ]
  end

  INTEGER_METHOD = "generateIntegers"
  DECIMAL_METHOD = "generateDecimalFractions"

  JSON_RPC = "2.0"

end

# {
#     "jsonrpc": "2.0",
#     "method": "generateDecimalFractions",
#     "params": {
#         "apiKey": "3283c5db-938b-4f47-b203-1e5ea2ef0907",
#         "n": 5,
#         "decimalPlaces": 10,
#         "replacement": true
#     },
#     "id": 22094
# }

# {
#     "jsonrpc": "2.0",
#     "method": "generateIntegers",
#     "params": {
#         "apiKey": "3283c5db-938b-4f47-b203-1e5ea2ef0907",
#         "n": 10,
#         "min": -180,
#         "max": 180,
#         "replacement": true,
#         "base": 10
#     },
#     "id": 22094
# }
