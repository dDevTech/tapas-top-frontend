import axios from 'axios';
import { createAsyncThunk, createSlice, isPending } from '@reduxjs/toolkit';
import { serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import { IUserRating } from 'app/shared/model/user-rating.model';
import { AppThunk } from 'app/config/store';
import { getSession } from 'app/shared/reducers/authentication';
import { updateAccount } from 'app/modules/account/settings/settings.reducer';

const initialState = {
  loading: false,
  errorMessage: null,
  updating: false,
  updateSuccess: false,
};

const apiUrl = 'api/rating';
export const saveRating = createAsyncThunk(
  'rating_save',
  async (data: { userId: number; tapaId?: number; rating?: number }) => axios.post<any>(apiUrl, data),
  { serializeError: serializeAxiosError }
);

export const RatingUserSlice = createSlice({
  name: 'ratingUser',
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(saveRating.fulfilled, (state, action) => {
        state.loading = false;
        state.updating = false;
      })
      .addMatcher(isPending(saveRating), state => {
        state.errorMessage = null;
        state.loading = true;
        state.updating = true;
      });
  },
});

export const { reset } = RatingUserSlice.actions;

// Reducer
export default RatingUserSlice.reducer;
