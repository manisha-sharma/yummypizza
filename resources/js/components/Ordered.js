import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import '../../styles/cart.css';
import '../../styles/home.css';

class Ordered extends Component {

    state = {

    }

    componentDidMount () {
        let addedPizzas = this.props.pizzas.filter(e => e.is_added);
        addedPizzas.forEach(element => {
            this.props.onRemoveFromCart(element);
        });
		
		// Read the cookie
		//console.log(JSON.parse(Cookies.get('orderid'))); 
		//let orderid = JSON.parse(Cookies.get('orderid'));
    }

    render () {
		
		//console.log(Cookies.get('orderid'));
        return (
			<>
			<div className="row">
				<div className="col-12">
					<div className="jumbotron text-center">
						<h1 className="display-3">Thank You!</h1>
							<p className="lead">Your order is recieved.</p>
						<hr></hr>
						<p className="lead">
							<Link to='/public' style={{ textDecoration: 'none' }} className="btn btn-primary btn-sm" role="button">Continue Shopping</Link>
						</p>
					</div>
				</div>
			</div>
			</>
        )
    }
}

export default Ordered;