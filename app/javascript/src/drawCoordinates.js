
export function drawCoordinates(map, state) {
  const source = addSource(map);

  const data = source._data;
  data.features =
  state.coordinates
  .map(coordinates => {
    return {
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [
          coordinates.coord.lon,
          coordinates.coord.lat ] }
        }
      });
  console.log("drawCoordinates, data: ", data);

  source.setData(data);
  addVisualLayer(map);

  return map;
}

function addVisualLayer(map) {
  map
  .addLayer({
    'id': 'weather-points',
    'type': 'circle',
    'source': 'national-park',
    'paint': {
      'circle-radius': 6,
      'circle-color': '#B42222'
    },
    'filter': ['==', '$type', 'Point']
  });
}

function addSource(map) {
  let sourceLoaded = map.getSource('national-park');
  if ( sourceLoaded ) {
    map.removeLayer('weather-points');
    map.removeSource('national-park'); }

  map
  .addSource('national-park', {
    'type': 'geojson',
    'data': {
      'type': 'FeatureCollection',
      'features': [] }
    } );

  return map.getSource('national-park');
}

export default drawCoordinates
