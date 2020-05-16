import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Item from './Item';
import '../../styles/cart.css';

class Cart extends Component {

    constructor(props) {
        super(props)
    }

    state = 
	{
		
    }
	updatetotal = (event) => {
		console.log(jQuery('.quantity').val());
		var sum = 0;
		var array1 = [];
		$( ".quantity" ).each(function( index ) {
			console.log( index + ": " + $( this ).val() + ": " + $(this).data('price'));
			sum += $( this ).val()*$(this).data('price');
			$('.subtotal').text('$'+sum);
			$('.total').text('$'+sum);
			array1.push({
				itemid: $(this).data('itemid'), 
				price: $(this).data('price'),
				qty:  $( this ).val()
			});
		});
			array1.push({total:sum});
			
			console.log(array1);
			// Set a cookie
			Cookies.set('cart_array', JSON.stringify(array1));
		
	}
	toggleCart = (event) => {
		var item = event.currentTarget.getAttribute('data-itemdata');
		console.log(item);
		this.props.OnRemoveCartItem(item); 
    }
    render() {
        const addedPizzas = this.props.cartPizzas.filter(p => p.is_added);
        let tot = 0;
		var arraynew = [];
        addedPizzas.forEach(element => {
            tot += parseFloat(element.price);
			arraynew.push({
				itemid: element.id,  
				price: element.price,
				qty:  1,
			});
        });
		arraynew.push({
				total: tot,
			});
		
		console.log(arraynew);
		// Set a cookie
		Cookies.set('cart_array', JSON.stringify(arraynew));
		
        return (
			<div className="wrapper">
				<div className="container mb-4">
				  {(() => {
					if (addedPizzas.length > 0) {
					  return (
						<div className="row">
							<div className="col-12">
								<div className="table-responsive">
									<table className="table table-striped">
										<thead>
											<tr>
												<th scope="col"> </th>
												<th scope="col"> </th>
												<th scope="col">Pizza</th>
												<th scope="col" className="text-center">Quantity</th>
												<th scope="col" className="text-right">Price</th>
												<th> </th>
											</tr>
										</thead>
										<tbody>
											{addedPizzas.map((item, idx) => {
												return (
													<tr key={idx}>
														<td>{idx+1}</td>
														<td><img src={"/public/images/"+item.imageURL} className="image-fluid" width="100" height="100"/> </td>
														<td>{item.name}</td>
														<td><input className="form-control quantity" data-itemid = {item.id} data-price={item.price} type="number" defaultValue="1" onChange={this.updatetotal}/></td>
														<td className="text-right">${item.price}</td>
														<td className="text-right"><button className="btn btn-sm btn-danger" onClick={this.toggleCart} data-itemdata={item.id}><i className="fa fa-trash"></i> </button> </td>
													</tr>
												)
											})}					
											
											<tr>
												<td></td>
												<td></td>
												<td></td>
												<td></td>
												<td>Sub-Total</td>
												<td className="text-right subtotal">
													<input type="hidden" name="subtotal" id="subtotal" defaultValue={tot}/>
													${tot.toFixed(2)}
												</td>
											</tr>
											<tr>
												<td></td>
												<td></td>
												<td></td>
												<td></td>
												<td>Shipping</td>
												<td className="text-right">$0.00</td>
											</tr>
											<tr>
												<td></td>
												<td></td>
												<td></td>
												<td></td>
												<td><strong>Total</strong></td>
												<td className="text-right total"><strong>${tot.toFixed(2)}</strong></td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
							<div className="col mb-2">
								<div className="row">
									<div className="col-sm-12  col-md-6">
										<Link to='/' className="btn btn-block btn-light">Continue Shopping</Link>
									</div>
									<div className="col-sm-12 col-md-6 text-right">
										 <Link to='/checkout' className="btn btn-lg btn-block btn-primary text-uppercase">Checkout</Link>
									</div>
								</div>
							</div>
						</div>
					  )
					} else {
					  return (
						
						<div className="row">
							<div className="col-12">
								<div className="jumbotron text-center">
										<p className="lead">Your Cart is empty.</p>
									<hr></hr>
									<p className="lead">
										<Link to='/public' style={{ textDecoration: 'none' }} className="btn btn-primary btn-sm" role="button">Continue Shopping</Link>
									</p>
								</div>
							</div>
						</div>
					  )
					}
				  })()}
				</div>
                {/*<div className="flexcart">
                    <p className='cartHeader'>YOUR CART ({addedPizzas.length}) </p>
                    {addedPizzas.map((item, idx) => {
                        return (
                            <div className='cartItem' key={idx}>
                                <span className='info'>"/images/" + {item.imageURL}{item.name}</span>
                                <div className='freq'>
                                    ${item.price}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div>
                    <p className='cost'>YOUR TOTAL: ${tot.toFixed(2)}</p>
                    <Link to='/ordered'><div className="orderbutton">PLACE ORDER</div></Link>
                    <Link to='/'><div className="orderbutton">BACK</div></Link>
                </div>*/}
            </div>
        )
    }
}

export default Cart;