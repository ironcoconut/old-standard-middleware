export default {
  "GET_LOR_BOOKS_REQUEST": {
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
  "GET_LOR_BOOKS_SUCCESS": {
    meta: {
      split: [
        {
          type: "DOCUMENT_LOR_BOOKS",
          path: ["data", "docs"],
        },
      ]
    },
  },
  "DOCUMENT_LOR_BOOKS": {
    meta: {
      transform: "LOR_TO_ARRAY",
      reducer: {
        path: ["books"],
        method: "mergeOn",
        idKey: "_id",
      },
    },
  },
};
