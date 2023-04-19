import axios from 'axios';
import { createAsyncThunk, createSlice, isPending } from '@reduxjs/toolkit';
import { serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import { ITapa } from 'app/shared/model/tapa.model';
import { IEstablishment } from 'app/shared/model/establishment.model';

const initialState = {
  loading: false,
  errorMessage: null,
  updating: false,
  updateSuccess: false,
  searchCoincidence: [] as ITapa[],
  myTastings: [] as ITapa[],
};

const apiUrl = 'api/tapa';

export const getSearchCoincidences = createAsyncThunk(
  'tapas_search_coincidences',
  async (search: string) => {
    const requestUrl = `${apiUrl}/name/${search}`;
    return axios.get<ITapa[]>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const TapaSlice = createSlice({
  name: 'tapas',
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getSearchCoincidences.fulfilled, (state, action) => {
        state.searchCoincidence = action.payload.data;
        state.loading = false;
      })
      .addMatcher(isPending(getSearchCoincidences), state => {
        state.errorMessage = null;
        state.loading = true;
      });
  },
});

export const { reset } = TapaSlice.actions;

// Reducer
export default TapaSlice.reducer;
