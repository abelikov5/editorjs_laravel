<?php

namespace App\Http\Controllers;

use App\Models\Dataset;
use App\Models\DatasetLead;
use App\Models\DatasetSale;

use Illuminate\Http\Request;



class CleanController extends Controller
{
    public function index($type): \Illuminate\Http\JsonResponse
    {
        if($type === 'sale') {
            DatasetSale::truncate();
            return response()->json($type, 200);
        }
        if($type === 'direct') {
            Dataset::truncate();
            return response()->json($type, 200);
        }
        if($type === 'lead') {
            DatasetLead::truncate();
            return response()->json($type, 200);
        }
        return response()->json(["message" => 'error! Тип базы данных не найден'], 404);

    }
};



