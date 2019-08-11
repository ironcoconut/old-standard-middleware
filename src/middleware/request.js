import axios from "axios";
import actions from "../actions";

const instance = axios.create();

const request = ( { getState, dispatch } ) => next => action => {
  if ( action.meta && action.meta.request ) {
    const { onSuccess, onError, payload={} } = action.meta.request;

    instance
      .request(action.payload)
      .then(result => actions(onSuccess)({...result, ...payload}))
      .catch(error => actions(onError)(error))
      .then(dispatch);
  }
  return next(action);
};

export default request;
