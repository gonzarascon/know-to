import { cookies } from 'utils/helpers';

const handler = (req, res) => {
  res.cookie('auth_token', null, {
    path: '/',
    expires: new Date('Thu, 01 Jan 1970 00:00:00 GMT'),
  });
  res.end();
};

export default cookies(handler);
