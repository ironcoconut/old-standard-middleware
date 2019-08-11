import Ajv from "ajv";
import schema from "../schema";

const ajv = new Ajv({ useDefaults: "empty", removeAdditional: "failing" })
const validate = ajv.compile(schema);

const rehydrate = () => {
  let initialState = JSON.parse(
    window.localStorage.getItem("old-standard-api")
  );
  if(initialState) {
    validate(initialState);
    return initialState;
  } else {
    return undefined;
  }
};

export default rehydrate;
