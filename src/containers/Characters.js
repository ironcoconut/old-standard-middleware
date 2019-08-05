import React from 'react';
import { connect } from "react-redux";
import actions from "../actions";

const mapStateToProps = (state) => {
  return {
    characters: state.API.characters,
  };
};

const mapDispatchToProps = {
  get: () => actions("GET_LOR_CHARACTERS_REQUEST"),
};

const Characters = ({ characters, get }) => (
  <React.Fragment>
    {0 < Object.values(characters).length &&
      <ul style={{maxHeight: 250, overflowX: "scroll"}}>
        {Object.values(characters).map(character => (
          <li key={character._id}>{character.name}</li>
        ))}
      </ul>
    }
    <button
      className="btn btn-secondary btn-large btn-block"
      type="button"
      onClick={get}
    >
      GET LOR CHARACTERS
    </button>
  </React.Fragment>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Characters)
