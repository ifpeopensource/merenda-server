import jwt from 'jsonwebtoken';

const UserMiddleware = (_request, response, next) => {
  const authHeader = _request.headers.authorization;

  if (!authHeader) {
    response.status(401).json({ error: 'Missing authorization header' });
    return;
  }

  // Get token from authorization header
  const token = authHeader.split(' ')[1];

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      response.status(401).json({ error: 'Invalid access token' });
      return;
    }

    _request.userid = decoded.id;

    if (decoded.role != 'ADMIN') {
      response.sendStatus(403);
      return;
    }

    next();
  });
};

export default UserMiddleware;
