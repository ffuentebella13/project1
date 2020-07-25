import React, { useState, useEffect } from 'react';
import {Form, Container} from 'react-bootstrap';
import Axios from 'axios';
import {Redirect} from 'react-router-dom';
import {toast} from 'react-toastify';
import { Link } from 'react-router-dom'

const ShowProduct = function (props){
    const id = props.location.state.id;

    const [inputs, setInputs] = useState({
        product: '',
        price: '',
        stocks: '',
        description: '',
        category: 'BEVERAGE'
    });

     const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        (async () => {
            const productResp = await Axios.get(`/api/shoptify/${id}`);
            if(productResp.status === 200) setInputs(productResp.data);
        })();
    }, []);



if(redirect) return (<Redirect to="/shoptify"/>);

return (
    <Container className="my-5">
<br/><br/><br/>
    <header>
        <h1 className="h6 text-sm">{ inputs.product } 
            <span className="badge badge-light pull-right price"><sup>CDN $</sup>
                { inputs.price }<br/>
                <span className="badge badge-danger badgeIcon">
                    { inputs.stocks } in Stocks
                </span>
            </span>
        </h1>
          <div className="dropdown">
            { inputs.category }                      
          </div>
        <hr/>
    </header>
        <div className="card-header h6 text-sm">
        <div className="card-body">
          <p className="card-text">{ inputs.description }</p> 
          <Link className="btn btn-primary" to={{ pathname: "/shoptify", }}>
             Products <i class="fa fa-eye" aria-hidden="true"></i>
             </Link>    
        </div>
        <div className="card-footer text-muted  h6 text-sm">
            { inputs.createdAt }
        </div>
    </div>
    
 
    </Container>
);
};
export default ShowProduct;