import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { createSelector } from "reselect";
import actions from "../actions";
import Quotes from "./Quotes";

const getCharacters = state => state.characters;
const getFilter = state => state.charactersFilter.toLowerCase();
const getFilteredCharacters = createSelector(
  getCharacters,
  getFilter,
  (characters, filter) => filter
    ? Object.values(characters).filter(c => -1 < c.name.toLowerCase().indexOf(filter))
    : Object.values(characters)
)

const mapStateToProps = (state) => {
  return {
    characters: getFilteredCharacters(state),
    filter: state.charactersFilter,
  };
};

const mapDispatchToProps = {
  onGet: actions("GET_LOR_CHARACTERS_REQUEST"),
  onFilter: actions("DOCUMENT_LOR_CHARACTERS_FILTER"),
};

const Characters = ({ characters, filter, onGet, onFilter }) => {
  useEffect(() => { onGet() }, [onGet]);

  return (
    <React.Fragment>
      <input
        className="form-control"
        type="text"
        placeholder="Filter"
        value={filter}
        onChange={e => onFilter(e.target.value)}
      />
      {0 < characters.length &&
        <ul className="mb-0" style={{maxHeight: "calc(100vh - 38px)", overflowX: "scroll"}}>
          {characters.map(character => (
            <li key={character._id}>
              <p>{character.name}</p>
              <Quotes id={character._id} />
            </li>
          ))}
        </ul>
      }
    </React.Fragment>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Characters)
