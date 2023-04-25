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
  createdRestaurantSuccess: false,
  favorites: [] as ITapa[],
  last: [] as ITapa[],
  searchCoincidence: [] as ITapa[],
  lastRestaurants: [] as IEstablishment[],
  restaurants: [] as IEstablishment[],
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

/*export const setFavorite = createAsyncThunk(
  'tapas_fetch_favorites',
  async (tapaId: string) => {
    const requestUrl = `api/myuser/favourites/${tapaId}`;
    return axios.post<any>(requestUrl);
  }
);*/
export const setFavorite = createAsyncThunk(
  'tapas_set_favorites',
  async (tapaId: string) => axios.post(`api/myuser/favourites/${tapaId}`)
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
export const getRestaurants = createAsyncThunk(
  'restaurantes',
  async () => {
    const requestUrl = `api/establishment`;
    return axios.get<IEstablishment[]>(requestUrl);
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
export const createRestaurant = createAsyncThunk(
  'establishment/create_restaurant',
  async (data: { name: string; type: string; address: { address: string; city?: string; country: string } }) =>
    axios.post<any>('api/establishment', data),
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
      .addCase(getRestaurants.fulfilled, (state, action) => {
        state.restaurants = action.payload.data;
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
      .addCase(createRestaurant.fulfilled, (state, action) => {
        state.last = action.payload.data;
        state.createdRestaurantSuccess = true;
      })
      .addMatcher(isPending(createRestaurant), state => {
        state.errorMessage = null;
        state.createdRestaurantSuccess = false;
      })
      .addMatcher(isPending(getRestaurants, getLast, getSearchCoincidences, getFavorites, getLastEstablisment), state => {
        state.errorMessage = null;
        state.loading = true;
      });
  },
});

export const { reset } = TapaSlice.actions;

// Reducer
export default TapaSlice.reducer;
