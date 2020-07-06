const { new: _new, create } = require('../controllers/UsersController');
// Step 1: Setup the necessary routes for new and create
module.exports = router => {
  router.get('/register', _new);
  router.post('/users', create);
};