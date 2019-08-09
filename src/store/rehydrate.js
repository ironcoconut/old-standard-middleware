import Ajv from "ajv";
import schema from "../schema";

const ajv = new Ajv({ useDefaults: "empty", removeAdditional: "failing" })
const validate = ajv.compile(schema);

const rehydrate = () => {
  let initialState = JSON.parse(
    window.localStorage.getItem("old-standard-api")
  );
  validate(initialState);
  return initialState;
};

export default rehydrate;
