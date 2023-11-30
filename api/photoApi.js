import { convertToIsoFormat, getCurrentTimestamp } from '../utils/formatDate';
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

// uploadPhoto 함수 정의
export const uploadPhotos = async (photos, circleId) => {
  try {
    const formData = new FormData();

    // JSON 데이터 준비
    const jsonData = JSON.stringify({
      userId: 17, // 혹은 다른 방법으로 userId를 설정
      circleId,
      latitude: photos.exif.GPSLatitude,
      longitude: photos.exif.GPSLongitude,
      shootingDate: convertToIsoFormat(photos.exif.DateTimeOriginal),
    });

    photos.forEach(uri => {
      formData.append('image', {
        uri: uri,
        type: 'image/jpeg', // MIME 타입은 파일에 맞게 설정
        name: `${Date.now()}.jpg`, // 파일 이름
      });
    });

    // JSON 데이터 추가
    formData.append('jsonData', jsonData);

    const { data } = await photoInstance.post('/upload', formData);
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
      console.error('요청:', error.request);
    } else {
      // 요청을 설정하는 중에 오류가 발생한 경우
      console.error('Error', error.message);
    }
  }
};

export const uploadShootingPhoto = async (photoUri, circleId, location) => {
  try {
    const formData = new FormData();

    // JSON 데이터 준비
    const jsonData = JSON.stringify({
      userId: 17, // 혹은 다른 방법으로 userId를 설정
      circleId,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      shootingDate: getCurrentTimestamp(),
    });

    formData.append('image', {
      uri: photoUri,
      type: 'image/jpeg', // MIME 타입은 파일에 맞게 설정
      name: `${Date.now()}.jpg`, // 파일 이름
    });

    // JSON 데이터 추가
    formData.append('jsonData', jsonData);

    const response = await photoInstance.post('/upload-camera', formData);
    const { data } = response;

    console.log(response);

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
      console.error('요청:', error.request);
    } else {
      // 요청을 설정하는 중에 오류가 발생한 경우
      console.error('Error', error.message);
    }
  }
};
