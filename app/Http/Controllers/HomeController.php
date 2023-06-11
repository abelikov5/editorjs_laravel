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

    public function editor(Request $r): Renderable
    {
        if($r->input('pageId')) {
            $data = Editor::where('pageId', $r->input('pageId'))->first()->toArray();
            return view('editor', ['pageId' => $data['pageId'], 'editorData' => $data['editorData']]);
        }
        return view('editor', ['pageId' => '', 'editorData' => '']);
    }

    public function dashboard(): Renderable
    {
        if($this->check_role()) {
            return view('404');
        }
        $res = DB::table('editors')
            ->select('id','pageId', 'created_at', 'active', 'slack', 'header', 'folderId', 'updated_at')
            ->orderBy('updated_at', 'DESC')
            ->simplePaginate(25);
        return view('dashboard', [
            'data' => $res,
            'url' => env('BASE_URL'),
            'role' => Auth::user()->role,
        ]);
    }

    public function setup(Request $r)
    {
        if($this->check_role()) {
            return view('404');
        }
        $res = DB::table('editors')
            ->where('pageId', $r->input('pageId'))
            ->get()
            ->toArray();
        if(!isset($res[0])) {
            return response()->json(['PageId не задан или не корректен']);
        }
        return view('setup', [
            'data' => $res,
            'url' => env('BASE_URL'),
            'role' => Auth::user()->role,
        ]);
    }
}
