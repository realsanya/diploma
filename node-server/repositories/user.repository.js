import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { connect } from '../config/index.js';
import { logger } from '../logger/index.js';

dotenv.config();

class UserRepository {

  db = {};

  constructor() {
    this.db = connect();
  }

  
  async signup(req, res) {
    try {
      const { firstName, email, lastName, password, pictureStorageName } = req.body;

      const user = await this.db.user.findOne({
        where: {
          email: email
        }
      });

      if (user) {
        return res.status(400).send({ message: "Пользователь с таким email уже существует" });
      }
    
      const data = {
        firstName,
        lastName,
        email,
        password: await bcrypt.hash(password, 10),
        pictureStorageName,
      };

      const createdUser = await this.db.user.create(data);

      if (createdUser) {
        let token = jwt.sign({ id: createdUser.id }, process.env.SECRET_KEY, {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });
   
        res.cookie("token", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
   
        return res.status(201).send({
          user: createdUser, 
          token,
        });
      } else {
        return res.status(409).send({ message: "Details are not correct" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Что-то пошло не так" });
    }
  };

  async login(req, res) {
    try {
      const { email, password } = req.body;
   
      const user = await this.db.user.findOne({
        where: {
          email: email
        }
      });
  
      if (user) {
        const isSame = await bcrypt.compare(password, user.password);
   
        if (isSame) {
          let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
            expiresIn: 1 * 24 * 60 * 60 * 1000,
          });

          logger.info(token);
   

          res.cookie("token", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });

          return res.status(201).send({
            user,
            token,
          });
        } else {
          return res.status(401).send({ message: "Пароль введен неверно" });
        }
      } else {
        return res.status(401).send({ message: "Такого пользователя не существует" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Что-то пошло не так" });
    }
  };

  async getUsers() {
    try {
      const users = await this.db.user.findAll();
      return users;
    } catch (err) {
      logger.error(err);
      return [];
    }
  }

  async getUserById(userId) {
    try {
      const user = await this.db.user.findOne({
        where: {
          id: userId
        }
      });
      return user;
    } catch (err) {
      return null;
    }
  }
}
 
export default UserRepository;