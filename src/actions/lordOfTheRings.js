import { transform } from "../middleware";

const token = process.env.REACT_APP_LOR_TOKEN;

const Authorization = `Bearer ${token}`;

transform.register("LOR_TOKEN", payload => {
  payload.headers
    ? payload.headers = { ...payload.headers, Authorization }
    : payload.headers = { Authorization };
  return payload;
});

transform.register("LOR_TO_ARRAY", payload => Object.values(payload));

export default {
};
