import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// 인증 토큰을 가져오는 함수 (여기서는 예시로 localStorage를 사용)
const getAuthToken = async() => await SecureStore.getItemAsync('token');

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  timeout: 1000,
});

// 요청 인터셉터를 추가하여 요청이 전송되기 전에 실행됩니다.
instance.interceptors.request.use(
  config => {
    // 토큰을 가져옵니다.
    const token = getAuthToken();

    // 토큰이 있으면 Authorization 헤더를 설정합니다.
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    // 요청 오류가 있는 경우 여기서 처리합니다.
    return Promise.reject(error);
  },
);

export default instance;
