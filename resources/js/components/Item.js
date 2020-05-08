import React, {Component} from 'react';
import '../../styles/home.css';

class Item extends Component {

    state = {
        
    }

    // add or remove from cart
    toggleCart = (item) => {
        if (item.is_added)
            this.props.onRemoveFromCart(item);        
        else
            this.props.onAddToCart(item);
    }

    render() {
        const url = "/public/images/" + this.props.item.imageURL;
        return (
            <div className='col-md-4'>
                <div className="product-grid">
				<div className='crop'>
                    <img src={url} />
                </div>
                <h3 className="title">{this.props.item.name}, ${this.props.item.price} </h3>
                <div className='btn' onClick={() => this.toggleCart(this.props.item)}>
                    {this.props.item.is_added ? (
                        <button className="btn btn-danger">REMOVE</button>
                    ):(
                        <button className="btn btn-primary">ADD</button>
                    )}
                </div>
				</div>
            </div>
        )
    }
}

export default Item;