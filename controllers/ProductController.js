const viewPath = ('shoptify');
const Shoptify = require ('../models/shoptify');
const Cart = require ('../models/cart');
const User = require('../models/users');


exports.addToCart= async (req, res) => {

    try{
        const shoptify = await Shoptify.findById(req.params.id);
        res.render(`${viewPath}/addToCart`, {
            pageTitle: shoptify.title,
            formData: shoptify
        });
    } catch(error){
        req.flash('danger', `There was an error accesing the Product: ${error}`);
        res.redirect('/');       
    }

};

exports.updateCart= async (req, res) => {

    try{
        const { user: email } = req.session.passport;
        const user = await User.findOne({email: email});
        const cart = await Cart.create({user: user._id, ...req.body});

        res.status(200).json(cart);
        
    } catch (error){
        res.status(400).json({message: "There was an error adding this to cart"});
    }

};

exports.index = async(req, res) => {
    try{
            const shoptify = await Shoptify
            .find()
            .populate('user')
            .sort({updatedAt: 'desc'});
            const cart = await Cart
            .find()
            .populate('user')
            .sort({updatedAt: 'desc'});
            res.status(200).json(shoptify);
            res.status(200).json(cart);


    } catch(error){
        res.status(400).json({message: 'There was an error fething the products', error})
    }

};

exports.show = async (req, res) => {
    try{
    const shoptify = await Shoptify.findById(req.params.id)
    .populate('user')
    res.status(200).json(shoptify);
    } catch(error){
        res.status(400).json({message: "There was an error fetching the product data"});
    }
    };

exports.new = (req, res) => {
    res.render(`${viewPath}/new`,{
    pageTitle: 'New Product'
    });
};

exports.create = async (req, res) => {

    try{
        const { user: email } = req.session.passport;
        const user = await User.findOne({email: email});
        const shoptify = await Shoptify.create({user: user._id, ...req.body});

        res.status(200).json(shoptify);
    } catch (error){
        res.status(400).json({message: "There was an error posting the product", error})
    }

};

exports.edit = async (req, res) => {
    try{
        const shoptify = await Shoptify.findById(req.params.id);
        res.render(`${viewPath}/edit`, {
            pageTitle: shoptify.title,
            formData: shoptify
        });
    } catch(error){
        req.flash('danger', `There was an error accesing the Product: ${error}`);
        res.redirect('/');       
    }
};

exports.update = async (req, res) => {
    try {
      const { user: email } = req.session.passport;
      const user = await User.findOne({email: email});

      let shoptify = await Shoptify.findById(req.body.id);
      if (!shoptify) throw new Error('Product could not be found');

      
     const attributes = {user: user._id, ...req.body};
     await Shoptify.validate(attributes);
     await Shoptify.findByIdAndUpdate(attributes.id, attributes);

      req.flash('success', 'The Product was updated successfully');
      res.redirect(`/api/shoptify/${req.body.id}`);
    } catch (error) {
      req.flash('danger', `There was an error updating this Product: ${error}`);
      res.redirect(`/api/shoptify/${req.body.id}/edit`);
    }
  };

exports.delete = async (req, res) => {
    try{
        await Shoptify.deleteOne({_id: req.body.id});
        res.status(200).json({message: "Deleted."})
    }
    catch (error){
        res.status(400).json({message: "There was an error deleting this product"})
    }
}