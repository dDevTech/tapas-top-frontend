import { IEstablishment } from 'app/shared/model/establishment.model';
import { IUserRating } from 'app/shared/model/userRating.model';

export interface ITapa {
  id?: number;
  name?: string;
  description?: string;
  type?: string;
  country?: string;

  photo?: HTMLImageElement[];

  establishment?: IEstablishment;

  ratings?: IUserRating[];
}

export const defaultValue: Readonly<ITapa> = {};
