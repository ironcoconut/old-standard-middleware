let handlers = {};

export const register = (key, callback) => {
  if(handlers[key]) {
    console.error(`Duplicate enhance key: ${key}`);
  } else {
    handlers[key] = callback;
  }
}

// Adds data from store to payload.
const enhance = ({ getState }) => next => action => {
  if(action.meta && action.meta.enhance) {
    const handler = handlers[action.meta.enhance];
    const state = getState();
    const enhancement = handler(state);
    action.payload = {
      ...action.payload,
      ...enhancement,
    };
  }
  return next(action);
};

enhance.register = register;

export default enhance;
