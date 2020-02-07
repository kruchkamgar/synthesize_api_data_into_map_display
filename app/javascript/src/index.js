import React from 'react';
import ReactDOM from 'react-dom';
import Input from './components/Input';
import Navigation from './components/Navigation';
import drawCoordinates from './drawCoordinates';
import mapboxgl from 'mapbox-gl';
import fetch from 'isomorphic-fetch';

import access from 'src/api_config';
mapboxgl.accessToken = access.token;

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coordinates: [ {coord: {lon:-121.415061, lat: 40.506229}} ],
      center: [-121.415061, 40.506229]
    };
    {/*this.onCoordinatesInput = this.onCoordinatesInput.bind(this);*/}
  }

  withState = (effect, event) => {
    effect(this, event);
  }

  onCoordinatesInput = (number) => {
    fetch(`/maps/${number}`)
    .then(response => response.json())
    .then(coordinates => {
      console.log('coordinates: ', coordinates);
      this.setState({
        coordinates: coordinates,
        center:
          [ coordinates[0].coord.lon,
            coordinates[0].coord.lat ] });
    } )
    .catch(error => console.log(error) );
  }

  componentDidUpdate(prevProps, prevState){
    const state = this.state;
    let map = state.map;

    map
    .flyTo({
      center: this.state.center,
      zoom: 6.5 });

    if (state.coordinates != prevState.coordinates) {
      drawCoordinates(map, state); }
  }

  componentDidMount() {
    let map =
    new mapboxgl
    .Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.state.center })

    map
    .on('load', () => {
      this.setState((state, props) => ({ map: map }) );
      drawCoordinates(map, this.state);
    });
  }

  render() {
    return (
        <div ref={el => this.mapContainer = el}
          className="mapContainer">
          <Input coordinatesInput={this.onCoordinatesInput}/>
          <Navigation arrow={"left"} onEvent={this.withState} />
          <Navigation arrow={"right"} onEvent={this.withState} />
        </div>
    )
  }
}

document.addEventListener("DOMContentLoaded", function(event){
  ReactDOM.render(<Application />, document.getElementById('app'));
});
