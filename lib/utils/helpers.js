import axios from 'axios';

/**
 * pxToRem
 * @param value: Int
 */
export const pxToRem = (value) => `${value / 16}rem`;

export const getCurrentYear = () => new Date().getFullYear();

/**
 *
 * @param {String} model Model to fetch
 * @param {Enumerator} method oneOf 'POST', 'GET','PATCH', 'PUT', 'DELETE'
 * @param {Object} headers headers object
 * @param {Object} body body object
 */
const BASE_URL = 'http://learnmanabu.com';
export async function fetchAPI({ model, method, headers, body }) {
  const res = await fetch(`${BASE_URL}/${model}`, {
    method,
    headers: {
      'Content-Type': 'multipart/formdata',
      ...headers,
      body,
    },
  });

  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }

  return json;
}

export async function fetchWithAxios({ model, method, headers, body }) {
  const res = await axios({
    method,
    url: `${BASE_URL}/${model}`,
    data: body,
    headers,
  });

  return res;
}
