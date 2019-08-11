import Ajv from "ajv";
import isFunction from "lodash/isFunction";
import schema from "../schema";
import LOR from "./lordOfTheRings";
import lorBooks from "./lorBooks";
import lorCharacters from "./lorCharacters";
import lorCharactersFilter from "./lorCharactersFilter";
import lorMovies from "./lorMovies";
import lorQuotes from "./lorQuotes";

const ajv = new Ajv()
ajv.compile(schema);

let actions = {};

const validateAction = (action) => {
  const validate = ajv.getSchema("/old-std/reducer.json#/definitions/action");
  const valid = validate(action);

  if(!valid) {
    console.warn("Errors on action:", action.type, validate.errors);
  }
};

const register = (type, action) => {
  if(actions[type]) {
    console.error(`Duplicate action: ${type}`);
  } else {
    actions[type] = action;
  }
  validateAction(buildAction(type)());
}

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

[ LOR, lorBooks, lorCharacters, lorCharactersFilter, lorMovies, lorQuotes].forEach(group => {
  Object.keys(group).forEach(key => register(key, group[key]));
});

export default buildAction;
