import { fetchWithAxios } from 'utils/helpers';

export async function getUserClase({ lecture_number, user_id }) {
  return await fetchWithAxios({
    model: `user-clases?clase.lecture_number=${lecture_number}&user.id=${user_id}`,
    method: 'GET',
  });
}

export async function setLectureCompleted({
  lecture_number,
  user_id,
  approved,
  auth_token,
}) {
  try {
    const userLecture = await fetchWithAxios({
      model: `user-clases?clase.lecture_number=${lecture_number}&user.id=${user_id}`,
      method: 'GET',
    });

    const { id } = userLecture[0];

    const userLectureUpdated = await fetchWithAxios({
      model: `user-clases/${id}`,
      method: 'PUT',
      body: {
        approved,
        completed: true,
      },
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    });

    return userLectureUpdated;
  } catch (error) {
    console.log('An error ocurred:', error);
    return {};
  }
}
