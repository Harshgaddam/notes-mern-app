import { NOTES_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const noteSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => ({
        url: `${NOTES_URL}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getNoteById: builder.query({
      query: (noteId) => ({
        url: `${NOTES_URL}/${noteId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetNotesQuery, useGetNoteByIdQuery } = noteSlice;
