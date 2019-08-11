import actions from "../actions";

const split = ({ dispatch }) => next => action => {
  const result = next(action);

  if(action.meta && action.meta.split) {
    const { split } = action.meta;

    split.forEach(({ path, type }) => {
      const payload = path.reduce((acc,key) => acc[key], action.payload);
      dispatch(actions(type)(payload));
    });
  }

  return result;
};

export default split;
