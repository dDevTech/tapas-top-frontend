import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  age_verification_success: false,
};
export type AgeVerifyState = Readonly<typeof initialState>;

export const AgeVerifySlice = createSlice({
  name: 'age-verify',
  initialState: initialState as AgeVerifyState,
  reducers: {
    verify_age() {
      return {
        ...initialState,
        age_verification_success: true,
      };
    },
    reset() {
      return {
        ...initialState,
      };
    },
  },
  extraReducers: undefined,
});

export const { verify_age, reset } = AgeVerifySlice.actions;
export default AgeVerifySlice.reducer;
