<?php

namespace App\Http\Controllers;

use App\Models\Editor;
use http\Client\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use GuzzleHttp\Client;

class EditorController extends Controller
{
    public function api_nebo_sport($method, $pageId, $editorData, $active, $header, $slack) {

        $token  = 'XmgxkQ';
        $url    = "https://nebo-sport.ru/api/editor/";

        $client = new \GuzzleHttp\Client ();
        $resp = $client->request($method,
            $url, [
                'form_params' => [
                    'token'  => $token,
                    'pageId' => $pageId,
                    'editorData' => $editorData,
                    'active'     => $active,
                    'header'     => $header,
                    'slack'      => $slack,
                ],
                'verify' => false
            ]);

        return  $resp->getBody()->getContents();
    }


    private function host()
    {
        $whitelist = array('127.0.0.1', '::1', 'localhost');
        if (in_array($_SERVER['REMOTE_ADDR'], $whitelist)) {
            return;
        }
        return env('APP_URL');
    }

    public function preview(Request $r)
    {
        $page_id = $r->input('page_id');

        $data = Editor::where('pageId', $page_id)->get();
//        echo $data[0]->editorData;
//        return false; \response()->json($data[0]->editorData);

        $data = $data->toArray();
        if (isset($data[0])) {
            return view('prev', ['editorData' => $data[0]['editorData']]);
        }
        return view('404');
    }

    public function upload(Request $r)
    {
        $data = $r->all()[0]['blocks'];
        $page_id = $r->all()[1];

        $req = Editor::where('pageId', $page_id)->get();

        if (isset($req[0])) {
            Editor::where('pageId', $page_id)
                ->update([
                    'editorData' => json_encode($data),
                    'updated_at' => new \DateTime(),
                ]);

            $resp = $this->api_nebo_sport('POST', $page_id, json_encode($data), '', '', '');

            return response()->json('updated', 201);
        }
        if (isset($data)) {
            Editor::insert(array(
                'editorData' => json_encode($data),
                'created_at' => new \DateTime(),
                'pageId' => $page_id,
            ));

            $resp = $this->api_nebo_sport('POST', $page_id, json_encode($data), '', '', '');

            return response()->json('created', 201);

        }
        return response()->json('no data', 204);
    }

    public function uploadFile(Request $r)
    {

        if ($r->hasFile('image')) {
            $dest_path = 'public/img';
            $image = $r->file('image');
            $name = time() . '_' . $image->getClientOriginalName();
            $path = $r->file('image')->storeAs($dest_path, $name);

            $resp = new \stdClass();
            $resp->success = 1;
            $resp->file = new \stdClass();
            $resp->file->url = $this->host() . '/storage/img/' . $name;

            return response()->json($resp);
        }

    }

    public function delete(Request $r)
    {
        $token = $r->session()->token();
        $csrf = $r->input('csrf');
        $pageId = $r->input('pageId');
        if ($token === $csrf && isset($pageId)) {
            $res = Editor::where('pageId', $pageId)
                ->delete();
            $this->api_nebo_sport('DELETE', $pageId, '', '', '', '');
            if ($res === 1) {
                return response()->json(true);
            }
        }
        return \response()->json(false);
    }

    public function copy(Request $r)
    {
        $token = $r->session()->token();
        $csrf = $r->input('csrf');
        $pageId = $r->input('pageId');
        if ($token === $csrf && isset($pageId)) {
            $res = Editor::where('pageId', $pageId)->get()->toArray();
            if ($res[0]) {
                $insert = Editor::insert(array(
                    'editorData' => $res[0]['editorData'],
                    'created_at' => new \DateTime(),
                    'updated_at' => new \DateTime(),
                    'pageId' => 'c_' . $res[0]['pageId'],
                    'active' => 0,
                    'header' => 'copy_' . $res[0]['header'],
                ));

                $this->api_nebo_sport('POST', 'c_' . $res[0]['pageId'], $res[0]['editorData'], 0, 'copy_' . $res[0]['header'], '');


                return response()->json($insert);
            }
//                ->delete();
//            if (isset()) {

//            }
        }
        return \response()->json(false);
    }


    public function page_setup(Request $r)
    {
        $token = $r->session()->token();
        $csrf = $r->input('csrf');
        $pageId = $r->input('pageId');
        if ($token === $csrf && isset($pageId)) {
            $res = Editor::where('pageId', $pageId)
                ->update([
                    'active' => $r->input('active'),
                    'header' => $r->input('header'),
                    'slack'  => $r->input('slack'),
                ]);

            $this->api_nebo_sport('PUT', $pageId, false, $r->input('active'), $r->input('header'), $r->input('slack'));
            if ($res === 1) {
                return response()->json(true);
            }
        }
        return \response()->json(false);
    }
}
