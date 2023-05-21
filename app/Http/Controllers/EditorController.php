<?php

namespace App\Http\Controllers;

use App\Models\Editor;
use http\Client\Response;
use Illuminate\Http\Request;

class EditorController extends Controller
{
    public function preview(Request $r)
    {
        $page_id = $r->input('page_id');

        $data = Editor::where('pageId', $page_id)->get();
//        echo $data[0]->editorData;
//        return false; \response()->json($data[0]->editorData);

        $data = $data->toArray();
        if(isset($data[0])) {
            return view('prev', ['editorData' => $data[0]['editorData']]);
        }
        return view('404');
    }

    public function upload(Request $r)
    {
        $data       = $r->all()[0]['blocks'];
        $page_id    = $r->all()[1];

        $req = Editor::where('pageId', $page_id)->get();



        if(isset($req[0])) {
            Editor::where('pageId', $page_id)
                ->update([
                        'editorData' => json_encode($data),
                        'updated_at' => new \DateTime(),
                    ]);

            return response()->json('updated', 201);
        }
        if(isset($data)) {
            Editor::insert(array(
                'editorData' => json_encode($data),
                'created_at' => new \DateTime(),
                'pageId' => $page_id,
            ));
            return response()->json('created', 201);

        }
        return response()->json('no data', 204);
    }

    public function uploadFile(Request $r) {

        if($r->hasFile('image')) {
            $dest_path  = 'public/img';
            $image      = $r->file('image');
            $name       = time() . '_' . $image->getClientOriginalName();
            $path       = $r->file('image')->storeAs($dest_path, $name);

            $resp = new \stdClass();
            $resp->success = 1;
            $resp->file = new \stdClass();
            $resp->file->url = env('APP_URL'). '/storage/img/' . $name;

            return response()->json($resp);
        }

    }

    public function delete(Request $r) {
        $token  = $r->session()->token();
        $csrf   = $r->input('csrf');
        $pageId = $r->input('pageId');
        if($token === $csrf && isset($pageId)) {
            $res = Editor::where('pageId', $pageId)
                ->delete();
            if($res === 1) {
                return response()->json(true);
            }
        }
        return \response()->json(false);
    }
}
