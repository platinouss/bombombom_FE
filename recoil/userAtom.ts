import { atom } from 'recoil';
import { User } from '@/types/user/user';

export const userState = atom<User | null>({
  key: 'userState',
  default: null
});
