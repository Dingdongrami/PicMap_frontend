import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: {
    id: 1,
    username: 'ding_dong',
    introduction: '한줄소개',
    profileImage: '',
    public: true,
  },
});
