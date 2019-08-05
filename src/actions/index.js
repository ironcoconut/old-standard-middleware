import LOR from "./lordOfTheRings";

let actions = {};

const register = (action) => {
  const type = action.type;
  if(actions[type]) {
    console.error(`Duplicate action: ${type}`);
  } else {
    actions[type] = action;
  }
}

LOR.forEach(register);

const merge = (...args) => Object.assign({}, ...args.filter(i=>i));

const buildAction = (type, payload={}) => {
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
