import jwt from 'jsonwebtoken';

require('dotenv').config();

const UserMiddleware = (_request, response, next) => {
    const authHeader = _request.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Missing authorization header' });
    }
  
    // Get token from authorization header
    const token = authHeader.split(' ')[1];
    
    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return response.status(401).json({ error: 'Invalid access token' });
        }

        _request.userid = decoded.userId
        _request.role = decoded.role
        next();
    });
}

export default UserMiddleware