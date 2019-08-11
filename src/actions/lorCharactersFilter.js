export default {
  "DOCUMENT_LOR_CHARACTERS_FILTER": filter => ({
    payload: filter,
    meta: {
      reducer: {
        path: ["charactersFilter"],
        method: "set",
      },
    },
  }),
};
