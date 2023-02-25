export class MealSessionFinishedError extends Error {
  static message = 'Meal session finished!';

  constructor() {
    super(MealSessionFinishedError.message);
  }
}
