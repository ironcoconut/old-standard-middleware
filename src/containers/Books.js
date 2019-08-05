import React from 'react';
import { connect } from "react-redux";
import actions from "../actions";

const mapStateToProps = (state) => {
  return {
    books: state.API.books,
  };
};

const mapDispatchToProps = {
  get: () => actions("GET_LOR_BOOKS_REQUEST"),
};

const Books = ({ books, get }) => (
  <React.Fragment>
    <ul>
      {Object.values(books).map(book => (
        <li key={book._id}>{book.name}</li>
      ))}
    </ul>
    <button
      className="btn btn-primary btn-large btn-block"
      type="button"
      onClick={get}
    >
      GET LOR BOOKS
    </button>
  </React.Fragment>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Books)
