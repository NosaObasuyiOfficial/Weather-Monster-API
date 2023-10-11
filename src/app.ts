import express from 'express'
import dotenv from 'dotenv'
import logger from 'morgan'
import { db } from './database_connect/db_connect'
import { test_db } from './database_connect/test_dbconnect'
import citiesRoute from './routes/cities.route'
import temperaturesRoute from './routes/temperatures.route'
import forecastsRoute from './routes/forecasts.route'
import webhooksRoute from './routes/webhooks.route'

dotenv.config()

const app = express()
app.use(express.json())
app.use(logger('dev'))

app.use('/cities', citiesRoute)
app.use('/temperatures', temperaturesRoute)
app.use('/forecasts', forecastsRoute)
app.use('/webhooks', webhooksRoute)


db.sync()
  .then(() => {
    console.log("App Database is connected");
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });


  test_db.sync()
  .then(() => {
    console.log("Test_Database is READY");
  })
  .catch((error) => {
    console.error('Unable to connect to Test_Database:', error);
  });

app.listen(process.env.PORT, () => {
    console.log(`App is connected to PORT ${process.env.PORT}`)
})
