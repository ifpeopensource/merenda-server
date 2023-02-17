import UserService from '../services/UserService.js';

async function list(_request, response) {
  const users = await UserService.findAll();

  response.json(users);
}

export default { list };
