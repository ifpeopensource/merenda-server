export class StudentAlreadyInMealSessionError extends Error {
  static message = 'Student already in Meal Session!';

  constructor() {
    super(StudentAlreadyInMealSessionError.message);
  }
}
