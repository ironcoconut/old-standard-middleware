import React from 'react';
import { store } from "../store";
import { Provider } from 'react-redux'
import Books from "./Books";
import Characters from "./Characters";
import Movies from "./Movies";

function App() {
  return (
    <Provider store={store}>
      <div className="container-fluid">
        {[Books, Characters, Movies].map((Item, index) =>
          <div key={index} className="row mx-sm-n3">
            <div className="col pt-sm-3 px-sm-3">
              <Item />
            </div>
          </div>
        )}
      </div>
    </Provider>
  );
}

export default App;
