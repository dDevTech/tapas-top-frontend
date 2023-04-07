import { IEstablishment } from 'app/shared/model/establishment.model';
import { IUser } from 'app/shared/model/user.model';

export interface IAddress {
  id?: number;
  country?: string;
  city?: string;
  address?: string;
  establishment?: IEstablishment;

  user?: IUser[];
}

export const defaultValue: Readonly<IAddress> = {};
