import { cookies } from 'utils/helpers';

const handler = (req, res) => {
  res.cookie('auth_token', req.query.at);
  res.end();
};

export default cookies(handler);
