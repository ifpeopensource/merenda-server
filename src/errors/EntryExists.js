export class EntryExistsError extends Error {
  static message = 'User already exists in database!';

  constructor() {
    super(EntryExistsError.message);
  }
}
