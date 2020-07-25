const {index, update, show, viewCart, delete: _delete} = require ('../controllers/CartController');
function auth (req, res, next) {
    if (!req.isAuthenticated()) {
      req.flash('danger', 'You need to login first.');
      return res.redirect('/login');
    }
    next();
  }
module.exports = router => {
    router.get('/cart', auth, index);
    router.get('/partials/cart', auth, viewCart);
    router.post('/cart/update', auth, update);
    router.post('/cart/delete', auth, _delete);
    router.get('/cart/:id', show);

}
