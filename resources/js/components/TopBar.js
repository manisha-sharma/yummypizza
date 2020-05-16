import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import '../../styles/home.css';
import Item from './Item';

class Topbar extends Component {

    state = {
		
	}

    render() {
        return (
			<div>
				<nav className="navbar navbar-expand-md navbar-dark bg-dark">
					<div className="container">
						<Link to='/public' className="navbar-brand">YUMMY PIZZA</Link>

						<div className="justify-content-end" id="navbarsExampleDefault">
								<Link to='/login'  className="btn btn-primary btn-sm ml-3 changelabel">	
									<i className="fa fa-user"></i> Past Orders
								</Link>
								<Link to='/cart'  className="btn btn-primary btn-sm ml-3">
									<i className="fa fa-shopping-cart"></i> Cart
								</Link>
						</div>
					</div>
				</nav>
				<section className="jumbotron text-center">
					<div className="container">
						<h1 className="jumbotron-heading">YUMMY PIZZA STORE</h1>
					 </div>
				</section>
			</div>
        )
    }
}

export default Topbar;