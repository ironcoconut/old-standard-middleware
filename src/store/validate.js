import Ajv from "ajv";
import schema from "../schema";

const ajv = new Ajv();
const validate = ajv.compile(schema);

function validateState(state) {
  if(!validate(state)) {
    console.warn("Store does not match schema:", validate.errors);
  }
}

export default validateState;
