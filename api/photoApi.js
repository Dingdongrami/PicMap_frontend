import { photoInstance } from './instance';

export const fetchPhotos = async circleId => {
  //써클의 사진들을 가져오는 함수
  const { data } = await photoInstance.get(`get/circle/${circleId}`);
  return data;
};

export const fetchOnePhoto = async photoId => {
  const { data } = await photoInstance.get(`?photoId=${photoId}`);
  return data;
};
