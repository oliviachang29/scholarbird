require('dotenv').config({ path: '.env.local' });

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const epilogue = require('epilogue');
const OktaJwtVerifier = require('@okta/jwt-verifier');

const oktaJwtVerifier = new OktaJwtVerifier({
  clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
  issuer: `${process.env.REACT_APP_OKTA_ORG_URL}/oauth2/default`,
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw new Error('Authorization header is required');

    const accessToken = req.headers.authorization.trim().split(' ')[1];
    await oktaJwtVerifier.verifyAccessToken(accessToken);
    next();
  } catch (error) {
    next(error.message);
  }
});

const database = new Sequelize({
  dialect: 'sqlite',
  storage: './test.sqlite',
});

const Scholarship = database.define('scholarships', {
  sheet_id: Sequelize.INTEGER,
  name: Sequelize.STRING,
  amount: Sequelize.INTEGER,
  contact: Sequelize.STRING,
  link: Sequelize.STRING,
  deadline: Sequelize.STRING,
  requirements: Sequelize.TEXT,
  major: Sequelize.STRING,
  user_email: Sequelize.STRING
});

epilogue.initialize({ app, sequelize: database });

epilogue.resource({
  model: Scholarship,
  endpoints: ['/scholarships', '/scholarships/:id'],
});

const port = process.env.SERVER_PORT || 8081;

database.sync().then(() => {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});