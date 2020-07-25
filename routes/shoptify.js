const {new: _new, index, show, create, edit, update , updateCart, delete: _delete} = require ('../controllers/ProductController');
function auth (req, res, next) {
    if (!req.isAuthenticated()) {
      req.flash('danger', 'You need to login first.');
      return res.redirect('/login');
    }
    next();
  }
module.exports = router => {
    router.get('/shoptify', index);
    router.get('/shoptify/new', auth, _new);
    router.post('/shoptify', auth, create);
    router.post('/shoptify/update', auth, update);
    router.post('/shoptify/delete', auth, _delete);
    router.get('/shoptify/:id/edit', auth, edit);
    router.get('/shoptify/:id', show);
    router.post('/shoptify/updateCart', updateCart);
    

}