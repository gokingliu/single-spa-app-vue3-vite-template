import { ResponseUserAuth } from './store';

export interface SingleSpaProps {
  name: string;
  mountParcel: Function;
  parcelProps: ParcelProps;
}

export interface ParcelProps {
  userAuth: ResponseUserAuth | null | undefined;
}
