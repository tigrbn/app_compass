import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import searchSlice from './searchSlice';
import toursSlice  from './toursSlice';

const store = configureStore({
    reducer: {
        toursReducer: toursSlice,
        searchReducer: searchSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store;