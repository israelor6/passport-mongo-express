var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', passport.authenticate('jwt', {session:false}), function(req, res, next) {
  res.send('This route need auth');
});

module.exports = router;
