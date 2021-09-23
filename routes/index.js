//require express
const router = require('express').Router();
//this sets the default search to require /api index.js
const apiRoutes = require('./api');

//everything in the api folder will start with /api
router.use('/api', apiRoutes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;