import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { serializeAxiosError } from 'app/shared/reducers/reducer.utils';

export const createRestaurant = createAsyncThunk(
  'register/create_account',
  async (data: {
    login: string;
    email: string;
    password: string;
    langKey?: string;
    gender?: string;
    firstName?: string;
    lastName?: string;
    lastName2?: string;
    description?: string;
    imageUrl?: string;
    address: { address?: string; city?: string; country?: string };
  }) => axios.post<any>('api/register', data),
  { serializeError: serializeAxiosError }
);
