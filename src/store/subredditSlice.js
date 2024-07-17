import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSubreddits } from "../api/reddit";

const initialState = {
    subtopics: [],
    isLoading: false,
    hasError: false,
};

export const getSubtopics = createAsyncThunk(
    'subreddit/getSubtopics',
    async () => {
        const subtopics = await getSubreddits();
        return subtopics;
    }
);

export const subredditSlice = createSlice({
    name: "subreddit",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSubtopics.pending, (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        })
        .addCase(getSubtopics.rejected, (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        })
        .addCase(getSubtopics.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.subtopics = action.payload;
        });
    }
});

export default subredditSlice.reducer;