import { NOTES_URL } from "../constants";
import { apiSlice } from "./apiSlice";
import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("notes")
  ? JSON.parse(localStorage.getItem("notes"))
  : { myNotes: [] };

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
    saveNote: builder.mutation({
      query: ({ userId, note }) => ({
        url: `${NOTES_URL}/saveNote`,
        method: "POST",
        data: { userId, note },
      }),
    }),
  }),
});

export const noteSliceActions = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action) => {
      console.log("addNote", action.payload);
      state.myNotes.push(action.payload);
      localStorage.setItem("notes", JSON.stringify(state));
    },
  },
});

export const { useGetNotesQuery, useGetNoteByIdQuery, useSaveNoteMutation } =
  noteSlice;

export const { addNote } = noteSliceActions.actions;

export default noteSliceActions.reducer;
