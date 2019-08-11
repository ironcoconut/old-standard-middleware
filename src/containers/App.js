import React from 'react';
import { store } from "../store";
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Books from "./Books";
import Characters from "./Characters";
import Movies from "./Movies";

const Home = () => <h3>Welcome!</h3>;

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="container-fluid">
          <div className="row">
            <div className="col-auto px-0">
              <ul className="list-group list-group-flush">
                <NavLink exact className="list-group-item list-group-item-action" to="/">Home</NavLink>
                <li className="list-group-item disabled">
                  Lord of the Rings
                </li>
                <NavLink className="list-group-item list-group-item-action" to="/lor/books">Books</NavLink>
                <NavLink className="list-group-item list-group-item-action" to="/lor/characters">Characters</NavLink>
                <NavLink className="list-group-item list-group-item-action" to="/lor/movies">Movies</NavLink>
              </ul>
            </div>
            <div className="col pl-3 pr-0 pb-0">
              <Route exact path="/" component={Home} />
              <Route path="/lor/books" component={Books} />
              <Route path="/lor/characters" component={Characters} />
              <Route path="/lor/movies" component={Movies} />
            </div>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
