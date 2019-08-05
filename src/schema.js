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
    "movies": {
      "type": "object",
      "default": {},
      "patternProperties": {
        ".*": {
          "$ref": "#/definitions/movie",
        },
      },
    },
  },
  "definitions": {
    "movie": {
      "type": "object",
      "required": [ "_id", "name" ],
      "properties": {
        "_id": {
          "type": "string",
        },
        "name": {
          "type": "string",
        },
      },
    },
    "book": {
      "type": "object",
      "required": [ "_id", "name" ],
      "properties": {
        "_id": {
          "type": "string",
        },
        "name": {
          "type": "string",
        },
      },
    },
    "character": {
      "type": "object",
      "required": [ "_id", "name" ],
      "additionalProperties": false,
      "properties": {
        "_id": {
          "type": "string",
        },
        "name": {
          "type": "string",
        },
        "race": {
          "type": "string",
          "default": "",
        },
      },
    },
  },
};

export default schema;
