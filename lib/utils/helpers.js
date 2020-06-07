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
export async function fetchAPI(model, method) {
  const BASE_URL = process.env.dev ? 'http://localhost:1337' : '';
  const res = await fetch(`http://localhost:1337/${model}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }

  return json;
}
