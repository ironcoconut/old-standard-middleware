import { applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import requestMiddleware from "../middleware/request";
import splitMiddleware from "../middleware/split";
import enhanceMiddleware from "../middleware/enhance";
import transformMiddleware from "../middleware/transform";
import logMiddleware from "../middleware/log";
import actions from "../actions";

const middleware = applyMiddleware(
  logMiddleware,
  enhanceMiddleware,
  transformMiddleware,
  requestMiddleware,
  splitMiddleware,
);

const compose = composeWithDevTools({
  name: "Old Standard",
  actionCreators: [actions],
});

const enhancer = compose(middleware);

export default enhancer;
