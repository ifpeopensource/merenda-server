import jwt from 'jsonwebtoken';

function AuthMiddleware(request, response, next) {
  const authHeader =
    request.cookies['access-token'] || request.headers.authorization;

  if (!authHeader) {
    return response
      .status(401)
      .json({ error: { message: 'Missing authorization header' } });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return response
        .status(401)
        .json({ error: { message: 'Invalid access token' } });
    }

    request.userid = decoded.id;
    request.role = decoded.role;
    next();
  });
}

export default AuthMiddleware;
