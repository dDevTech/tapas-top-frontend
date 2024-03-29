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
  lastRestaurants: [] as IEstablishment[],
  myTastings: [] as ITapa[],
};

const apiUrl = 'api/myuser';

export const getFavorites = createAsyncThunk(
  'tapas_fetch_favorites',
  async (login: string) => {
    const requestUrl = `${apiUrl}/favourites/${login}`;
    return axios.get<ITapa[]>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const setFavorites = createAsyncThunk(
  'tapas_set_favorites',
  async (tapaId: string) => {
    const requestUrl = `${apiUrl}/favourites/${tapaId}`;
    return axios.post<ITapa[]>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const deleteFavorites = createAsyncThunk(
  'tapas_delete_favorites',
  async (tapaId: string) => {
    const requestUrl = `${apiUrl}/favourites/${tapaId}`;
    return axios.delete<ITapa[]>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const getLast = createAsyncThunk(
  'tapas_fetch_last',
  async (login: string) => {
    const requestUrl = `${apiUrl}/lastTapas/${login}`;
    return axios.get<ITapa[]>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);
export const getMyTastings = createAsyncThunk(
  'tapas_fetch_my',
  async (login: string) => {
    const requestUrl = `${apiUrl}/allTapas/${login}`;
    return axios.get<ITapa[]>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const getLastEstablisment = createAsyncThunk(
  'tapas_fetch_last_establisment',
  async (login: string) => {
    const requestUrl = `${apiUrl}/lastRestaurants/${login}`;
    return axios.get<ITapa[]>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const UserInfoSlice = createSlice({
  name: 'userInfo',
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
      .addCase(getLastEstablisment.fulfilled, (state, action) => {
        state.lastRestaurants = action.payload.data;
        state.loading = false;
      })
      .addCase(getLast.fulfilled, (state, action) => {
        state.last = action.payload.data;
        state.loading = false;
      })
      .addCase(getMyTastings.fulfilled, (state, action) => {
        state.myTastings = action.payload.data;
        state.loading = false;
      })
      .addMatcher(isPending(getLast, getFavorites, getLastEstablisment, getMyTastings), state => {
        state.errorMessage = null;
        state.loading = true;
      });
  },
});

export const { reset } = UserInfoSlice.actions;

// Reducer
export default UserInfoSlice.reducer;
