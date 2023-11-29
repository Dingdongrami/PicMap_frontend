import { atom } from 'recoil';

export const newCircleState = atom({
  key: 'newCircleState',
  default: {
    name: '',
    description: '',
    thumbnail: '',
    public: true,
  },
});
