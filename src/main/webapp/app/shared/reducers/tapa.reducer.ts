import axios from 'axios';
import { createAsyncThunk, createSlice, isPending } from '@reduxjs/toolkit';
import { serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import { ITapa } from 'app/shared/model/tapa.model';

const initialState = {
  loading: false,
  errorMessage: null,
  updating: false,
  updateSuccess: false,
  favorites: [] as ITapa[],
  last: [] as ITapa[],
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

export const getLast = createAsyncThunk(
  'tapas_fetch_last',
  async (login: string) => {
    const requestUrl = `api/myuser/lastTapas/${login}`;
    return axios.get<ITapa[]>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);
/*export const getQuestionaryStructuresByCampaignPhase = createAsyncThunk(
  'questionary-structures/fetch_questionary-structures',
  async (campaignPhaseId: number) => {
    const requestUrl = `${apiUrl}/${campaignPhaseId}`;
    return axios.get<any[]>(requestUrl);
  },
  {serializeError: serializeAxiosError}
);

export const getQuestionaryLevelsByCampaignPhase = createAsyncThunk(
  'questionary-structures/fetch_questionary-levels',
  async (campaignPhaseId: number) => {
    const requestUrl = `api/questionary-levels/${campaignPhaseId}`;
    return axios.get<IQuestionaryLevel[]>(requestUrl);
  },
  {serializeError: serializeAxiosError}
);

export const getQuestions = createAsyncThunk(
  'questionary-structures/fetch_questions',
  async () => {
    const requestUrl = `api/questions`;
    return axios.get<any[]>(requestUrl);
  },
  {serializeError: serializeAxiosError}
);

export const saveQuestionaryStructure = createAsyncThunk(
  'questionary-structures/save-all',
  async (entities:any, thunkAPI) => {
    return await axios.post<any[]>('api/questionary-structures', entities);
  },
  {serializeError: serializeAxiosError}
);*/

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
      .addCase(getLast.fulfilled, (state, action) => {
        state.last = action.payload.data;
        state.loading = false;
      })
      .addMatcher(isPending(getFavorites), state => {
        state.errorMessage = null;
        state.loading = true;
      })
      .addMatcher(isPending(getLast), state => {
        state.errorMessage = null;
        state.loading = true;
      });
    /*.addCase(getQuestionaryStructuresByCampaignPhase.fulfilled, (state, action) => {
        state.entities = action.payload.data;
        state.loadedStructures = true;
      })
      .addCase(getQuestionaryLevelsByCampaignPhase.fulfilled, (state, action) => {
        state.levels = action.payload.data;
        state.loadedLevels = true;
      })
      .addCase(getQuestions.fulfilled, (state, action) => {
        state.questions = action.payload.data;
      })
      .addCase(saveQuestionaryStructure.fulfilled, (state, action) => {
        state.loadingSave = false;
      })
      .addMatcher(isPending(getQuestionaryStructuresByCampaignPhase, getQuestionaryLevelsByCampaignPhase), state => {
        state.errorMessage = null;
        state.loadedStructures = false;
        state.loadedLevels = false;
      })
      .addMatcher(isPending(saveQuestionaryStructure), state => {
        state.loadingSave = true;
      })*/
  },
});

export const { reset } = TapaSlice.actions;

// Reducer
export default TapaSlice.reducer;
