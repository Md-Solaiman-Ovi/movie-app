import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the Movie interface
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

// Define the initial state interface
interface WatchlistState {
  watchlist: Movie[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: WatchlistState = {
  watchlist: [],
  status: "idle",
};

// Async thunk to fetch watchlist (mocked example)
export const fetchWatchlist = createAsyncThunk<Movie[]>(
  "watchlist/fetchWatchlist",
  async () => {
    // Simulate an API call or fetch from localStorage
    const response = await fetch("/api/watchlist"); // Replace with actual API endpoint or mock
    if (!response.ok) throw new Error("Failed to fetch watchlist");
    return await response.json();
  }
);

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    addToWatchlist(state, action) {
      // Check if the movie is already in the watchlist
      const isAlreadyInWatchlist = state.watchlist.some(
        (movie) => movie.id === action.payload.id
      );
      if (!isAlreadyInWatchlist) {
        state.watchlist.push(action.payload); // Add to watchlist
      }
    },
    removeFromWatchlist(state, action) {
      state.watchlist = state.watchlist.filter(
        (movie) => movie.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWatchlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWatchlist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.watchlist = action.payload; // Update the state with fetched watchlist
      })
      .addCase(fetchWatchlist.rejected, (state) => {
        state.status = "failed";
      });
  },
});

// Export the async action and reducer
export const { addToWatchlist, removeFromWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
