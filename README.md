# Weather Monster

# Setting up the project
1. **Clone this repo**
  To clone this repository, copy the ssh key:

   ```sh
   git@github.com:NosaObasuyiOfficial/Weather-Monster-API.git

2. **Install dependencies**
To install dependencies, use the following command in your terminal or command prompt:

   ```sh
   yarn

3. **Build Application**
To build or compile this application, use the following command in your terminal or command prompt:

   ```sh
   yarn build

 **Notice:**
 This app has been deployed on render. 
 Url - https://weather-monster-c1xp.onrender.com

# Running the app
Please copy and paste the link below in your broswer to see the detailed postman documentation on how to run all endpoint operations in this app.

   ```sh
   https://documenter.getpostman.com/view/27252839/2s9YJW663Q


# Running the Tests
To run the tests for this project, follow these steps:

1. **Add an Environment File (env):**
   Create a file named `.env` in the root folder of your project.

2. **Copy and Paste the Following Information in the env file:**
   ```plaintext
   PORT = 3000
   DEV_TEST_DB_NAME = 'insert your postgres db_name'
   DEV_TEST_DB_HOST = 'insert host e.g localhost'
   DEV_TEST_DB_USERNAME = 'insert your postgres db_username'
   DEV_TEST_DB_PASSWORD = 'insert your password'

Note: Do not add '' at the beginning or end of your inputs.

**IMPORTANT NOTE!!!**  
Please Check the 'test_dbconnect.ts' file in the 'database_connect' folder to adjust any information inorder to connect to your local database.

3. **Start the application**
To start the application, use the following command in your terminal or command prompt:

   ```sh
   yarn start

4. **Run Tests:**
To execute all tests for this application, use the following command in your terminal or command prompt:

   ```sh
   yarn test




