export class StudentNotFoundError extends Error {
  static message = 'Student not found!';

  constructor() {
    super(StudentNotFoundError.message);
  }
}
