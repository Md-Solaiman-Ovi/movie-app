/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the Movie interface
export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

// Define the MoviesState interface
interface MoviesState {
  popularMovies: Movie[];
  searchResults: Movie[];
  page: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;  // Added error property for better error handling
}

const initialState: MoviesState = {
  popularMovies: [],
  searchResults: [],
  page: 1,
  status: 'idle',
  error: null,
};

// Async thunk to fetch popular movies with pagination
export const fetchPopularMovies = createAsyncThunk<Movie[], number>(
  'movies/fetchPopular',
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=8c01d5c6e334cbb4f4456de6d14536e7&page=${page}`
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error fetching popular movies:', errorData);
        return rejectWithValue(errorData);  // Reject with error details
      }
      const data = await response.json();
      return data.results;
    } catch (error: any) {
      console.error('Network error:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to search for movies based on a query
export const searchMovies = createAsyncThunk<Movie[], string>(
  'movies/searchMovies',
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=8c01d5c6e334cbb4f4456de6d14536e7&query=${query}`
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error searching movies:', errorData);
        return rejectWithValue(errorData);
      }
      const data = await response.json();
      return data.results;
    } catch (error: any) {
      console.error('Network error:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Movie slice
const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    // Increment page for infinite scrolling or pagination
    incrementPage(state) {
      state.page += 1;
    },
    // Clear search results when needed (e.g., reset search)
    clearSearchResults(state) {
      state.searchResults = [];
    },
    // Reset error state (useful when retrying an action)
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handling popular movies fetch
      .addCase(fetchPopularMovies.pending, (state) => {
        state.status = 'loading';
        state.error = null;  // Clear any previous errors
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.popularMovies = [...state.popularMovies, ...action.payload]; // Concatenate movies for infinite scrolling
        state.error = null;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;  // Capture and display error message
      })

      // Handling movie search
      .addCase(searchMovies.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.searchResults = action.payload;  // Update search results
        state.error = null;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;  // Capture and display error message
      });
  },
});

// Export actions and reducer
export const { incrementPage, clearSearchResults, clearError } =
  moviesSlice.actions;
export default moviesSlice.reducer;
