import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface MoviesState {
  popularMovies: Movie[];
  searchResults: Movie[];
  page: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: MoviesState = {
  popularMovies: [],
  searchResults: [],
  page: 1,
  status: 'idle',
};

// Async thunk to fetch popular movies
export const fetchPopularMovies = createAsyncThunk<Movie[], number>(
  'movies/fetchPopular',
  async (page: number) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=8c01d5c6e334cbb4f4456de6d14536e7&page=${page}`);
    if (!response.ok) {
      const errorData = await response.json(); // Log the error details
      console.error('Error fetching popular movies:', errorData);
      throw new Error('Failed to fetch movies');
    }
    return (await response.json()).results;
  }
);

// Async thunk to search movies
export const searchMovies = createAsyncThunk<Movie[], string>(
  'movies/searchMovies',
  async (query: string) => {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=8c01d5c6e334cbb4f4456de6d14536e7&query=${query}`);
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error searching movies:', errorData);
      throw new Error('Failed to search movies');
    }
    return (await response.json()).results;
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    incrementPage(state) {
      state.page += 1;
    },
    clearSearchResults(state) {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.popularMovies = [...state.popularMovies, ...action.payload];
      })
      .addCase(fetchPopularMovies.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(searchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.searchResults = action.payload;
      })
      .addCase(searchMovies.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { incrementPage, clearSearchResults } = moviesSlice.actions;
export default moviesSlice.reducer;
