import axios from 'axios';
import { createAsyncThunk, createSlice, isPending } from '@reduxjs/toolkit';
import { serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import { IEstablishment } from 'app/shared/model/establishment.model';

const initialState = {
  loading: false,
  errorMessage: null,
  updating: false,
  updateSuccess: false,
  restaurants: [] as IEstablishment[],
};

const requestUrl = `api/establishment`;

export const getRestaurants = createAsyncThunk(
  'restaurantes',
  async () => {
    return axios.get<IEstablishment[]>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const EstablishmentSlice = createSlice({
  name: 'establishment',
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getRestaurants.fulfilled, (state, action) => {
        state.restaurants = action.payload.data;
        state.loading = false;
      })
      .addMatcher(isPending(getRestaurants), state => {
        state.errorMessage = null;
        state.loading = true;
      });
  },
});

export const { reset } = EstablishmentSlice.actions;

// Reducer
export default EstablishmentSlice.reducer;
