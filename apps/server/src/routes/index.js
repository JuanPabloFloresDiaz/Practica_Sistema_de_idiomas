const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const basename = path.basename(__filename);

fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-10) === '.router.js'))
  .forEach((file) => {
    const route = file.split('.')[0];
    const routeFile = require(path.join(__dirname, file));
    router.use(`/${route}`, routeFile);
  });

module.exports = router;