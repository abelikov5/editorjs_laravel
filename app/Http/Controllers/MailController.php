<?php

namespace App\Http\Controllers;

use App\Mail\NewPageInform;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
    public function PageInform() {

        Mail::to('abelikov@inbox.ru')->send(new NewPageInform());
        return response()->json(true);
    }
}
