import React, {Component} from 'react';
import { Link  , BrowserRouter, Redirect} from 'react-router-dom';
import '../../styles/home.css';

class Login extends Component {
	constructor(props) {
        super(props)
		console.log(this.state);
		this.onfetchdata = this.onfetchdata.bind(this);
	}
    
	state = {
		redirect: false,
	 }
	onfetchdata(e) {
        e.preventDefault();
   
        $.ajax({
			type: 'POST',
			url: '/public/api/checkuser',
			dataType: 'json',
			data: $('.checkoutform').serialize(),
			context: this,
			success: (data) => {
				console.log(data);
				if(data > 0){
					Cookies.set('userid', JSON.stringify(data));
					this.setState({ redirect: true });
				}else{
					alert(data);
				}
			},
			error: (xhr, status, error) => {
				console.error(this.props.url, status, error.toString());
			}
		});
    }
    render() {
		const { redirect } = this.state;
		 if (redirect) {
		   //console.log(redirect+"---"+JSON.parse(Cookies.get('userid')));
		   return <Redirect to="/OrderHistory/"/>
		 }
        return (
            <div className='wrapper'>
                <div className="container">
						<form className="checkoutform needs-validation">
							<div className="row">
								<div className="col-md-8 order-md-1">
									<div className="row">
									  <div className="col-md-6 mb-3">
										<label htmlFor="firstName">Username</label>
										<input type="text" className="form-control" id="username" name="username" placeholder="" defaultValue="" required />
										
									  </div>
									</div>
									<hr className="mb-4"></hr>
									<Link to='/ordered' className="btn btn-primary btn-lg btn-block"  onClick={this.onfetchdata}>Login</Link>
								</div>
							</div>
					</form>
				</div>
            </div>
        )
    }
}

export default Login;