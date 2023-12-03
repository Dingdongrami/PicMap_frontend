import { convertToIsoFormat, getCurrentTimestamp } from '../utils/formatDate';
import { photoInstance } from './instance';

export const fetchAllPhotos = async userId => {
  //사용자가 속한 모든 써클의 사진들을 가져오는 함수
  const { data } = await photoInstance.get(`get/all-circle/${userId}`);
  return data;
}

export const fetchPhotos = async circleId => {
  //써클의 사진들을 가져오는 함수
  const { data } = await photoInstance.get(`get/circle/${circleId}`);
  return data;
};

export const fetchLatestFourPhotos = async circleId => {
  //써클의 사진들을 가져오는 함수
  const { data } = await photoInstance.get(`latest-four?circleId=${circleId}`);
  return data;
};

export const fetchOnePhoto = async photoId => {
  const { data } = await photoInstance.get(`?photoId=${photoId}`);
  return data;
};

// uploadPhoto 함수 정의
export const uploadPhotos = async (photos, circleId) => {
  try {
    const formData = new FormData();

    console.log(photos[0].uri);

    photos.forEach(photo => {
      formData.append('images', {
        uri: photo.uri,
        type: 'image/jpeg', // MIME 타입은 파일에 맞게 설정
        name: `${Date.now()}.jpg`, // 파일 이름
      });
    });

    // JSON 데이터 준비
    const jsonData = JSON.stringify({
      userId: 17, // 혹은 다른 방법으로 userId를 설정
      circleId: circleId,
    });

    // JSON 데이터 추가
    formData.append('jsonData', jsonData);

    let photoInfoList = JSON.stringify(
      photos.map(photo => ({
        latitude: photo.exif.GPSLatitude || null,
        longitude: photo.exif.GPSLongitude || null,
        shootingDate: photo.exif.DateTimeOriginal ? convertToIsoFormat(photo.exif.DateTimeOriginal) : null,
      })),
    );

    formData.append('photoInfoList', photoInfoList);

    const { data } = await photoInstance.post('/upload', formData);

    console.log(data);
    // 서버에 요청 보내기
    return data;
  } catch (error) {
    if (error.response) {
      // 서버 응답에 대한 정보가 있는 경우
      console.error('응답 데이터:', error.response.data);
      console.error('응답 상태:', error.response.status);
      console.error('응답 헤더:', error.response.headers);
      console.error('요청 데이터:', error.response.config.data);
    } else if (error.request) {
      // 요청이 이루어졌으나 응답을 받지 못한 경우
      console.error('요청:', error);
    } else {
      // 요청을 설정하는 중에 오류가 발생한 경우
      console.error('Error', error.message);
    }
  }
};

export const uploadShootingPhoto = async (photo, circleId, location) => {
  try {
    const formData = new FormData();
    console.log('받아온 uri', photo);
    formData.append('images', {
      uri: photo,
      type: 'image/jpeg',
      name: `${Date.now()}.jpg`,
    });

    // JSON 데이터 준비 및 추가
    const jsonData = JSON.stringify({
      userId: 17, // 혹은 다른 방법으로 userId를 설정
      circleId: circleId,
    });
    formData.append('jsonData', jsonData);

    const photoInfoList = JSON.stringify([
      {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        shootingDate: getCurrentTimestamp(),
      },
    ]);
    formData.append('photoInfoList', photoInfoList);

    // 서버에 요청 보내기
    const response = await photoInstance.post('/upload', formData);
    const { data } = response;

    return data;
  } catch (error) {
    console.log('보내졌지만 에러가 났어요');
    console.error('응답 데이터:', error.response.data);
    console.error('응답 상태:', error.response.status);
    console.error('응답 헤더:', error.response.headers);
    console.error('요청 데이터:', error.response.config.data);
  }
};

export const deletePhoto = async photoIdList => {
  try {
    const { data } = await photoInstance.delete('/delete', {
      data: [...photoIdList],
    });
    return data;
  } catch (error) {
    console.error(error.response.data);
    console.error(error.response.status);
    console.error(error.response.headers);
    console.error(error.response.config.data);
  }
};
