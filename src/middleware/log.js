const log = ({ getState, dispatch }) => next => action => {
  console.info(action);
  return next(action);
};

export default log;
