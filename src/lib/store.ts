
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Post, NewPost } from './types';

interface RawPost {
  id: number;
  title: string;
  body: string;
  userId?: number;
}


export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => '/posts',
      transformResponse: (response: RawPost[]): Post[] => 
        response.slice(0, 20).map(post => ({
          id: post.id,
          title: post.title,
          body: post.body,
          author: `Author ${post.id}`,
          excerpt: post.body.substring(0, 100) + '...'
        })),
      providesTags: (result) => 
        result 
          ? [...result.map(({ id }) => ({ type: 'Post' as const, id })), 'Post']
          : ['Post']
    }),
    getPost: builder.query<Post, number>({
      query: (id) => `/posts/${id}`,
      transformResponse: (response: RawPost): Post => ({
        id: response.id,
        title: response.title,
        body: response.body,
        author: `Author ${response.id}`,
      }),
      providesTags: (result, error, id) => [{ type: 'Post', id }]
    }),
    addPost: builder.mutation<Post, NewPost>({
      query: (newPost) => ({
        url: '/posts',
        method: 'POST',
        body: newPost
      }),
      invalidatesTags: ['Post'],
      async onQueryStarted(newPost, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData('getPosts', undefined, (draft) => {
            const tempId = Math.max(0, ...draft.map(post => post.id)) + 1;
            draft.unshift({
              id: tempId,
              title: newPost.title,
              body: newPost.body,
              author: newPost.author,
              excerpt: newPost.body.substring(0, 100) + '...'
            });
          })
        );
        try {
          const { data: createdPost } = await queryFulfilled;
          patchResult.undo();
          dispatch(
            api.util.updateQueryData('getPosts', undefined, (draft) => {
              draft.unshift({
                ...createdPost,
                author: newPost.author,
                excerpt: newPost.body.substring(0, 100) + '...',
              });
            })
          );
        } catch {
          patchResult.undo();
        }
      }
    }),
    updatePost: builder.mutation<Post, Partial<Post> & Pick<Post, 'id'>>({
      query: ({ id, ...patch }) => ({
        url: `/posts/${id}`,
        method: 'PATCH',
        body: patch
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Post', id }]
    }),
    deletePost: builder.mutation<void, number>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Post', id }]
    })
  })
});

export const { 
  useGetPostsQuery,
  useGetPostQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation
} = api;

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

