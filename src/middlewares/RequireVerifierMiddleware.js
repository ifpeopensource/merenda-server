function RequireVerifierMiddleware(request, response, next) {
  if (!['ADMIN', 'VERIFIER'].includes(request.role)) {
    return response.sendStatus(403);
  }

  next();
}

export default RequireVerifierMiddleware;
