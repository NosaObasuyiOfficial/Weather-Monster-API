import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const { DEV_DB_NAME, DEV_DB_USERNAME, DEV_DB_PASSWORD, DEV_DB_HOST } = process.env

export const db = new Sequelize(
  DEV_DB_NAME!, 
  DEV_DB_USERNAME!, 
  DEV_DB_PASSWORD!, 

  {
    host: DEV_DB_HOST,
    port: 5432,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      encrypt: true,
      ssl: {
        rejectUnauthorized: true,
      },
    },
    pool: {
      max: 10, // maximum number of connections in the pool
      min: 0,  // minimum number of connections in the pool
      acquire: 30000, // maximum time, in milliseconds, that a connection can be idle before being released
      idle: 10000 // maximum time, in milliseconds, that pool will try to get connection before throwing error
    }
  },
);


