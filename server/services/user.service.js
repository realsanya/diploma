import { userRepository } from '../repositories/index.js';

class UserService {

  constructor() {}

  async getUsers() {
    return await userRepository.getUsers();
  }

  async getUserById(userId) {
    return await userRepository.getUserById(userId);
  }
}

export default UserService;