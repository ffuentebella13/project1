const viewPath = ('cart');
const Cart = require ('../models/cart');
const User = require('../models/users');

exports.editCart= async (req, res) => {

    try{
        const cart = await Cart.findById(req.params.id);
        res.render(`${viewPath}/editCart`, {
            pageTitle: cart.title,
            formData: cart
        });
    } catch(error){
        req.flash('danger', `There was an error accesing the Product: ${error}`);
        res.redirect('/');       
    }

};

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

        res.status(200).json(cart)
    } catch(error){
        res.status(400).json({message: "There was an error fetching the cart."});
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
      res.redirect(`/api/cart/${req.body.id}`);
    } catch (error) {
      req.flash('danger', `There was an error updating this Cart: ${error}`);
      res.redirect(`/api/cart`);
    }
  };
  
exports.show = async (req, res) => {
    try{
    const cart = await Cart.findById(req.params.id)
    .populate('user')
    res.status(200).json(cart);
    } catch(error){
        res.status(400).json({message: "There was an error fetching the product data"});
    }
    };

  exports.delete = async (req, res) => {
    try{
        await Cart.deleteOne({_id: req.body.id});
        res.status(200).json({message: "Deleted."})
    }
    catch (error){
        res.status(400).json({message: "There was an error removing this in the cart"})
    }
}
