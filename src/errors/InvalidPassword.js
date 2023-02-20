export class InvalidPassword extends Error {
  static message = 'Invalid Credentials!';

  constructor() {
    super(InvalidPassword.message);
  }
}
