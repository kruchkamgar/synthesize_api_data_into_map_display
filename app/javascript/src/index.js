import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = '';

class Application extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-121.403732, 40.492392],
      zoom: 10
    });

    map.on('load', function() {
      map.addSource('national-park', {
      'type': 'geojson',
      'data': {
        'type': 'FeatureCollection',
        'features': [
          {
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': [-121.415061, 40.506229]
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

      map.addLayer({
        'id': 'weather-points',
        'type': 'circle',
        'source': 'national-park',
        'paint': {
          'circle-radius': 6,
          'circle-color': '#B42222'
        },
        'filter': ['==', '$type', 'Point']
      });
    }); // on load map

  }

  render() {
    return (
      <div>
        <div ref={el => this.mapContainer = el} className="mapContainer" />
      </div>
    )
  }
}

document.addEventListener("DOMContentLoaded", function(event){
  ReactDOM.render(<Application />, document.getElementById('app'));
});
