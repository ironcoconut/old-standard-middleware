---
to: src/middleware/<%= name %>.js
---
const <%= name %> = ({ getState, dispatch }) => dispatch => action => {
  if(action.meta && action.meta.<%= name %>) {
    console.log("Setup <%= name %> middleware at: src/middleware/<%= name %>.js");
  }
};

export defaul <%= name %>;
