import { userInstance } from './instance';

export const fetchUser = async userId => {
  try {
    const { data } = await userInstance.get(`/${userId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const { id, profileImage, ...rest } = userData;
    const { data } = await userInstance.put(`/${userId}`, rest);
    return data;
  } catch (error) {
    console.log('updateUser 에러: ', error.response);
  }
};

export const updateUserProfileImage = async (userId, userProfileImage) => {
  try {
    const formData = new FormData();
    formData.append('profile', {
      uri: userProfileImage,
      type: 'image/jpeg',
      name: `${Date.now()}.jpg`,
    });
    const { data } = await userInstance.put(`/${userId}/profile`, formData);
    return data;
  } catch (error) {
    console.log('updateUserProfileImage 에러: ', error.response);
  }
};

export const updateUserProfileNoImage = async userId => {
  try {
    const { data } = await userInstance.put(`/${userId}/no-profile`);
    return data;
  } catch (error) {
    console.log('updateUserProfileNoImage 에러: ', error.response);
  }
};
