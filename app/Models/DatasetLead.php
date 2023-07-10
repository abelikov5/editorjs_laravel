<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DatasetLead extends Model
{
    protected $fillable = [
        'date',
        'date_string',
        'campaign_id',
        'group_id',
        'device',
        'l_id',
        'l_qlt',
        'l_utm_source', 'l_utm_medium', 'l_utm_campaign', 'l_utm_content', 'l_utm_term',
        'l_google_client_id', 'l_metrika_client_id'];

    use HasFactory;

    protected $table = 'dataset_leads';
}
