import React from 'react';
import { connect } from "react-redux";
import actions from "../actions";

const mapStateToProps = (state) => {
  return {
    movies: state.API.movies,
  };
};

const mapDispatchToProps = {
  get: () => actions("GET_LOR_MOVIES_REQUEST"),
};

const Characters = ({ movies, get }) => (
  <React.Fragment>
    {0 < Object.values(movies).length &&
      <ul>
        {Object.values(movies).map(movie => (
          <li key={movie._id}>{movie.name}</li>
        ))}
      </ul>
    }
    <button
      className="btn btn-info btn-large btn-block"
      type="button"
      onClick={get}
    >
      GET LOR MOVIES
    </button>
  </React.Fragment>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Characters)
