import { commentInstance } from './instance';

export const fetchComments = async photoId => {
  try {
    const { data } = await commentInstance.get('/list', {
      params: {
        photoId: photoId,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addComment = async (photoId, comment) => {
  try {
    const { data } = await commentInstance.post('/add', {
      userId: 17,
      photoId: photoId,
      comment: comment,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = async commentId => {
  try {
    const { data } = await commentInstance.delete('/', {
      params: {
        commentId: commentId,
      },
    });
    return data;
  } catch (error) {
    console.error(error.response);
  }
};
