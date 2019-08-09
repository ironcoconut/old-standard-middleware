import { createStore } from "redux";
import actions from "../actions";
import reducer from "./reducer";
import enhancer from "./enhancer";
import validate from "./validate";
import persist from "./persist";
import rehydrate from "./rehydrate";
import schema from "../schema";
import Ajv from "ajv";

const API = rehydrate();
const store = createStore(
  reducer,
  { API },
  enhancer,
);

store.subscribe(() => validate(store.getState().API));
store.subscribe(() => persist(store.getState().API));

const request = (type, payload={}) => {
  store.dispatch(actions(type, payload));
};

window.oS = { store, request, schema, Ajv }

export default store;
export { store, request };
