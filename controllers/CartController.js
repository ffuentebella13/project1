const viewPath = ('cart');
const Cart = require ('../models/cart');
const User = require('../models/users');

exports.viewCart = async(req, res) => {
    try{
        const cart = await Cart
        .find()
        .sort({updatedAt: 'desc'});

        app.render(`partials/cart`, {
        pageTitle: 'My Cart',
        cart: cart
        });
    } catch(error){
        req.flash('danger', `There was an error displaying the Order: ${error}`);
        res.redirect('/');
    }

};

exports.index = async(req, res) => {
    try{
        const cart = await Cart
        .find()
        .populate('user')
        .sort({updatedAt: 'desc'});

        res.render(`${viewPath}/index`, {
        pageTitle: 'My Cart',
        cart: cart
        });
    } catch(error){
        req.flash('danger', `There was an error displaying the Order: ${error}`);
        res.redirect('/');
    }

};


exports.update = async (req, res) => {
    try {
 
      const { user: email } = req.session.passport;
      const user = await User.findOne({email: email});

      let cart = await Cart.findById(req.body.id);
      if (!cart) throw new Error('Product could not be found');

      
     const attributes = {user: user._id, ...req.body};
     await Cart.validate(attributes);
     await Cart.findByIdAndUpdate(attributes.id, attributes);

      
      req.flash('success', 'The Qty was updated successfully');
      res.redirect(`/cart`);
    } catch (error) {
      req.flash('danger', `There was an error updating this Cart: ${error}`);
      res.redirect(`/cart`);
    }
  };
  exports.delete = async (req, res) => {
    try{
        await Cart.deleteOne({_id: req.body.id});
        req.flash('success', 'The product was removed successfully');
        res.redirect(`/cart`);
    }
    catch (error){
        req.flash('danger', `There was an error removing this product to cart: 
        ${error}`);
        res.redirect('/cart');
    }
}
