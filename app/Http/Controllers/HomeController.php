<?php

namespace App\Http\Controllers;

use App\Models\Editor;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return false
     */

    public function check_role() {

        if(Auth::user()->role != 'admin' && Auth::user()->role != 'marketing') {
//            dd(Auth::user()->role );
            return true;
        }
        return false;
    }


    public function dashboard(): Renderable
    {
        if($this->check_role()) {
            return view('404');
        }
//        $res = DB::table('editors')
//            ->select('id','pageId', 'created_at', 'active', 'slack', 'header', 'folderId', 'updated_at')
//            ->orderBy('updated_at', 'DESC')
//            ->simplePaginate(25);
        return view('dashboard', [
            'role' => Auth::user()->role,
            "direct" => DB::table('datasets')->count(),
            "lead" => DB::table('dataset_leads')->count(),
            "sale" => DB::table('dataset_sales')->count(),
        ]);
    }
}
