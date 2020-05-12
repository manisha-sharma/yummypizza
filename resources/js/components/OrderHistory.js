import React, {Component} from 'react';
import { Link} from 'react-router-dom';
import '../../styles/home.css';

class OrderHistory extends Component {
    
	constructor(props) {
        super(props);
    }

    state = {
        orderdata: []
	}
	 componentDidMount () {
	 console.log(Cookies.get('userid'));
	 
	$.ajax({
		type: 'POST',
		url: '/api/orderhistory',
		dataType: 'json',
		data:{'userid':JSON.parse(Cookies.get('userid'))},
		context: this,
		success: (data) => {
			console.log(data);
			jQuery('#showdata').html(data);
			//this.setState({ orderdata: data })
		},
		error: (xhr, status, error) => {
			console.error(this.props.url, status, error.toString());
		}
	 });
	 }
    render() {
		if(this.state.orderdata){
			console.log(this.state.orderdata);
			const orderdata = this.state.orderdata;
			{orderdata.map((item, idx) => {
					return (
						<div>{item.id}</div>
					)
				})}	
        }
		return (
            <div className='wrapper'>
                <div className="row">
					<div className="col-md-12" id="showdata">
					</div>
				</div>
            </div>
        )
    }
}

export default OrderHistory;