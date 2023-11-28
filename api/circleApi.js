import { circleInstance } from './instance';

export const fetchCircle = async () => {
  const { data } = await circleInstance.get(`/list/17`); // 15는 임시로 넣은 userId
  return data;
};

export const fetchPublicCircle = async () => {
  const { data } = await circleInstance.get('/public');
  return data;
};

export const createCircle = async newCircleData => {
  try {
    const { data } = await circleInstance.post('/add-circle', {
      thumbnail: newCircleData.thumbnail,
      userId: 17,
      name: newCircleData.name,
      description: newCircleData.description,
      status: newCircleData.public ? 'PUBLIC' : 'PRIVATE',
    });
    console.log(data);
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
