export default {
  "GET_LOR_QUOTES_REQUEST": characterId => {
    console.log(characterId);
    return ({
      payload: {
        url: `https://the-one-api.herokuapp.com/v1/character/${characterId}/quote`,
      },
      meta: {
        transform: "LOR_TOKEN",
        request: {
          onSuccess: "GET_LOR_QUOTE_SUCCESS",
          onError: "GET_LOR_QUOTE_ERROR",
          payload: {
            characterQuotes: {
              [characterId]: true
            },
          },
        },
      },
    });
  },
  "GET_LOR_QUOTE_SUCCESS": {
    meta: {
      split: [
        {
          type: "DOCUMENT_LOR_QUOTE",
          path: ["data", "docs"],
        },
        { type: "DOCUMENT_LOR_CHARACTER_QUOTES",
          path: ["characterQuotes"],
        },
      ]
    },
  },
  "DOCUMENT_LOR_QUOTE": {
    meta: {
      transform: "LOR_TO_ARRAY",
      reducer: {
        path: ["quotes"],
        method: "mergeOn",
        model: "quote",
        idKey: "_id",
      },
    },
  },
  "DOCUMENT_LOR_CHARACTER_QUOTES": {
    meta: {
      reducer: {
        path: ["characterQuotes"],
        method: "merge",
      },
    },
  },
};
