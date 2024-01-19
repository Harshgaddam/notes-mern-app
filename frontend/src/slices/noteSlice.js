import { NOTES_URL } from "../constants";
import { AWS_URL } from "../constants";
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
    createNote: builder.mutation({
      query: (data) => ({
        url: `${NOTES_URL}/createNote`,
        method: "PUT",
        body: data,
      }),
      onQueryStarted: (data) => {
        console.log("Data received from createNote mutation:", data);
      },
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
    deleteNote: builder.mutation({
      query: (noteId) => ({
        url: `${NOTES_URL}/${noteId}`,
        method: "DELETE",
      }),
      onQueryStarted: (data) => {
        console.log("Data received from deleteNote mutation:", data);
      },
    }),
    uploadFile: builder.mutation({
      query: (data) => ({
        url: `${AWS_URL}/putFile`,
        method: "PUT",
        body: data,
      }),
      onQueryStarted: (data) => {
        console.log("Data received from uploadFile mutation:", data);
      },
    }),
    deleteFile: builder.mutation({
      query: (filePath) => ({
        url: `${AWS_URL}/deleteFile`,
        method: "DELETE",
        params: { filePath: filePath },
      }),
      onQueryStarted: (data) => {
        console.log("Data received from deleteFile mutation:", data);
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
        (note) => note.noteId === newNote.noteId
      );
      console.log("existingNoteIndex:", existingNoteIndex);
      if (existingNoteIndex === -1) state.myNotes.push(newNote);
      else state.myNotes[existingNoteIndex] = newNote;

      console.log("state:", state);

      localStorage.setItem("notes", JSON.stringify(state));
    },
    removeNoteFromState: (state, action) => {
      const noteId = action.payload;
      const existingNoteIndex = state.myNotes.findIndex(
        (note) => note.noteId === noteId
      );
      if (existingNoteIndex !== -1) {
        state.myNotes.splice(existingNoteIndex, 1);
        localStorage.setItem("notes", JSON.stringify(state));
      }
    },
  },
});

export const {
  useGetNotesQuery,
  useGetNoteByIdQuery,
  useCreateNoteMutation,
  useSaveNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
  useUploadFileMutation,
  useDeleteFileMutation,
} = noteSlice;

export const { addNote, removeNoteFromState } = noteSliceActions.actions;

export default noteSliceActions.reducer;
