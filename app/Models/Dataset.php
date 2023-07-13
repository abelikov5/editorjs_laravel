<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dataset extends Model
{
    protected $fillable = ['date','date_string', 'campaign_id', 'group_id', 'device', 'cost', 'click_position', 'clicks', 'leads'];


    use HasFactory;
}
