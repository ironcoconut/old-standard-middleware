import isFunction from "lodash/isFunction";
import LOR from "./lordOfTheRings";
import lorBooks from "./lorBooks";
import lorCharacters from "./lorCharacters";
import lorCharactersFilter from "./lorCharactersFilter";
import lorMovies from "./lorMovies";
import lorQuotes from "./lorQuotes";

let actions = {};

const register = (type, action) => {
  if(actions[type]) {
    console.error(`Duplicate action: ${type}`);
  } else {
    actions[type] = action;
  }
}

[ LOR, lorBooks, lorCharacters, lorCharactersFilter, lorMovies, lorQuotes].forEach(group => {
  Object.keys(group).forEach(key => register(key, group[key]));
});

const merge = (...args) => Object.assign({}, ...args.filter(i=>i));

const buildAction = (type) => (payload={}) => {
  const action = actions[type];
  let result;

  if(!action) {
    const warning = `No action defined for type: ${type}`;
    console.warn(warning);
    result = {
      type,
      payload,
      meta: { warning },
    };
  } else if(isFunction(action)) {
    result = { ...action(payload), type };
  } else {
    result = {
      type,
      payload: merge(action.payload, payload),
      meta: merge(action.meta),
    };
  }
  return result;
};

export default buildAction;
