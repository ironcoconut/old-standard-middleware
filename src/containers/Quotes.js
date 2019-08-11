import React from 'react';
import { connect } from "react-redux";
import { createSelector } from "reselect";
import actions from "../actions";

const quotesByCharacter = createSelector(
  state => state.quotes,
  quotes => Object.values(quotes).reduce((acc, quote) => ({
    ...acc,
    [quote.character]: acc[quote.character]
      ? [...acc[quote.character], quote]
      : [ quote ],
  }), {})
);

const mapStateToProps = (state, { id }) => {
  return {
    quotes: quotesByCharacter(state)[id],
    loaded: state.characterQuotes[id],
    id
  };
};

const mapDispatchToProps = {
  get: actions("GET_LOR_QUOTES_REQUEST"),
};

const Quotes = ({ quotes, loaded, id, get }) => {
  if(loaded && quotes) {
    return (
      <ul>
        {quotes.map(quote => (
          <li key={quote._id}>{quote.dialog}</li>
        ))}
      </ul>
    );
  } else if (loaded) {
    return <p>No quotes</p>
  } else {
    const onClick = () => get(id);
    return (
        <p>
          <button
            type="button"
            className="btn btn-link p-0"
            onClick={onClick}>
            Quotes
          </button>
        </p>
    );
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Quotes)
