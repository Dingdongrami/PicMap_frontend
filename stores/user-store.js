import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: {
    id: 1,
    nickname: 'ding_dong',
    introduce: '한줄소개',
    profileImage: '',
    public: true,
  },
});
