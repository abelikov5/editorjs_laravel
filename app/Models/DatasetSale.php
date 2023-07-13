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
        's_id',
        's_date',
        's_name',
        's_amount',
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'utm_content',
        'utm_term',
        'google_client_id',
        'metrika_client_id',
        ];

    use HasFactory;

    protected $table = 'dataset_sales';
}
