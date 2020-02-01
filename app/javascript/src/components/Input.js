import React from 'react';

const Input = ({coordinatesInput}) => {

  let numCoordinates
  const query_submit = event => {
    event.preventDefault()
    coordinatesInput(numCoordinates.value) }

  return (
    <form onSubmit={ query_submit } className="query">
      <label htmlFor="numCoordinates">number of coordinates?</label>
      <input id="numCoordinates"
        type="number" step="1" min="1"
        ref={input => numCoordinates = input}></input>
      <button>load coordinates</button>
    </form>
  )}

export default Input
