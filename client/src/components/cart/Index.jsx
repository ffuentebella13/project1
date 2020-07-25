import React, { useEffect, useState} from 'react';
import {Form, Container} from 'react-bootstrap';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'


const CartIndex = function ({user}){
    const [carts, setCarts] = useState([]);

    useEffect(() => {
        (async () => {
            await getCarts();
        })();
    }, []);

    const getCarts = async () => {
        const cartsResp = await Axios.get('/api/cart');
        if(cartsResp.status === 200) setCarts(cartsResp.data);
    };

    const deleteCart = async cart => {
    try{
        const resp = await Axios.post('/api/cart/delete',{
        id: cart._id
        });

        if(resp.status === 200){
            toast("The Product was remove from the cart.", {type: toast.TYPE.SUCCESS});
        }
        await getCarts();
    } catch(error){
        toast("There was an error removing this to cart", {
            type: toast.TYPE.ERROR});
        }
    };

    const [inputs, setInputs] = useState({
        quantity: '',
        product: '',
        product_id: '',
        price: '',
        category: ''
    });

    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async event => {
        event.preventDefault();
        try{
        const resp = await Axios.post('/api/cart/update', inputs);
            console.log("Inputs: " + inputs.quantity)
            console.log("id: " + inputs.product_id)
            if(resp.status === 200){
                toast("Added to cart succesfully!", {
                    type: toast.TYPE.SUCCESS
                });
                setRedirect(true);
            }else{
                toast("There was an issue adding to cart.",{
                    type: toast.TYPE.ERROR
                });
            }
        } catch (error){
            toast("There was an issue adding to cart.",{
                type: toast.TYPE.ERROR
            });
        }
    };

    const handleInputChange = async event => {
        event.persist();

        const { name, value } = event.target;

        setInputs(inputs => ({
            ...inputs,
            [name]:value
        }));
    };
    var total = 0;
    var items = 0;
    var subtotal = 0;
    var shipping = 0;
    var tax = 0;
    return (
        <Container  className="container my-5">
           <br/>
           {user != '' ? (
                <h5 className="h6">{ user.email }</h5>
            ): <p className="text-muted h5 text-sm">Anonymous User!</p>}<br/>
            <header>
            <a href="/shoptify/" className="btn bg-success"><i className="fa fa-shopping-bag" aria-hidden="true"></i> Shop Again</a> 
                <div className="float-sm-right">             
            </div>
            </header>
            <hr/>

            <div className="card-group">
                <div class="col">
                    <h1 className="h5">
                    My Cart
                    <p className="cart-list">
                    <small className="text-muted">*Make sure to click the plus button to see total when adding quantity.</small>
                    </p> 
                    </h1>
                    <hr/>
                    <div className="card" Style="width: 15rem;">
                        <ul className="list-group list-group-flush">      
                            {carts && carts.map((cart, i) => (
                           
                                                                              
                            <div key={i} >
                           
                                {cart.user.email === user.email ? (
                                <input type="hidden" name="id" value={items++}/>
                                ):null}
                                {cart.user.email === user.email ? (
                                <input type="hidden" value={ subtotal = subtotal + cart.price * cart.quantity }/>
                                ):null}
                                {cart.user.email === user.email ? (
                                <li className="list-group-item text-uppercase h5 small">
                                    { cart.product }                       
                                </li>
                                 ):null}
                                {cart.user.email === user.email ? (       
                                <li className="list-group-item  h5 small">
                                    <p className="d-flex flex-row">
                                            <p class="p2">
                                                <br/>
                                                ○ $ { cart.price } × {cart.quantity}
                                            </p>
                                            <p class="p2 ml-1">
                                            </p>
                                            <p class="p2 ml-1">
                                                <button className="btn bg-danger btn-sm" type="button" onClick={() => deleteCart(cart)}>
                                                <i className="fa fa-minus-circle" aria-hidden="true"></i>
                                                </button>
                                            </p>
                                            <p class="p2 ml-1">
            
                                            <Link className="btn bg-success btn-sm" to={{
                                                pathname: "/cart/editCart",
                                                state: {
                                                id: cart._id
                                                }
                                                }}>
                                                 <i className="fa fa-plus-circle" aria-hidden="true"></i>
                                            </Link>
                                            </p>
                                            </p> 
                                                       
                                            <p class="cart-list">
                                                ○ Total: $ { cart.price * cart.quantity }
                                            </p>    
                                                  
                                </li>
                                 ):null}
                            </div>
         
                            ))}

                        </ul>
                    </div>
                </div>
                <div className="col">
                    <div className="card float-sm-right" Style="width: 14rem;">
                        <ul className="list-group list-group-flush"> 
                        <li className="list-group-item h5 small" >
                            Summary:
                            <div className="float-sm-right"><i className="fa fa-shopping-cart" aria-hidden="true">{ items }</i></div>
                        </li>    
                        <li className="list-group-item h5 small" >
                            Sub-Total: ({ items } items) $ { subtotal } <br/><br/>
                            Shipping: $ { shipping = 2.22 } <br/><br/>
                            Tax : $ { tax = subtotal * 0.03 }
                        </li>
                        <li className="list-group-item h5 small">
                            Total : $ { subtotal + shipping +  tax }
                        </li>
                        <li className="list-group-item h5 small">
                            <label for="fname">Accepted Cards</label>
                            <div className="icon-container">
                            <i className="fa fa-cc-visa ml-1" Style="color:navy;"></i>
                            <i className="fa fa-cc-amex ml-1" Style="color:blue;"></i>
                            <i className="fa fa-cc-mastercard ml-1" Style="color:red;"></i>
                            <i className="fa fa-cc-discover ml-1" Style="color:orange;"></i>
                            </div>
                            <br/>
                            <div className="text-center">
                            <a href="#" className="btn bg-success">Proceed to Checkout</a> 
                            </div>
                        </li>
                        </ul>
                    </div>
                    </div>
            </div>
        </Container>
    );
};

export default CartIndex;