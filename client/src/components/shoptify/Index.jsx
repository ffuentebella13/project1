import React, { useEffect, useState} from 'react';
import {Form, Container} from 'react-bootstrap';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'


const Index = function ({user,props}){

    const [products, setProducts] = useState([]);


    useEffect(() => {
        (async () => {
            await getProducts()
            ;
        })();
    }, []);

    const getProducts = async () => {
        const productsResp = await Axios.get('/api/shoptify');
        if(productsResp.status === 200) setProducts(productsResp.data);
    };

    const deleteProduct = async product => {
    try{
        const resp = await Axios.post('/api/shoptify/delete',{
        id: product._id
        });

        if(resp.status === 200){
            toast("The Product was deleted successfully", {type: toast.TYPE.SUCCESS});
        }
        await getProducts();
    } catch(error){
        toast("There was an error deleteing this product", {
            type: toast.TYPE.ERROR});
        }
    };


    return (
        <Container  className="container my-5">
            <header className="productCart">
                <div className="card-body bg-light mb-3 float-sm-left">

                    {user != '' ? (
                    <h5 className="h6">{ user.email }</h5>
                    ): <p className="text-muted h5 text-sm">Anonymous User!</p>}
                    <h1 className="display-4">
                    Today's Deals
                    </h1>
                    {user != '' ? (
                    <Link className="btn btn-success ml-1" to={{ pathname: "/shoptify/new" }}> <i className="fa fa-plus-circle" aria-hidden="true"></i> Post New</Link>
                    ):null}
                </div>
                <div className="card-body bg-light mb-3 float-sm-right">
                
                <div className="card-header display-4 h2">
                    <h5 className="card-title">My Cart </h5>
                    <hr/>
                    {user != '' ? (    
                    <Link className="btn btn-primary ml-1" to={{ pathname: "/cart" }}> View Cart </Link>
                    ):<p className="text-danger h5 text-sm">*Please sign-in to view cart!</p>}

                    {user != '' ? (    
                    <Link className="btn btn-success ml-1" to={{ pathname: "#" }}> Check-Out </Link>
                    ):null}
                  
                </div>
            </div>              
                </header>
                <div className="row">
                    <br/><br/><br/><br/><br/>
                    <br/><br/><br/><br/><br/>
                </div>
            <div  className="row">
                {products && products.map((product, i) => (
                        <div key={i} className="col-lg-3 d-flex align-items-stretch" >
                            <div className="card cardContainer" Style="width: 16rem;" >
                                <div className="card-header h5">
                                    { product.product }
                                    <span className="badge badge-light pull-right text-danger"><sup>CDN $</sup>{ product.price }</span><br/>
                                    <small className="text-muted ">~ { product.user.fullname }</small>
                                </div>
                            <div className="card-body ">
                                <p className="cart-list">
                                <small className="text-muted">{ product.synopsis }</small>
                                <br/>
                                <Link to={{
                                                pathname: "/shoptify/show",
                                                state: {
                                                id: product._id
                                                }
                                            }}>
                                            Continue...
                            </Link>
                                </p>     
                            </div>
                            <div className="card-footer text-muted" >     
                            {user != '' ? (    
                            <Link className="btn btn-success" to={{
                                                pathname: "/shoptify/addToCart",
                                                state: {
                                                id: product._id
                                                }
                                            }}>
                              Add to Cart <i class="fa fa-cart-plus" aria-hidden="true"></i>                  	    
                            </Link>
                             ):<p className="text-danger">*Please sign-in first to add this to cart.</p>}
                            </div>
                        
                            <div className="card-footer text-muted">
                                    <small>
                                        <div className="dropdown">
                                        <a className="dropdown-toggle pull-right" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="fa fa-cogs" aria-hidden="true"></i>
                                        </a>                 
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">                     
                                            <Link className="dropdown-item" to={{
                                                pathname: "#",
                                                state: {
                                                id: product._id
                                                }
                                            }}>
                                                <i className="fa fa-search" aria-hidden="true"></i> Read 
                                            </Link>
                                             { product.user.email === user.email ? (
                                            <Link className="dropdown-item" to={{
                                                pathname: "/shoptify/edit",
                                                state: {
                                                id: product._id
                                                }
                                            }}>
                                                <i className="fa fa-pencil"> Update </i>
                                            </Link>
                                             ):null}
                                            {product.user.email === user.email ? (
                                            <button className="dropdown-item" type="button" onClick={() => deleteProduct(product)}>
                                                <i className="fa fa-trash"></i> Delete 
                                            </button>
                                            ):null}
                                        </div>
                                        </div>
                                        { product.stocks } items Left 
                                    </small>                       
                            </div>
                            </div>
                        </div>                    
                   
                ))}
          </div>

      </Container>
    );
};

export default Index;