import React, {Component} from 'react';
import { Link , BrowserRouter, Redirect} from 'react-router-dom';
import Item from './Item';
import '../../styles/cart.css';

class Checkout extends Component {

    constructor(props) {
        super(props)
		console.log(this.state);
		this.state = { data: [] };
		this.onSubmitButton = this.onSubmitButton.bind(this);
	}
	state = {
		redirect: false,
	  }
	onSubmitButton(e) {
        e.preventDefault();
   
        $.ajax({
			type: 'POST',
			url: '/public/api/orderpizza',
			dataType: 'json',
			data: $('.checkoutform').serialize(),
			context: this,
			success: (data) => {
				console.log(data);
				this.setState({ redirect: true });
			},
			error: (xhr, status, error) => {
				console.error(this.props.url, status, error.toString());
			}
		});
    }

    render() {
		 const { redirect } = this.state;

		 if (redirect) {
		   return <Redirect to='/ordered'/>;
		 }
		// Read the cookie
		const datacookie = JSON.parse(Cookies.get('cart_array'));
		let total = 0;
		datacookie.forEach(element => {
			total = parseFloat(element.total);
        });
		const addedPizzas = this.props.pizzas.filter(p => p.is_added);
		//let passdata = addedPizzas;
		console.log(addedPizzas);
        let tot = 0;
        addedPizzas.forEach(element => {
			//console.log(element);
            tot += parseFloat(element.price);
        });
        return (
			<div className="wrapper">
				<form className="checkoutform needs-validation">
				
				<div className="row">
					<div className="col-md-4 order-md-2 mb-4">
					  <h4 className="d-flex justify-content-between align-items-center mb-3">
						<span className="text-muted">Your cart</span>
						<span className="badge badge-secondary badge-pill">{addedPizzas.length}</span>
					  </h4>
					  <ul className="list-group mb-3">
						{addedPizzas.map((item, idx) => {
							return (
								<li className="list-group-item d-flex justify-content-between lh-condensed" key={idx}>
									 <div>
										<h6 className="my-0">{item.name}</h6>
									  </div>
									  <span className="text-muted">${item.price}</span>
								</li>
							)
						})}	
						<li className="list-group-item d-flex justify-content-between">
						  <span>Total (USD)</span>
						  <strong>${total.toFixed(2)}</strong>
						</li>
					  </ul>
					</div>
					<div className="col-md-8 order-md-1">
					  <h4 className="mb-3">Billing address</h4>
						<div className="row">
						  <div className="col-md-6 mb-3">
							<label htmlFor="firstName">First name</label>
							<input type="text" className="form-control" id="firstName" name="firstName" placeholder="" defaultValue="" required />
							<div className="invalid-feedback">
							  Valid first name is required.
							</div>
						  </div>
						  <div className="col-md-6 mb-3">
							<label htmlFor="lastName">Last name</label>
							<input type="text" className="form-control" id="lastName" name="lastName" placeholder="" defaultValue="" required />
							<div className="invalid-feedback">
							  Valid last name is required.
							</div>
						  </div>
						</div>

						<div className="mb-3">
						  <label htmlFor="username">Username</label>
						  <div className="input-group">
							<div className="input-group-prepend">
							  <span className="input-group-text">@</span>
							</div>
							<input type="text" className="form-control" id="username" name="username" placeholder="Username" required />
							<div className="invalid-feedback">
							  Your username is required.
							</div>
						  </div>
						</div>

						<div className="mb-3">
						  <label htmlFor="email">Email <span className="text-muted">(Optional)</span></label>
						  <input type="email" className="form-control" id="email" name="email" placeholder="you@example.com" />
						  <div className="invalid-feedback">
							Please enter a valid email address for shipping updates.
						  </div>
						</div>

						<div className="mb-3">
						  <label htmlFor="address">Address</label>
						  <input type="text" className="form-control" id="address" name="address" placeholder="1234 Main St" required />
						  <div className="invalid-feedback">
							Please enter your shipping address.
						  </div>
						</div>

						<div className="mb-3">
						  <label htmlFor="address2">Address 2 <span className="text-muted">(Optional)</span></label>
						  <input type="text" className="form-control" id="address2" name="address2" placeholder="Apartment or suite" />
						</div>

						<div className="row">
						  <div className="col-md-5 mb-3">
							<label htmlFor="country">Country</label>
							<select className="custom-select d-block w-100" id="country" name="country" required>
							  <option defaultValue="">Choose...</option>
							  <option>United States</option>
							</select>
							<div className="invalid-feedback">
							  Please select a valid country.
							</div>
						  </div>
						  <div className="col-md-4 mb-3">
							<label htmlFor="state">State</label>
							<select className="custom-select d-block w-100" id="state" name="state" required>
							  <option defaultValue="">Choose...</option>
							  <option>California</option>
							</select>
							<div className="invalid-feedback">
							  Please provide a valid state.
							</div>
						  </div>
						  <div className="col-md-3 mb-3">
							<label htmlFor="zip">Zip</label>
							<input type="text" className="form-control" id="zip" placeholder="" name="zip" required />
							<div className="invalid-feedback">
							  Zip code required.
							</div>
						  </div>
						</div>
						<hr className="mb-4"></hr>

						<h4 className="mb-3">Payment</h4>

						<div className="d-block my-3">
						  <div className="custom-control custom-radio">
							<input id="cod" name="paymentMethod" type="radio" className="custom-control-input" defaultChecked required />
							<label className="custom-control-label" htmlFor="cod">Cash on Delivery</label>
						  </div>
						</div>
						<hr className="mb-4"></hr>
						<Link to='/ordered' className="btn btn-primary btn-lg btn-block"  onClick={this.onSubmitButton}>Place Order</Link>
					</div>
					
				  </div>
				</form>
            </div>
        )
    }
}

export default Checkout;