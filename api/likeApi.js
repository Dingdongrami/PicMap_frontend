import { likeInstance } from './instance';

export const updateLike = async photoId => {
  const { data } = await likeInstance.post('/', {
    userId: 17,
    photoId: photoId,
  });
  return data;
};

export const deleteLike = async photoId => {
  const { data } = await likeInstance.delete('/', {
    data: {
      userId: 17,
      photoId: photoId,
    },
  });
  return data;
};
