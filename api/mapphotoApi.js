//stale time, cache time
import { photoInstance } from './instance';

export const fetchAllPhotos = async userId => {
  //사용자가 속한 모든 써클의 사진들을 가져오는 함수
  const { data } = await photoInstance.get(`/get/all-circle/${userId}`);
  return data;
};

// 사용자가 속한 모든 public 써클의 사진들을 가져오는 함수
export const fetchPublicPhotos = async userId => {
  const { data } = await photoInstance.get(`/get/public/${userId}`);
  return data;
};

// PUBLIC, GOVERN 써클 전체 사진 리스트 조회하는 함수
export const allPublicPhotos = async () => {
  const { data } = await photoInstance.get(`/get/all-circle`);
  return data;
};
