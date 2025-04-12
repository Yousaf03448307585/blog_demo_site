// types.ts
export interface Post {
    id: number;
    title: string;
    body: string;
    author: string;
    excerpt?: string;
  }
  
  export interface NewPost {
    title: string;
    body: string;
    author: string;
  }
  
  // Define possible error shapes
  interface ApiError {
    status: number;
    data?: {
      message?: string;
      errors?: Record<string, string[]>;
    };
  }
  
  interface SerializedError {
    message?: string;
    code?: string;
    name?: string;
  }
  
  export type ApiErrorType = ApiError | SerializedError | undefined;
  
  export interface ApiResponse<T> {
    data: T;
    isLoading: boolean;
    isError: boolean;
    error?: ApiErrorType;
  }
  
  // Helper type for RTK Query results
  export type QueryResult<T> = {
    data?: T;
    error?: ApiErrorType;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  };
  
  // Type for paginated responses
  export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
  }