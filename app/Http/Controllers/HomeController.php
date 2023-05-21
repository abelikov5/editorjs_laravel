<?php

namespace App\Http\Controllers;

use App\Models\Editor;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
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
     * @return \Illuminate\Contracts\Support\Renderable
     */

    public function home(Request $r): Renderable
    {
        if($r->input('pageId')) {
            $data = Editor::where('pageId', $r->input('pageId'))->first()->toArray();
            return view('home', ['pageId' => $data['pageId'], 'editorData' => $data['editorData']]);
        }
        return view('home', ['pageId' => '', 'editorData' => '']);
    }

    public function dashboard(): Renderable
    {
        $res = DB::table('editors')
            ->select('id','pageId', 'created_at', 'active', 'slack', 'header', 'folderId')
            ->orderBy('id', 'DESC')
            ->simplePaginate(25);

//        return response()->json($res);

        return view('dashboard', [
            'data' => $res,
        ]);

//        return view('home', ['pageId' => '', 'editorData' => '']);

    }
}
