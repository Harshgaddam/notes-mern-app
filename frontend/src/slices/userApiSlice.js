import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data._id}`,
        method: "PUT",
        body: data,
      }),
    }),
    getUserNotes: builder.query({
      query: ({ userId }) => ({
        url: `${USERS_URL}/${userId}/notes`,
        method: "GET",
      }),
    }),
    removeNote: builder.mutation({
      query: ({ userId, noteId }) => ({
        url: `${USERS_URL}/removeNote`,
        method: "POST",
        body: { userId, noteId },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useProfileMutation,
  useUpdateUserMutation,
  useGetUserNotesQuery,
  useRemoveNoteMutation,
} = userApiSlice;
