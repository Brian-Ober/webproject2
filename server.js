const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
 
const port = process.env.PORT || 8080;
const app = express();
const swaggerAutogen = require('swagger-autogen')();
 
app
  .use(bodyParser.json())
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));
 
mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);  // Corrected here
    });
    console.log(`Connected to DB and listening on ${port}`); // Corrected here
  }
});

