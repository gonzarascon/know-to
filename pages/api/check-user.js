import fetch from 'isomorphic-unfetch';

import { data } from 'constants';

const { BASE_URL } = data;

export default async (req, res) => {
  if (req.query.at) {
    return await fetch(`${BASE_URL}/users/me`, {
      headers: new Headers({
        Authorization: `Bearer ${req.query.at}`,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.id) {
          res.json(data);
        }
      })
      .catch((error) => {
        console.log('error', error);
        return 'ERROR';
      });
  }
};
