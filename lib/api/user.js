import { fetchWithAxios } from 'utils/helpers';

export async function loginUser({ identifier, password }) {
  try {
    const data = await fetchWithAxios({
      model: 'auth/local',
      method: 'POST',
      body: { identifier, password },
    });

    return data;
  } catch (error) {
    return {};
  }
}

export async function createUser({ username, email, password }) {
  try {
    const data = await fetchWithAxios({
      model: 'auth/local/register',
      method: 'POST',
      body: { username, email, password },
    });

    return data;
  } catch (error) {
    console.log('An error ocurred:', error);
    return {};
  }
}
