import { UserAuthItem } from './store';

export interface SingleSpaProps {
  name: string;
  mountParcel: Function;
  parcelProps: parcelProps;
}

export interface ParcelProps {
  userAuth: UserAuthItem | null | undefined;
}
