import Ajv from "ajv";
import schema from "../schema";
import cloneDeep from "lodash/cloneDeep";
import debounce from "lodash/debounce";

const ajv = new Ajv({ useDefaults: "empty", removeAdditional: "failing" })

ajv.addKeyword("blacklist", {
  compile: (...args) => (data, path, parentData) => {
    const key = path.split(".")[1];
    delete parentData[key];
    return true;
  },
  modifying: true,
});

const validate = ajv.compile(schema);

function persistState(state) {
  const copy = cloneDeep(state);
  validate(copy);
  console.log("Persist:", copy);
  window.localStorage.setItem("old-standard-api", JSON.stringify(copy));
}

export default debounce(persistState, 250);
