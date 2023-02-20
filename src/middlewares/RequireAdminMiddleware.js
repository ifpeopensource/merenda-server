function RequireAdminMiddleware(request, response, next) {
  if (request.role !== 'ADMIN') {
    return response.sendStatus(403);
  }
  next();
}

export default RequireAdminMiddleware;
