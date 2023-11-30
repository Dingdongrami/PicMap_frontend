import { userInstance } from './instance';

export const fetchUser = async userId => {
  const { data } = await userInstance.get(`/${userId}`);
  return data;
};
