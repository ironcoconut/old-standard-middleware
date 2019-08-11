export default {
  "GET_LOR_MOVIES_REQUEST": {
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
  "GET_LOR_MOVIES_SUCCESS": {
    meta: {
      split: [
        {
          type: "DOCUMENT_LOR_MOVIES",
          path: ["data", "docs"],
        },
      ]
    }
  },
  "DOCUMENT_LOR_MOVIES": {
    meta: {
      transform: "LOR_TO_ARRAY",
      reducer: {
        path: ["movies"],
        method: "mergeOn",
        idKey: "_id",
      },
    },
  },
};
