<?php

namespace App\Http\Controllers;

use App\Models\Editor;
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

    public function home()
    {
        $data = Editor::latest('created_at')->first();
        if(isset($data)) {
            $data = $data->toArray();
            return view('home', ['pageId' => $data['pageId'], 'editorData' => $data['editorData']]);
        }
        return view('home', ['pageId' => '', 'editorData' => '']);

    }

    public function dashboard()
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
