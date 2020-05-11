<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{
	protected $fillable = ['userid', 'address', 'address2', 'country','state','zip','payment_mode','cartdata'];
}
