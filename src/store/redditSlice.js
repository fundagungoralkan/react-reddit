import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { getSubredditPosts, getPostComments, searchPosts } from '../api/reddit';

const initialState = {
    allPosts: [],
    hasError: false,
    isLoading: false,
    selectedSubreddit: '/r/pics',
    searchTerm: '',
}

export const startGetAllPosts = createAsyncThunk(
    'reddit/startGetAllPosts',
    async (select, thunkAPI) => {
        const response = await getSubredditPosts(select);
        return response;
    }
);

export const startGetPostComments = createAsyncThunk(
    'reddit/startGetPostComments',
    async ({ index, permalink }, thunkAPI) => {
        const comments = await getPostComments(permalink);
        return { comments, index };
    }
);

export const startSearchPosts = createAsyncThunk(
    'reddit/startSearchPosts',
    async (searchTerm, thunkAPI) => {
        const response = await searchPosts(searchTerm);
        return response;
    }
);

export const redditSlice = createSlice({
    name:"redditPosts",
    initialState,
    reducers: {
        changeSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        toggleShowingComments: (state, action) => {
            state.allPosts[action.payload].showingComments=false;
        },
        changeSubreddit: (state, action) => {
            state.selectedSubreddit = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(startGetAllPosts.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(startGetAllPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                state.allPosts = action.payload;
                state.allPosts.forEach(element => {
                    element.comments = [];
                    element.showingComments = false;
                    element.isLoadingComment = false;
                    element.hasErrorComment = false;
                });
            })
            .addCase(startGetAllPosts.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            })
            .addCase(startGetPostComments.pending, (state, action) => {
                const { index } = action.meta.arg;
                state.allPosts[index].isLoadingComment = true;
                state.allPosts[index].hasErrorComment = false;
            })
            .addCase(startGetPostComments.fulfilled, (state, action) => {
                const { comments, index } = action.payload;
                state.allPosts[index].isLoadingComment = false;
                state.allPosts[index].hasErrorComment = false;
                state.allPosts[index].comments = comments;
                state.allPosts[index].showingComments = true; 
            })
            .addCase(startGetPostComments.rejected, (state, action) => {
                const { index } = action.meta.arg;
                state.allPosts[index].isLoadingComment = false;
                state.allPosts[index].hasErrorComment = true;
            })
            .addCase(startSearchPosts.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(startSearchPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                state.allPosts = action.payload;
            })
            .addCase(startSearchPosts.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            });
    }
});

export const { changeSearchTerm, toggleShowingComments, changeSubreddit } = redditSlice.actions;

export const selectSelectedSubreddit = (state) => state.reddit.selectedSubreddit;

const selectSearchTerm = (state) => state.reddit.searchTerm;
const selectAllPosts = (state) => state.reddit.allPosts;
export const selectAllPostFilter = createSelector(
    [selectAllPosts, selectSearchTerm], (allPost, searchTerm) => {
        if (searchTerm !== '') {
            return allPost.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        return allPost;
    }
);

export const selectIsLoading = (state) => state.reddit.isLoading;
export default redditSlice.reducer;