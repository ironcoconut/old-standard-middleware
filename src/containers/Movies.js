import React, { useEffect } from 'react';
import { connect } from "react-redux";
import actions from "../actions";

const mapStateToProps = (state) => {
  return {
    movies: state.movies,
  };
};

const mapDispatchToProps = {
  get: actions("GET_LOR_MOVIES_REQUEST"),
};

const Moview = ({ movies, get }) => {
  useEffect(() => { get() }, [get]);

  return (
    <ul>
      {Object.values(movies).map(movie => (
        <li key={movie._id}>{movie.name}</li>
      ))}
    </ul>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Moview)
