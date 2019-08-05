import Ajv from "ajv";

const schema = {
  "$id": "/old-std/reducer.json",
  "type": "object",
  "additionalProperties": false,
  "required": [ "actions", "books", "movies", "characters" ],
  "properties": {
    "actions": {
      "type": "array",
      "default": [],
      "blacklist": true,
      "items": {
        "type": "object",
        "required": [ "type" ],
        "properties": {
          "type": {
            "type": "string",
          },
          "payload": {},
          "meta": {},
          "error": {
            "type": "boolean",
          },
        },
      },
    },
    "books": {
      "type": "object",
      "default": {},
      "patternProperties": {
        ".*": {
          "type": "object",
          "required": [ "_id" ],
          "properties": {
            "_id": {
              "type": "string",
            },
            "name": {
              "type": "string",
            },
          },
        },
      },
    },
    "characters": {
      "type": "object",
      "default": {},
      "patternProperties": {
        ".*": {
          "type": "object",
          "required": [ "_id" ],
          "properties": {
            "_id": {
              "type": "string",
            },
            "name": {
              "type": "string",
            },
          },
        },
      },
    },
    "movies": {
      "type": "object",
      "default": {},
      "patternProperties": {
        ".*": {
          "type": "object",
          "required": [ "_id" ],
          "properties": {
            "_id": {
              "type": "string",
            },
            "name": {
              "type": "string",
            },
          },
        },
      },
    },
  },
};

const ajv = new Ajv();
const validate = ajv.compile(schema);

const getDefault = new Ajv({ useDefaults: true })
let defaultData = {};
getDefault.compile(schema)(defaultData);

export { schema, validate, defaultData };
