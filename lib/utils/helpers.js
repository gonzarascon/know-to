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
 */
export async function fetchAPI(model, method, headers) {
  const BASE_URL = 'http://learnmanabu.com';
  const res = await fetch(`${BASE_URL}/${model}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });

  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }

  return json;
}
