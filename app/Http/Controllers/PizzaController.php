<?php

namespace App\Http\Controllers;

use App\Pizza;
use App\Orders;
use App\Users;
use Illuminate\Http\Request;

class PizzaController extends Controller {
    // get all pizzas from db
    public function index() {
        $pizzas = Pizza::orderBy('id', 'asc')->get();
        return $pizzas->toJson();
    }

    // change the is_added to true
    public function markAsAdded(Pizza $pizza) {
        $pizza->is_added = true;
        $pizza->update();
        return response()->json('Pizza updated!');
    }

    // change the is_added to false
    public function unmarkAsAdded(Pizza $pizza) {
        $pizza->is_added = false;
        $pizza->update();
        return response()->json('Pizza updated!');
    }
	
	public function orderpizza(Request $request){
		
		$firstName = $request->firstName;
		$lastName = $request->lastName;
		$username = $request->username;
		$email = $request->email;
		$address = $request->address;
		$address2 = $request->address2;
		$country = $request->country;
		$state = $request->state;
		$zip = $request->zip;
		$cartdata = $_COOKIE['cart_array'];
		
		$user = Users::firstOrCreate([
			'username' => $username
		], [
			'firstname' => $firstName,
			'lastname'  => $lastName,
			'email'	    => $email,
		]);
		$userid = $user->id;
		
		//echo "user id is ".$userid;
		
		$order = new Orders;
		$order->userid = $userid;
		$order->cartdata = $cartdata;
		$order->address = $address;
		$order->address2 = $address2;
		$order->country = $address;
		$order->state = $address;
		$order->zip = $address;
		$order->payment_mode = $address;
		$order->save();
		$orderid = $order->id;
		setcookie('orderid', $orderid, 0);
		return response()->json(1);
		
	}
	
	public function checkuser(Request $request){
		$username = $request->username;
		$user = Users::select('id')->where('username', '=',$username)->first();
		if(!empty($user->id)){
			$userid = $user->id;
			//$order = Orders::where('userid','=',$userid)->get();
			return response()->json($userid);
		}else{
			return response()->json('Username not found!');
		}
	}
	
	public function orderhistory(Request $request){
		$userid = $request->userid;
		$user = Users::where('id','=',$userid)->first();
		//echo $user->firstname;
		$html = '<table class="table">
					<thead>
					  <tr>
						<th>Firstname</th>
						<th>Lastname</th>
						<th>Email</th>
						<th>Username</th>
					  </tr>
					</thead>
					<tbody>
					  <tr>
						<td>'.$user->firstname.'</td>
						<td>'.$user->lastname.'</td>
						<td>'.$user->email.'</td>
						<td>'.$user->username.'</td>
					  </tr>
					</tbody>
				  </table>';
		$order = Orders::where('userid','=',$userid)->get();
		$html .= '<table class="table">
					<thead>
					  <tr>
						<th>Orderid</th>
						<th>Addres</th>
						<th>Country</th>
						<th>State</th>
						<th>Zip</th>
						<th>Payment Mode</th>
					  </tr>
					</thead>
					<tbody>';
		foreach($order as $orderdata){
			$html .= '
					  <tr>
						<td>'.$orderdata->id.'</td>
						<td>'.$orderdata->address.'</td>
						<td>'.$orderdata->country.'</td>
						<td>'.$orderdata->state.'</td>
						<td>'.$orderdata->zip.'</td>
						<td>COD</td>
					  </tr>';
		}
		$html .= '  </tbody>
				  </table>';
		return response()->json($html);
	}

}
