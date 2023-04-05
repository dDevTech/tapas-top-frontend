import { IEstablishment } from 'app/shared/model/establishment.model';
import { IUserRating } from 'app/shared/model/user-rating.model';

export interface ITapa {
  id?: number;
  name?: string;
  description?: string;
  type?: string;
  country?: string;

  photo?: string;

  establishment?: IEstablishment;

  ratings?: IUserRating[];

  rating?: IUserRating;

  createdDate?: Date;

  lastModifiedBy?: string;

  average?: number;
}

export const defaultValue: Readonly<ITapa> = {};
