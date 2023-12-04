//stale time, cache time
import { photoInstance } from './instance';

export const fetchAllPhotos = async userId => {
  //사용자가 속한 모든 써클의 사진들을 가져오는 함수
  const { data } = await photoInstance.get(`get/all-circle/${userId}`);
  return data;
}
