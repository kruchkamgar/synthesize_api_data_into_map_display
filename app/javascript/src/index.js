import React from 'react';
import ReactDOM from 'react-dom';
import Input from './components/Input'
import mapboxgl from 'mapbox-gl';
import access from 'src/api_config'
import fetch from 'isomorphic-fetch'


mapboxgl.accessToken = access.token;

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coordinates: [ {coord: {lon:-121.415061, lat: 40.506229}} ],
      center: [-121.403732, 40.492392]
    };
    {/*this.onCoordinatesInput = this.onCoordinatesInput.bind(this);*/}
  }

  onCoordinatesInput = (number) => {
    fetch(`/maps/${number}`)
    .then(response => response.json())
    .then(coordinates =>
      this.setState({ coordinates: coordinates })
    )
    .catch(error => console.log(error) );
  }

  componentDidUpdate(){
    console.log(this.state.coordinates);
    let state = this.state;
    let map = state.map;

    let sourceLoaded = map.isSourceLoaded('national-park');
    if ( sourceLoaded ) {
      map.removeLayer('weather-points');
      map.removeSource('national-park'); }

    map
    .addSource('national-park', {
    'type': 'geojson',
    'data': {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [
              state.coordinates[0].coord.lon,
              state.coordinates[0].coord.lat ]
          }
        },
        {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [-121.505184, 40.488084]
          }
        },
        {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [-121.354465, 40.488737]
          }
        },
      ]}
    } ); // addSource

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

  componentDidMount() {
    let _this = this;
    let map =
    new mapboxgl
    .Map({
      container: _this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.state.center,
      zoom: 10 })

    map
    .on('load', () => {
      this.setState((state, props) => ({ map: map }) );
    });
  }

  render() {
    return (
        <div ref={el => this.mapContainer = el} className="mapContainer">
          <Input coordinatesInput={this.onCoordinatesInput}/>
        </div>
    )
  }
}

document.addEventListener("DOMContentLoaded", function(event){
  ReactDOM.render(<Application />, document.getElementById('app'));
});
