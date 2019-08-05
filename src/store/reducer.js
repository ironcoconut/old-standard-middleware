import Ajv from "ajv";
import { combineReducers } from "redux";
import schema from "../schema";

const ajv = new Ajv({ useDefaults: "empty", removeAdditional: "failing" })

// Initial State from Schema
const initialState = {};

ajv.compile(schema)(initialState);

// Validate model from schema
const getValidationFunction = (model) => {
  const validate = ajv.getSchema(`/old-std/reducer.json#/definitions/${model}`);

  return _data => {
    let data = Object.assign({}, _data);
    validate(data);
    return data;
  };
};

const handlers = {
  concat: ({payload}) => state => [...state, payload],
  merge: ({payload, idKey}) => state => {
    window.payload = payload;
    return payload.reduce((acc, item) => {
      const id = item[idKey];
      if(acc[id]) {
        acc[id] = Object.assign({}, acc[id], item);
      } else {
        acc[id] = item;
      }
      return acc;
    }, {...state});
  },
  set: ({payload, idKey}) => state => (
    payload.reduce((acc, item) => {
      const id = item[idKey];
      acc[id] = item;
      return acc;
    }, state)
  ),
};

const processPath = ([next, ...rest], state, handler) => {
  if(0 === rest.length) {
    state[next] = handler(state[next]);
  } else {
    state[next] = processPath(rest, state[next], handler);
  }
  return state;
};

const reducer = (state, action) => {
  if(typeof state === "undefined") {
    return initialState;
  }

  state = {
    ...state,
    actions: [action, ...state.actions],
  };

  if(action.meta && action.meta.reducer) {
    let { payload } = action;

    const { path, method, idKey, model } = action.meta.reducer;

    if (model) {
      payload = payload.map(getValidationFunction(model));
    }

    const handler = handlers[method]({payload, idKey});

    return processPath(path, state, handler);
  } else {
    return state;
  };
};

const coreReducer = combineReducers({
  API: reducer,
});


export default coreReducer;
