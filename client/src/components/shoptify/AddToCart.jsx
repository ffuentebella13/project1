import React, { useState, useEffect } from 'react';
import {Form, Container} from 'react-bootstrap';
import Axios from 'axios';
import {Redirect} from 'react-router-dom';
import {toast} from 'react-toastify';
import { Link } from 'react-router-dom'

const AddCart = function (props){
    const id = props.location.state.id;

    const [inputs, setInputs] = useState({
        product: '',
        price: '',
        product_id: '',
        quantity: '',  
        category: ''
    });

     const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        (async () => {
            const productResp = await Axios.get(`/api/shoptify/${id}`);
            if(productResp.status === 200) setInputs(productResp.data);
        })();
    }, []);

    const handleSubmit = async event => {
        event.preventDefault();
        try{
        const resp = await Axios.post('/api/shoptify/updateCart', inputs);

            if(resp.status === 200){
                toast("The Product was updated succesfully!", {
                    type: toast.TYPE.SUCCESS
                });
                setRedirect(true);
            }else{
                toast("There was an issue updating the product",{
                    type: toast.TYPE.ERROR
                });
            }
        } catch (error){
            toast("There was an issue updating the Cart " + error,{
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


if(redirect) return (<Redirect to="/shoptify"/>);
return (
    <Container className="my-5">
        <br/><br/>
        <h1 className="display-4 float-left">
                    Quantity
                </h1>
        <div className="card-header display-4 h2 float-right">
            <h5 className="card-title">My Cart </h5>
            <hr/>
            <Link className="btn btn-primary ml-1" to={{ pathname: "/cart" }}> View Cart </Link>
            <Link className="btn btn-success ml-1" to={{ pathname: "#" }}> Check-Out </Link>
        </div>   
        <br/><br/><hr/>    
        <div  className="row">
                        <div className="col-lg-4 d-flex align-items-stretch">
                       
                            <div className="card cardContainer" >
                                 <div className="card-header h5">
                                        { inputs.product }
                                        <span className="badge badge-light pull-right text-danger"><sup>CDN $</sup>{ inputs.price }</span><br/>
                                    </div>
                                <div className="card-body ">

                                <Form className="form-row" onSubmit={handleSubmit}>
                                    
                                    <Form.Control type="hidden" name="product_id" onChange={handleInputChange} value={inputs._id}/>
                                    <Form.Control type="hidden" name="product" onChange={handleInputChange} value={inputs.product}/>
                                    <Form.Control type="hidden" name="price" onChange={handleInputChange} value={inputs.price}/>
                                    <Form.Control type="hidden" name="category" onChange={handleInputChange} value={inputs.category}/>

                                    <div className="col-md-4 mb-3">
                                        <Form.Group>
                                            <Form.Control name="quantity"  type="number" required min="1"  placeholder="Qty" className="formWidth" onChange={handleInputChange} value={inputs.quantity}/>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-8 mb-3">
                                        <Form.Group>
                                            <button type="submit" className="btn btn-success"> Add to Cart <i className="fa fa-cart-plus" aria-hidden="true"></i></button>
                                    </Form.Group>
                                    </div>
                                </Form>  
                                </div>
                            
                                <div className="card-footer text-muted">
                                    {inputs.category}
                                </div>
                            </div>
                        </div>                                                    
        </div>
    </Container>
);
};
export default AddCart;