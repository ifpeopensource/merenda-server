export class MealSessionNotFoundError extends Error {
  static message = 'Meal Session not found!';

  constructor() {
    super(MealSessionNotFoundError.message);
  }
}
