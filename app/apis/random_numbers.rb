
module RandomNumbers

  API_KEY = 
  API_URL = 'https://api.random.org/json-rpc/2/invoke'
  REQ_ID = "22094"
  # data-specific arguments
  LAT_RANGE = [ -180, 180 ]
  LON_RANGE = [ -90, 90 ]
  DECIMAL_PLACES = 6
  BASE = 10
  # ?
  REPLACEMENT = true

  def _coordinates(quantity = 0)
    # array of results
  end

  def fetch_numbers(quantity=0)
    integers =
      [ send_post_request(
          make_integer_req_hash(quantity, ...LAT_RANGE) ),
        send_post_request(
          make_integer_req_hash(quantity, ...LON_RANGE) ) ]

    decimals =
      [ send_post_request(
          make_decimal_req_hash(quantity * 2) ] # two decimals per coordinate (for LAT, LON)

    formed_coordinates_data =
    integers.splice(decimals) # transpose?

    formed_coordinates_data
    .map do |data|
      data[:result][:random][:data] end
  end

  private

  # ///////////// helpers ///////////// #

  # uri = URI('https://myapp.com/api/v1/resource')
  def send_post_request(req_hash)
    uri = URI(API_URL)

    req =
    Net::HTTP::Post.new(
      uri,
      'Content-Type' => 'application/json' )
    req.body = req_hash.to_json

    res =
    Net::HTTP
    .start(uri.hostname, uri.port) do |http|
      http.request(req)
    end
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
