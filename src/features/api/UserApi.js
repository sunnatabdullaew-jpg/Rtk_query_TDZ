import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/"
  }),

  tagTypes: ["Users"],

  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "users",
      providesTags: ["Users"]
    }),

    addUser: builder.mutation({
      query: (newUser) => ({
        url: "users",
        method: "POST",
        body: newUser
      }),

      invalidatesTags: ["Users"]
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE"
      }),

      invalidatesTags: ["Users"]
    }),
    editUser: builder.mutation({
      query: ({ id, editedUser }) => ({
        url: `users/${id}`,
        method: "PUT",
        body: editedUser
      }),

      invalidatesTags: ["Users"]
    })
  })
});

export const { useGetUsersQuery, useAddUserMutation, useDeleteUserMutation, useEditUserMutation } =
  userApi;
