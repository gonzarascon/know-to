import axios from 'axios';
import { fetchWithAxios } from 'utils/helpers';
import { parseCookies } from 'nookies';

export async function loginUser({ identifier, password }) {
  try {
    const data = await fetchWithAxios({
      model: 'auth/local',
      method: 'POST',
      body: { identifier, password },
    });

    await axios.get(`/api/auth/set_auth?at=${data.jwt}`);

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

export async function updateAvatar({ photo, user_id }) {
  const { auth_token } = parseCookies();

  let fD = new FormData();

  fD.append('files', photo);
  fD.append('refId', user_id);
  fD.append('ref', 'user');
  fD.append('source', 'users-permissions');
  fD.append('field', 'foto_de_perfil');

  return await fetchWithAxios({
    model: `upload`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${auth_token}`,
    },
    body: fD,
  })
    .then((response) => response)
    .catch((error) => {
      console.error(error);
      return error;
    });
}

export async function updateUserData({ userData }) {
  const { auth_token } = parseCookies();

  return await fetchWithAxios({
    model: `users/${userData.id}`,
    method: 'put',
    headers: {
      Authorization: `Bearer ${auth_token}`,
    },
    body: userData,
  })
    .then((response) => response)
    .then((error) => {
      console.log(error);
      return error;
    });
}
