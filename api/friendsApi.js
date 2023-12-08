import { friendsInstance } from './instance';

// 친구 목록
export const fetchFriends = async userId => {
  const response = await friendsInstance.get(`/list/${userId}`);
  return response.data;
};

// 받은 친구 요청
export const fetchReceivedRequests = async userId => {
  const response = await friendsInstance.get(`/request/${userId}`);
  return response.data;
};

// 친구 수락
export const acceptFriend = async (requesterId, receiverId) => {
  try {
    const response = await friendsInstance.put('/accept', {
      requesterId,
      receiverId,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 친구 요청
export const requestFriend = async (requesterId, receiverId) => {
  try {
    const response = await friendsInstance.post('/request', {
      requesterId,
      receiverId,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};