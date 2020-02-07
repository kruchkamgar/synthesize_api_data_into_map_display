import React from 'react';

const flyToCoordinates = (_this, event) => {
  const coordinates = _this.state.coordinates;
  const presentIndex =
  coordinates.
  findIndex( coordinate => {
    return (
      coordinate.coord.lon == _this.state.center[0] &&
      coordinate.coord.lat == _this.state.center[1] ) }
  );
  const className = event.target.className;

  if (className === "left") {
    const coordinate =
    coordinates[
      presentIndex == 0 ?
        coordinates.length-1 : presentIndex-1 ];
    console.log("flyToCoordinates, coordinate", coordinate);
    _this.setState({
      center:
        [ coordinate.coord.lon,
          coordinate.coord.lat ] });
  }
  else {
    const coordinate =
    coordinates[
      coordinates.length > presentIndex+1 ?
        presentIndex+1 : 0 ];
    _this.setState({
      center:
        [ coordinate.coord.lon,
          coordinate.coord.lat ] });
  }
} // flyToCoordinates

export default flyToCoordinates
