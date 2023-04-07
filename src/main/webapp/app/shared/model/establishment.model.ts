import { ITapa } from 'app/shared/model/tapa.model';
import { IAddress } from 'app/shared/model/address.model';

export interface IEstablishment {
  id?: number;
  name?: string;
  establishmentType?: string;
  address?: IAddress;

  tapas?: ITapa[];
}

export const defaultValue: Readonly<IEstablishment> = {};
