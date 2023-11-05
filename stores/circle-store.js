import { atom } from 'recoil';

export const newCircleState = atom({
  key: 'newCircleState',
  default: {
    name: '',
    description: '',
    image: '',
    join: true,
    public: true,
  },
});
