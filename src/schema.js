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
    "quote": {
      "type": "object",
      "required": [ "_id" ],
      "additionalProperties": false,
      "properties": {
        "_id": {
          "type": "string",
        },
        "character": {
          "type": "string",
          "default": "",
        },
        "movie": {
          "type": "string",
          "default": "",
        },
        "dialog": {
          "type": "string",
          "default": "",
        },
      },
    },
  },
};

export default schema;
