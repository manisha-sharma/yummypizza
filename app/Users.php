<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class users extends Model
{
    protected $fillable = ['firstname', 'lastname', 'username', 'email'];
}
