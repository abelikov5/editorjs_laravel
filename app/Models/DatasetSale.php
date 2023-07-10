<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DatasetSale extends Model
{
    protected $fillable = [
        'date',
        'date_string',
        'campaign_id',
        'group_id',
        'device',
        ];

    use HasFactory;

    protected $table = 'dataset_sales';
}
