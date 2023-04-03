import {
    createAsyncThunk,
    createSlice,
    PayloadAction,
    ThunkAction
} from '@reduxjs/toolkit';
import axios from 'axios';
import { Tour, TourPreview } from '../types/Types';
import { AppDispatch, RootState } from './store';
import { API_URL } from '@env';

interface ToursState {
    search: TourPreview[];
    isLoading: boolean;
    error: string | null;
}

const initialState: ToursState = {
    search: [],
    isLoading: false,
    error: null
};

export interface SearchParams {
    dispatch: AppDispatch;
    search: string;
}

export const searchTours = createAsyncThunk(
    'tours/searchTours',
    async ({ dispatch, search }: SearchParams) => {
        dispatch(setIsLoading(true));
        if (search.length > 0) {
            const response = await axios
                .get(API_URL + 'v1/search?search=' + search)
                .then((response) => {
                    dispatch(setSearch(response.data.data));
                })
                .catch((error) => {
                    dispatch(setError(error.message));
                });
            dispatch(setIsLoading(false));
        }
        else {
            console.log(1231323);
            dispatch(reset());
        }
    }
);

// export const fetchTours = (): ThunkAction<
//     Promise<void>,
//     RootState,
//     unknown,
//     PayloadAction<Tour[]>
// > => {
//     return async (dispatch) => {
//         dispatch(setIsLoading(true));
//         try {
//             const response = await axios.get(process.env.API_URL + 'tours');
//             dispatch(setTours(response.data));
//         } catch (error) {
//             dispatch(setError(error.message));
//         } finally {
//             dispatch(setIsLoading(false));
//         }
//     };
// };

const toursSlice = createSlice({
    name: 'tours',
    initialState,
    reducers: {
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setSearch: (state, action: PayloadAction<TourPreview[]>) => {
            state.search = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        reset: (state) => {
            state = initialState;
        }
    }
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(searchTours.pending, (state) => {
    //             state.isLoading = true;
    //             state.error = null;
    //         })
    //         .addCase(searchTours.fulfilled, (state, action) => {
    //             state.isLoading = false;
    //             state.search = action.payload;
    //         })
    //         .addCase(searchTours.rejected, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.error.message ?? 'Error fetching tours';
    //         });
    // }
});

const { setIsLoading, setSearch, setError, reset } = toursSlice.actions;

export default toursSlice.reducer;
