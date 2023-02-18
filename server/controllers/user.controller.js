import { logger } from '../logger/index.js';
import { userService }  from '../services/index.js';

class UserController {
  async getUsers() {
    logger.info('Controller: getUsers')
    return await userService.getUsers();
  }

  async getUser(userId) {
    logger.info('Controller: getUser')
    return await userService.getUserById(userId);
  }
};

export default UserController;