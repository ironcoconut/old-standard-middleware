const schema = {
  "$id": "/old-std/reducer.json",
  "type": "object",
  "additionalProperties": false,
  "required": [
    "actions",
    "books",
    "characters",
    "characterQuotes",
    "charactersFilter",
    "movies",
    "quotes",
  ],
  "properties": {
    "actions": {
      "type": "array",
      "default": [],
      "blacklist": true,
      "items": {
        "$ref": "#/definitions/action"
      },
    },
    "books": {
      "type": "object",
      "default": {},
      "patternProperties": {
        ".*": {
          "$ref": "#/definitions/book",
        },
      },
    },
    "characters": {
      "type": "object",
      "default": {},
      "patternProperties": {
        ".*": {
          "$ref": "#/definitions/character",
        },
      },
    },
    "characterQuotes": {
      "type": "object",
      "default": {},
      "patternProperties": {
        ".*": {
          "type": "boolean",
        },
      },
    },
    "charactersFilter": {
      "type": "string",
      "default": "",
      "blacklist": true,
    },
    "movies": {
      "type": "object",
      "default": {},
      "patternProperties": {
        ".*": {
          "$ref": "#/definitions/movie",
        },
      },
    },
    "quotes": {
      "type": "object",
      "default": {},
      "patternProperties": {
        ".*": {
          "$ref": "#/definitions/quote",
        },
      },
    },
  },
  "definitions": {
    "path": {
      "type": "array",
      "minLength": 1,
      "items": { "type": "string", "minLength": 1 },
    },
    "movie": {
      "type": "object",
      "required": [ "_id", "name" ],
      "properties": {
        "_id": { "type": "string", "minLength": 1 },
        "name": { "type": "string", "minLength": 1 },
      },
    },
    "book": {
      "type": "object",
      "required": [ "_id", "name" ],
      "properties": {
        "_id": { "type": "string", "minLength": 1 },
        "name": { "type": "string", "minLength": 1 },
      },
    },
    "character": {
      "type": "object",
      "required": [ "_id", "name" ],
      "additionalProperties": false,
      "properties": {
        "_id": { "type": "string", "minLength": 1 },
        "name": { "type": "string", "minLength": 1 },
        "race": { "type": "string", "default": "" },
      },
    },
    "quote": {
      "type": "object",
      "required": [ "_id" ],
      "additionalProperties": false,
      "properties": {
        "_id": { "type": "string", "minLength": 1 },
        "character": { "type": "string", "default": "" },
        "movie": { "type": "string", "default": "" },
        "dialog": { "type": "string", "default": "" },
      },
    },
    "action": {
      "type": "object",
      "required": ["type"],
      "additionalProperties": false,
      "properties": {
        "type": { "type": "string", "minLength": 1 },
        "payload": {},
        "error": { "type": "boolean" },
        "meta": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "transform": { "type": "string", "minLength": 1 },
            "enhance": { "type": "string", "minLength": 1 },
            "request": {
              "type": "object",
              "additionalProperties": false,
              "required": [ "onSuccess", "onError" ],
              "properties": {
                "onSuccess": { "type": "string", "minLength": 1 },
                "onError": { "type": "string", "minLength": 1 },
                "payload": { "type": "object" },
              },
            },
            "split": {
              "type": "array",
              "minItems": 1,
              "items": {
                "type": "object",
                "additionalProperties": false,
                "properties": {
                  "type": { "type": "string", "minLength": 1 },
                  "path": { "$ref": "#/definitions/path" },
                },
              },
            },
            "reducer": {
              "type": "object",
              "oneOf": [
                {
                  "properties": {
                    "path": { "$ref": "#/definitions/path" },
                    "idKey": { "type": "string", "minLength": 1 },
                    "model": { "enum": [ "book", "character", "movie", "quote" ] },
                    "method": { "enum": [ "mergeOn" ] },
                  },
                  "additionalProperties": false,
                  "required": [ "path", "method", "idKey" ],
                },
                {
                  "properties": {
                    "path": { "$ref": "#/definitions/path" },
                    "method": { "enum": [ "concat", "merge", "set" ] },
                  },
                  "additionalProperties": false,
                  "required": [ "path", "method" ],
                },
              ],
            },
          },
        },
      },
    },
  },
};

export default schema;
