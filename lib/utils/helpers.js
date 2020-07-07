import { useEffect } from 'react';
import { serialize } from 'cookie';
import useSWR from 'swr';
import axios from 'axios';
import { data } from 'constants';
const { BASE_URL } = data;

/**
 * pxToRem
 * @param value: Int
 */
export const pxToRem = (value) => `${value / 16}rem`;

export const getCurrentYear = () => new Date().getFullYear();

/**
 *
 * @param {Enumerator} type: Oneof 'email', 'comment', 'empty', 'username'
 * @param {String} value: Value to validate
 */

export const Validate = (type, value) => {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const minimumCharsRegex = /^[\w\s\d]{6,}$/;
  const rangeCharsRegex = /^[\w\s\d]{6,10}$/;
  const emptyRegex = /^(?!\s*$).+/;

  switch (type) {
    case 'email':
      return emailRegex.test(value);
    case 'comment':
      return minimumCharsRegex.test(value);
    case 'empty':
      return emptyRegex.test(value);
    case 'username':
      return rangeCharsRegex.test(value);
    default:
      return null;
  }
};

/**
 *
 * @param {String} model Model to fetch
 * @param {Enumerator} method oneOf 'POST', 'GET','PATCH', 'PUT', 'DELETE'
 * @param {Object} headers headers object
 * @param {Object} body body object
 */

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
  return await axios({
    method,
    url: `${BASE_URL}/${model}`,
    data: body,
    headers,
  }).then((response) => response.data);
}

export function useRequest(request, { initialData, ...config } = {}) {
  return useSWR(
    request && JSON.stringify(request),
    () => axios(request || {}).then((response) => response.data),
    {
      ...config,
      initialData: initialData && {
        status: 200,
        statusText: 'InitialData',
        headers: {},
        data: initialData,
      },
    }
  );
}

/**
 *
 * @param {React.RefObject} ref: Ref from component that will trigger the event
 * @param {Function} cb: Function to be excecuted
 */

export function useOutsideAlerter(ref, cb) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        cb();
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}

/**
 * This sets `cookie` on `res` object
 */
const cookie = (res, name, value, options = {}) => {
  const stringValue =
    typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value);

  if ('maxAge' in options) {
    options.expires = new Date(Date.now() + options.maxAge);
    options.maxAge /= 1000;
  }

  res.setHeader('Set-Cookie', serialize(name, String(stringValue), options));
};

/**
 * Adds `cookie` function on `res.cookie` to set cookies for response
 */
export const cookies = (handler) => (req, res) => {
  res.cookie = (name, value, options) => cookie(res, name, value, options);

  return handler(req, res);
};
