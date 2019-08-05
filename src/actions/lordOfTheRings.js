import { transform } from "../middleware";

const token = process.env.REACT_APP_LOR_TOKEN;

const Authorization = `Bearer ${token}`;

transform.register("LOR_TOKEN", payload => {
  if(!payload.headers) {
    payload.headers = {};
  }
  Object.assign(payload.headers, { Authorization });
  return payload;
});

transform.register("LOR_TO_ARRAY", payload => Object.values(payload));

export default [
  {
    type: "GET_LOR_BOOKS_REQUEST",
    payload: {
      url: "https://the-one-api.herokuapp.com/v1/book",
    },
    meta: {
      transform: "LOR_TOKEN",
      request: {
        onSuccess: "GET_LOR_BOOKS_SUCCESS",
        onError: "GET_LOR_BOOKS_ERROR",
      },
    },
  },
  {
    type: "GET_LOR_BOOKS_SUCCESS",
    meta: {
      split: [
        {
          type: "DOCUMENT_LOR_BOOKS",
          path: ["data", "docs"],
        },
      ]
    },
  },
  {
    type: "GET_LOR_BOOKS_ERROR",
    error: true,
  },
  {
    type: "DOCUMENT_LOR_BOOKS",
    meta: {
      transform: "LOR_TO_ARRAY",
      reducer: {
        path: ["books"],
        method: "merge",
        idKey: "_id",
      },
    },
  },
  {
    type: "GET_LOR_CHARACTERS_REQUEST",
    payload: {
      url: "https://the-one-api.herokuapp.com/v1/character",
    },
    meta: {
      transform: "LOR_TOKEN",
      request: {
        onSuccess: "GET_LOR_CHARACTERS_SUCCESS",
        onError: "GET_LOR_CHARACTERS_ERROR",
      },
    },
  },
  {
    type: "GET_LOR_CHARACTERS_SUCCESS",
    meta: {
      split: [
        {
          type: "DOCUMENT_LOR_CHARACTERS",
          path: ["data", "docs"],
        },
      ]
    },
  },
  {
    type: "GET_LOR_CHARACTERS_ERROR",
    error: true,
  },
  {
    type: "DOCUMENT_LOR_CHARACTERS",
    meta: {
      transform: "LOR_TO_ARRAY",
      reducer: {
        path: ["characters"],
        method: "merge",
        idKey: "_id",
        model: "character",
      },
    },
  },
  {
    type: "GET_LOR_MOVIES_REQUEST",
    payload: {
      url: "https://the-one-api.herokuapp.com/v1/movie",
    },
    meta: {
      transform: "LOR_TOKEN",
      request: {
        onSuccess: "GET_LOR_MOVIES_SUCCESS",
        onError: "GET_LOR_MOVIES_ERROR",
      },
    },
  },
  {
    type: "GET_LOR_MOVIES_SUCCESS",
    meta: {
      split: [
        {
          type: "DOCUMENT_LOR_MOVIES",
          path: ["data", "docs"],
        },
      ]
    },
  },
  {
    type: "GET_LOR_MOVIES_ERROR",
    error: true,
  },
  {
    type: "DOCUMENT_LOR_MOVIES",
    meta: {
      transform: "LOR_TO_ARRAY",
      reducer: {
        path: ["movies"],
        method: "merge",
        idKey: "_id",
      },
    },
  },
];
