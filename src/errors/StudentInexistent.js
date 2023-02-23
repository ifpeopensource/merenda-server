export class StudentInexistentError extends Error {
  static message = 'The student is not registered in the database!';

  constructor() {
    super(StudentInexistentError.message);
  }
}
