import { userRepository } from '../repositories/index.js';

class AuthService {
    
  constructor() {}

  async signup(req, res) {
    return await userRepository.signup(req, res);
  }

  async login(req, res) {
    return await userRepository.login(req, res);
  }
}

export default AuthService;

