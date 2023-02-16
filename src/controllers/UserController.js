import UserService from '../services/UserService.js';

async function list(_request, response) {

    response.json(users);
}

export default { list };
