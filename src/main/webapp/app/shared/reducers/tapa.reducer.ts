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
  favorites: [] as ITapa[],
  last: [] as ITapa[],
  searchCoincidence: [] as ITapa[],
  lastRestaurants: [] as IEstablishment[],
};

const apiUrl = 'api/tapas';

export const getFavorites = createAsyncThunk(
  'tapas_fetch_favorites',
  async (login: string) => {
    const requestUrl = `api/myuser/favourites/${login}`;
    return axios.get<ITapa[]>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const getSearchCoincidences = createAsyncThunk(
  'tapas_search_coincidences',
  async (search: string) => {
    const requestUrl = `api/tapa/name/${search}`;
    return axios.get<ITapa[]>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const getLast = createAsyncThunk(
  'tapas_fetch_last',
  async (login: string) => {
    const requestUrl = `api/myuser/lastTapas/${login}`;
    return axios.get<ITapa[]>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const getLastEstablisment = createAsyncThunk(
  'tapas_fetch_last_establisment',
  async (login: string) => {
    const requestUrl = `api/myuser/lastRestaurants/${login}`;
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
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload.data;
        state.loading = false;
      })
      .addCase(getSearchCoincidences.fulfilled, (state, action) => {
        state.searchCoincidence = action.payload.data;
        state.loading = false;
      })
      .addCase(getLastEstablisment.fulfilled, (state, action) => {
        state.lastRestaurants = action.payload.data;
        state.loading = false;
      })
      .addCase(getLast.fulfilled, (state, action) => {
        state.last = action.payload.data;
        state.loading = false;
      })
      .addMatcher(isPending(getLast, getSearchCoincidences, getFavorites, getLastEstablisment), state => {
        state.errorMessage = null;
        state.loading = true;
      });
  },
});

export const { reset } = TapaSlice.actions;

// Reducer
export default TapaSlice.reducer;
