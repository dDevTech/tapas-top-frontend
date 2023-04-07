import { IUser } from 'app/shared/model/user.model';
import { ITapa } from 'app/shared/model/tapa.model';

export interface IUserRating {
  id?: number;
  rating?: number;
  tapa?: ITapa;
  user?: IUser;

  ratings?: IUserRating[];
}

export const defaultValue: Readonly<ITapa> = {};
