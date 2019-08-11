export default {
  "GET_LOR_CHARACTERS_REQUEST": {
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
  "GET_LOR_CHARACTERS_SUCCESS": {
    meta: {
      split: [
        {
          type: "DOCUMENT_LOR_CHARACTERS",
          path: ["data", "docs"],
        },
      ]
    },
  },
  "DOCUMENT_LOR_CHARACTERS": {
    meta: {
      transform: "LOR_TO_ARRAY",
      reducer: {
        path: ["characters"],
        method: "mergeOn",
        idKey: "_id",
        model: "character",
      },
    },
  },
};
