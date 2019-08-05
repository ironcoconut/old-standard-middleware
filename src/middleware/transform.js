let handlers = {};

export const register = (key, callback) => {
  if(handlers[key]) {
    console.error(`Duplicate transform key: ${key}`);
  } else {
    handlers[key] = callback;
  }
}

const transform = () => next => action => {
  if(action.meta && action.meta.transform) {
    const handler = handlers[action.meta.transform];
    action.payload = handler(action.payload || {});
  }
  return next(action);
};

transform.register = register;

export default transform;
