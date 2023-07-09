<?php

namespace App\Http\Controllers;

use App\Models\Dataset;
use App\Models\Editor;
use Carbon\Carbon;
use http\Client\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Storage;

class ParserController extends Controller
{
    private function host()
    {
        $whitelist = array('127.0.0.1', '::1', 'localhost');
        if (in_array($_SERVER['REMOTE_ADDR'], $whitelist)) {
            return;
        }
        return env('APP_URL');
    }

    public function qq() {
//        $direct = Dataset::where('date_string', '17.03.2023')
//                    ->where('campaign_id', '84885948')
//            ->get();
//
//        return \response()->json($direct);
    }
    private function get_device($str) {
        $str = trim($str);
        if($str === 'десктоп') {
            return 'desktop';
        }
        if($str === 'мобильные') {
            return 'mobile';
        }
        if($str === 'планшеты') {
            return 'tablet';
        }

        return 'undefined ' . $str;
    }

    private function count_leads($arr): int {
        $start_lead = 10;
        $res = 0;

        for($i = $start_lead; $i < count($arr); $i++) {
            if(intval($arr[$i])) {
                $res++;
            }
        }

        return $res;

    }

    public function data_parse($str):string {
        $str = trim($str);
        return explode(' ', $str)[0];
    }

    public function parse_direct($arr) {
        foreach ($arr as $el) {
            Dataset::updateOrCreate([
                    'date_string'   => $this->data_parse($el[0]),
                    'campaign_id'   => trim($el[2]),
                    'group_id'      => trim($el[4]),
                    'device'        => trim($this->get_device($el[5])),
                ], [
                    'click_position'    => trim(floatval( str_replace(',', '.', $el[9]))),
                    'leads'             => trim($this->count_leads($el)),
                    'date'              => Carbon::createFromFormat('d.m.Y', $el[0]),
                    'cost'              => trim(floatval(str_replace(',', '.', $el[8]))),
                    'clicks'            => trim($el[7])
                ]
            );
        }
    }

    public function parse_campaign($str, $device = false) {
        $str = trim($str);
        $str = explode('_', $str);
        if($str && count($str) > 2) {
            if($device) {
                return $str[count($str) - 1];
            }
            $tmp = intval($str[count($str) - 2]);
            if($tmp) {
                return $str[count($str) - 2];
            }
            return $str[count($str) - 1];
        }
        return false;
    }

    public function parse_lead($arr) {
        $res = [];
        foreach ($arr as $el) {
//            $res[] = $el;
            $tmp = Dataset::where('l_id', trim(intval($el[0])))->first();
            if(empty($tmp)) {

                $campaign = $this->parse_campaign($el[14]);
                $group    = $this->parse_campaign($el[13]);
                $date     = $this->data_parse($el[3]);
                $device   = $this->parse_campaign($el[14], true);

                $res[] = [trim(intval($el[0])), $campaign, $group, $date, $device];


                $direct = Dataset::where('date_string', $date)
                    ->where('campaign_id', $campaign)
                    ->where('clicks', '>', 0)
                    ->where('group_id', $group)
                    ->where('device', $device)
                    ->get();

                if($direct && count($direct)) {


                        $direct[0]->l_id                = trim($el[0]);
                        $direct[0]->l_qlt               = trim($el[2]);
                        $direct[0]->l_utm_source        = trim($el[12]);
                        $direct[0]->l_utm_medium        = trim($el[13]);
                        $direct[0]->l_utm_campaign      = trim($el[14]);
                        $direct[0]->l_utm_content       = trim($el[15]);
                        $direct[0]->l_utm_term          = trim($el[16]);

                        $direct[0]->l_google_client_id  = trim($el[39]);
                        $direct[0]->l_metrika_client_id = trim($el[40]);

                        $direct[0]->save();


                } else {
//                    $res[] = ['элемент не найден', $el, [$campaign, $group, $date, $device]];
                }


//                $res[] = $direct;
            }

        }
        return $res;
    }
    public function array_shift_num($type, $rows) {
        $num = $type === 'direct' ? 5 : 1;
        for($i = 0; $i < $num; $i++) {
            array_shift($rows);
        }
        return $rows;

    }

    public function uploadFile(Request $r)
    {
        ini_set('max_execution_time', 600);

        $file = $r->file('file');
        $type = $_POST['type'];

        $rows = array_map('trim', file($file));

        $rows = $this->array_shift_num($type, $rows);

        $data = [];

        foreach ($rows as $row) {
            $params = array_map('trim', explode(';', $row));
            $res = [];
            foreach ($params as $el) {
                $el = str_replace('\\', '', $el);
                $el = str_replace('"', '', $el);
                $res[] = $el;
            }
            $data[] = $res ;
        }



        if($type === 'direct') {
            $this->parse_direct($data);
        }
        if ($type === 'lead') {
            $data = $this->parse_lead($data);
        }

//        return response()->json($type);

        return response()->json([$type, $data]);
    }

}

