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
          <div key={index} className="row mx-n3">
            <div className="col pt-3 px-3">
              <Item />
            </div>
          </div>
        )}
      </div>
    </Provider>
  );
}

export default App;
