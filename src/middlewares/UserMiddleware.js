import jwt from 'jsonwebtoken';

const UserMiddleware = (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ error: 'Missing authorization header' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return response.status(401).json({ error: 'Invalid access token' });
    }

    request.userid = decoded.id;

    if (decoded.role != 'ADMIN') {
      return response.sendStatus(403);
    }

    next();
  });
};

export default UserMiddleware;
