import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const { DEV_TEST_DB_NAME, DEV_TEST_DB_USERNAME, DEV_TEST_DB_PASSWORD, DEV_TEST_DB_HOST } = process.env

export const test_db = new Sequelize(
  DEV_TEST_DB_NAME!, 
  DEV_TEST_DB_USERNAME!, 
  DEV_TEST_DB_PASSWORD!, 

  {
    host: DEV_TEST_DB_HOST,
    port: 5432,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      encrypt: true,
    //   ssl: {
    //     rejectUnauthorized: true,
    //   },
    }
  },
);


