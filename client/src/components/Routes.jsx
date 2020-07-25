import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from './pages/Home';
import Login from './sessions/Login';
import Logout from './sessions/Logout';
import Shoptify from './shoptify/Index';
import NewProduct from './shoptify/New';
import Register from './users/New';
import EditProduct from './shoptify/Edit';
import ShowProduct from './shoptify/Show';
import Cart from './cart/Index';
import AddCart from './shoptify/AddToCart';
import EditCart from './cart/EditCart';
function Routes ({user, setUser}) {
  return (
    <Switch>
      <Route exact path="/login" render={
        renderProps => <Login
          {...renderProps}
          setUser={setUser}
        />
      }/>
      <Route exact path="/logout" render={
        renderProps => <Logout
          {...renderProps}
          setUser={setUser}
        />
      }/>
      <Route exact path="/shoptify" render={
        renderProps => <Shoptify
          {...renderProps}
          user={user}
        />
      }/>
      <Route exact path="/cart" render={
        renderProps => <Cart
          {...renderProps}
          user={user}
        />
      }/>
      <Route exact path="/" component={Home}/>
      <Route exact path="/shoptify/new" component={NewProduct}/>
      <Route exact path="/shoptify/edit" component={EditProduct}/>
      <Route exact path="/shoptify/show" component={ShowProduct}/>
      <Route exact path="/shoptify/addToCart" component={AddCart}/>
      <Route exact path="/cart/editCart" component={EditCart}/>
      <Route exact path="/users/new" component={Register}/>
    </Switch>
  );
}
export default Routes;