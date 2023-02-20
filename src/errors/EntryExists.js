export class EntryExists extends Error {
  static message = 'User already exists in database!';

  constructor() {
    super(EntryExists.message);
  }
}
