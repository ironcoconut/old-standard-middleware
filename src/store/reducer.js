import produce from "immer"
import Ajv from "ajv";
import schema from "../schema";

const ajv = new Ajv({ useDefaults: "empty", removeAdditional: "failing" })

// Initial State from Schema
const initialState = {};

ajv.compile(schema)(initialState);

// Validate model from schema
const getValidationFunction = (model) => {
  const validate = ajv.getSchema(`/old-std/reducer.json#/definitions/${model}`);

  return data => {
    validate(data);
    return data;
  }
};

const handlers = {
  concat: ({payload}) => draft => [...draft, payload],
  mergeOn: ({payload, idKey}) => draft => {
    console.log({payload, idKey, draft});
    return payload.reduce((draft, item) => {
      const id = item[idKey];
      if(draft[id]) {
        draft[id] = { ...draft[id], ...item};
      } else {
        draft[id] = item;
      }
      return draft;
    }, draft);
  },
  merge: ({payload}) => draft => ({...draft, ...payload}),
  set: ({payload}) => draft => {
    return draft = payload;
  },
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
  return produce(state, draft => {
    if(typeof draft === "undefined") {
      console.log(initialState);
      return draft = initialState;
    }
    if("CLEAR_API" === action.type) {
      return draft = initialState;
    }

    draft.actions = [action, ...draft.actions];

    if(action.meta && action.meta.reducer) {
      let { payload } = action;

      const { path, method, idKey, model } = action.meta.reducer;

      if (model) {
        payload = payload.map(getValidationFunction(model));
      }


      const handler = handlers[method]({payload, idKey});

      return draft = processPath(path, draft, handler);
    } else {
      return draft;
    };
  });
};

export default reducer;
