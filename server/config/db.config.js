import { Sequelize, Model, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
import { ReviewModel, UserModel, ArticleModel } from '../models/index.js';
import { logger } from '../logger/index.js';

dotenv.config();

const connect = () => {
  const hostName = process.env.HOST;
  const userName = process.env.USER;
  const password = process.env.PASSWORD;
  const database = process.env.DB;
  const dialect = process.env.DIALECT;

  const sequelize = new Sequelize(database, userName, password, {
      host: hostName,
      dialect: dialect,
      operatorsAliases: 0,
      pool: {
          max: 10,
          min: 0,
          acquire: 20000,
          idle: 5000
      }
  });

  const db = {};
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;
  
  db.reviews = ReviewModel(sequelize, DataTypes, Model);
  db.users = UserModel(sequelize, DataTypes, Model);
  db.articles = ArticleModel(sequelize, DataTypes, Model);

  sequelize.sync().then(() => {
    logger.info('Tables created successfully!');
  }).catch((error) => {
    logger.error('Unable to create tables: ', error);
  });
 

  return db;
}

export {
  connect
}