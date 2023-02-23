export class SessionClosedError extends Error {
  static message = 'The session is already closed!';

  constructor() {
    super(SessionClosedError.message);
  }
}
