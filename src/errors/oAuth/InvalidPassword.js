export class InvalidPasswordError extends Error {
  static message = 'Invalid Credentials!';

  constructor() {
    super(InvalidPasswordError.message);
  }
}
