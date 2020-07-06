const viewPath = ('shoptify');
const Shoptify = require ('../models/shoptify');
const Cart = require ('../models/cart');
const User = require('../models/users');

exports.updateCart= async (req, res) => {

    try{
        const { user: email } = req.session.passport;
        const user = await User.findOne({email: email});
        const cart = await Cart.create({user: user._id, ...req.body});

        req.flash('success', 'Product added succesfully added to cart');
        res.redirect(`/shoptify`);
        
    } catch (error){
        req.flash('danger', `There was an error adding this to cart: 
        ${error}`);
        req.session.formData = req.body;
        res.redirect('/shoptify/new');
    }

};

exports.index = async(req, res) => {
    try{
            var search = req.query.text;
            var category = req.query.category;
            const shoptify = await Shoptify
            const cart = await Cart

        if(search == '' && category == '')
            { 

                shoptify.find(function (err, docs1) {
                cart.find(function (err, docs2) {                  
                res.render(`${viewPath}/index`, {
                pageTitle: 'Our Products',
                shoptify: docs1, // render the product table
                cart: docs2 // render the cart table to get total
                });
        
                }).populate('user')
                }).populate('user')    
            }
        else{
            shoptify.find({ 
                product:{
                    $regex: new RegExp(search)
                }},function (err, docs1) {
            cart.find(function (err, docs2) {  

                res.render(`${viewPath}/index`, {
                pageTitle: 'Our Products',
                shoptify: docs1, // render the product table
                cart: docs2 // render the cart table to get total
                });
             }).populate('user')
             }).populate('user')
             search = "";
        }

 
    } catch(error){
        req.flash('danger', `There was an error displaying the products: ${error}`);
        res.redirect('/');
    }

};

exports.show = async (req, res) => {
    try{
    const shoptify = await Shoptify.findById(req.params.id)
    .populate('user')
    res.render(`${viewPath}/show`, {
        pageTitle: shoptify.title,
        shoptify: shoptify
    });
    } catch(error){
        req.flash('danger', `There was an error displaying the product: ${error}`);
        res.redirect('/');
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

        req.flash('success', 'Product created succesfully');
        res.redirect(`/shoptify/${shoptify.id}`);
    } catch (error){
        //console.log(err);
        req.flash('danger', `There was an error creating this Product: 
        ${error}`);
        req.session.formData = req.body;
        res.redirect('/shoptify/new');
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

      req.flash('success', 'The blog was updated successfully');
      res.redirect(`/shoptify/${req.body.id}`);
    } catch (error) {
      req.flash('danger', `There was an error updating this blog: ${error}`);
      res.redirect(`/shoptify/${req.body.id}/edit`);
    }
  };

exports.delete = async (req, res) => {
    try{
        await Shoptify.deleteOne({_id: req.body.id});
        req.flash('success', 'The blog was deleted successfully');
        res.redirect(`/shoptify`);
    }
    catch (error){
        req.flash('danger', `There was an error deleting this blog: 
        ${error}`);
        res.redirect('/shoptify');
    }
}