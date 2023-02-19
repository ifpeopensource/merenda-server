import jwt from 'jsonwebtoken';

const StudentMiddleware = (_request, response, next) => {
  const authHeader = _request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ error: 'Missing authorization header' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return response.status(401).json({ error: 'Invalid access token' });
    }

    _request.userid = decoded.id;
    _request.role = decoded.role;
    next();
  });
};

export default StudentMiddleware;
