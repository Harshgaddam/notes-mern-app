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
      query: (data) => ({
        url: `${NOTES_URL}/saveNote`,
        method: "PUT",
        body: data,
      }),
      onQueryStarted: (data) => {
        console.log("Data received from saveNote mutation:", data);
      },
    }),
    updateNote: builder.mutation({
      query: (data) => ({
        url: `${NOTES_URL}/updateNote`,
        method: "PUT",
        body: data,
      }),
      onQueryStarted: (data) => {
        console.log("Data received from updateNote mutation:", data);
      },
    }),
  }),
});

export const noteSliceActions = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action) => {
      const newNote = action.payload;
      const existingNoteIndex = state.myNotes.findIndex(
        (note) => note._id === newNote._id
      );
      console.log(existingNoteIndex);
      if (existingNoteIndex === -1) {
        state.myNotes.push(newNote);
        localStorage.setItem("notes", JSON.stringify(state));
      } else {
        state.myNotes[existingNoteIndex] = newNote;
        localStorage.setItem("notes", JSON.stringify(state));
      }
    },
  },
});

export const {
  useGetNotesQuery,
  useGetNoteByIdQuery,
  useSaveNoteMutation,
  useUpdateNoteMutation,
} = noteSlice;

export const { addNote } = noteSliceActions.actions;

export default noteSliceActions.reducer;
