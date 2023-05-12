<?php

namespace App\Http\Controllers;

use App\Models\Editor;
use Illuminate\Http\Request;

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
    public function index()
    {
        return view('home');
    }
    public function home()
    {
        $data = Editor::latest('created_at')->first();
        if(isset($data)) {
            $data = $data->toArray();
            return view('home', ['pageId' => $data['pageId'], 'editorData' => $data['editorData']]);
        }
        return view('qq', ['pageId' => '', 'editorData' => '']);

    }
}
