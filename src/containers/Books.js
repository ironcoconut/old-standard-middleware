import React, { useEffect } from 'react';
import { connect } from "react-redux";
import actions from "../actions";

const mapStateToProps = (state) => {
  return {
    books: state.books,
  };
};

const mapDispatchToProps = {
  get: actions("GET_LOR_BOOKS_REQUEST"),
};

const Books = ({ books, get }) => {
  useEffect(() => { get() }, [get]);

  return (
    <ul>
      {Object.values(books).map(book => (
        <li key={book._id}>{book.name}</li>
      ))}
    </ul>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Books)
