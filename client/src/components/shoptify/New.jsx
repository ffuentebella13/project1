import React, { useState } from 'react';
import {Form, Container} from 'react-bootstrap';
import Axios from 'axios';
import {Redirect} from 'react-router-dom';
import {toast} from 'react-toastify';

const NewProduct = function (){
    const [inputs, setInputs] = useState({
        product: '',
        price: '',
        stocks: '',
        description: '',
        category: 'BEVERAGE'
    });

    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async event => {
        event.preventDefault();
        try{
        const resp = await Axios.post('/api/shoptify', inputs);

            if(resp.status === 200){
                toast("The Product was added succesfully!", {
                    type: toast.TYPE.SUCCESS
                });
                setRedirect(true);
            }else{
                toast("There was an issue adding the product",{
                    type: toast.TYPE.ERROR
                });
            }
        } catch (error){
            toast("There was an issue creating the blog",{
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
        
        <header>
            <h1>
               Sell Your Products
            </h1>
            <hr/>
        </header>

        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Product </Form.Label>
                    <Form.Control name="product" onChange={handleInputChange} value={inputs.product}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Control  type="number" required min="1"  name="price" onChange={handleInputChange} value={inputs.price}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Stocks</Form.Label>
                    <Form.Control  type="number" required min="1"  name="stocks" onChange={handleInputChange} value={inputs.stocks}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description </Form.Label>
                    <Form.Control as="textarea" name="description" onChange={handleInputChange} value={inputs.description}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Category </Form.Label>
                    <Form.Control as="select" name="category" onChange={handleInputChange} defaultValue={inputs.category || 'BEVERAGE'}>
                        <option value="BEVERAGE">Beverage</option>
                        <option value="CANNED">Canned</option>
                        <option value="HEALTH">Health</option>
                        <option value="GADGET">Gadgets</option>
                        <option value="FROZEN">Frozen</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </Form.Group>
            </Form>
        </div>
    </Container>
);
};
export default NewProduct;