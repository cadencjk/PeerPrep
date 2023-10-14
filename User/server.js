const cors = require('cors');
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const userRoutes = require('./server/route/user');
const env = require('./loadEnvironment');

console.log('Starting server ...');

// start the Express (web) server
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/user', userRoutes);
app.listen(env.USER_PORT, () => {
  console.log(`Server is running on port: ${env.USER_PORT}`);
});

try {
  // MySQL
  const mysqlDb = mysql.createConnection({
    ...env.mysqlCreds,
    ...{ database: env.mysqlDbName },
  });

  mysqlDb.connect((error) => {
    if (error)
      throw new Error('MySQL database connection error:' + error.message);
    console.log('SUCCESS: Connected to the MySQL database');
  });
} catch (err) {
  console.error(err);
}
