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
    tours: TourPreview[];
    isLoading: boolean;
    error: string | null;
}

const initialState: ToursState = {
    tours: [],
    isLoading: false,
    error: null
};

export const fetchTours = createAsyncThunk(
    'tours/getTours',
    async (dispatch: AppDispatch) => {
        dispatch(setIsLoading(true));
        const response = await axios
            .get(API_URL + 'v1/tours')
            .then((response) => {
                dispatch(setTours(response.data.data));
            })
            .catch((error) => {
                dispatch(setError(error.message));
            });
        dispatch(setIsLoading(false));
    }

    // async (data) => {
    //     dispatch(setIsLoading(true));
    //     try {

    //         dispatch(setTours(response.data));
    //     } catch (error: any) {
    //         dispatch(setError(error.message));
    //     } finally {
    //         dispatch(setIsLoading(false));
    //     }
    // }
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
        setTours: (state, action: PayloadAction<TourPreview[]>) => {
            state.tours = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        }
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchTours.pending, (state) => {
    //             state.isLoading = true;
    //             state.error = null;
    //         })
    //         .addCase(fetchTours.fulfilled, (state, action) => {
    //             state.isLoading = false;
    //             state.tours = action.payload;
    //         })
    //         .addCase(fetchTours.rejected, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.error.message ?? 'Error fetching tours';
    //         });
    // }
});

const { setIsLoading, setTours, setError } = toursSlice.actions;

export default toursSlice.reducer;
