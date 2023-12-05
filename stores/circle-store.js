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

export const selectedPhotosState = atom({
  key: 'selectedPhotosState',
  default: [],
});

export const isPhotoUploadingState = atom({
  key: 'isPhotoUploadingState',
  default: false,
});
