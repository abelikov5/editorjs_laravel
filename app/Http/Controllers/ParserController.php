<?php

namespace App\Http\Controllers;

use App\Models\Dataset;
use App\Models\DatasetLead;
use App\Models\DatasetSale;
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
    private function get_device($str, $check = false) {
        $str = trim($str);
        if ($check) {
            if($str === 'desktop' || $str === 'mobile' || $str === 'tablet') {
                return $str;
            }
            return '';
        }
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

    public function data_parse($str, $payment = false):string {
        $str = trim($str);
        try {
            if($payment) {
                $str = explode(',', $str);
                if($str && count($str) > 1) {
                    $str = trim($str[count($str) - 1]);
                } else {
                    $str = trim($str[0]);
                }
            }
        } catch (Exception $e) {
            return 'ERRROR';
        }

        return explode(' ', $str)[0];
    }

    public function parse_direct($arr) {
        $res = [];
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
            $res[] = $el;
        }
        return $res;
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

    public function _filter($str):string {
        return intval($str) > 10 ? $str : '';
    }

    public function parse_lead($arr) {
        $res = [];
        foreach ($arr as $el) {
            $date           = $this->data_parse($el[3]);
            $group_id       = $this->parse_campaign($el[13]);
            $group_id       = $this->_filter($group_id);
            $campaign_id    = $this->parse_campaign($el[14]);
            $campaign_id    = $this->_filter($campaign_id);
            $device         = $this->parse_campaign($el[14], true);
            $device         = $this->get_device($device, true);

            DatasetLead::updateOrCreate([
                'l_id' => trim(intval($el[0]))
            ],[
                'date'                  => Carbon::createFromFormat('d.m.Y', $date),
                'date_string'           => $date,
                'campaign_id'           => $campaign_id,
                'group_id'              => $group_id,
                'device'                => $device,

                'l_qlt'                 => trim($el[2]),
                'l_utm_source'          => trim($el[12]),
                'l_utm_medium'          => trim($el[13]),
                'l_utm_campaign'        => trim($el[14]),
                'l_utm_content'         => trim($el[15]),
                'l_utm_term'            => trim($el[16]),
                'l_google_client_id'    => trim($el[39]),
                'l_metrika_client_id'   => trim($el[40]),

            ]);

            $res[] = $el;
        }
        return $res;
    }

    public function parse_sale($arr) {
        $res = [];
        foreach ($arr as $el) {
            $date           = $this->data_parse($el[10]);
            $sale_date      = $this->data_parse($el[11], true);
            $group_id       = $this->parse_campaign($el[20]);
            $group_id       = $this->_filter($group_id);
            $campaign_id    = $this->parse_campaign($el[21]);
            $campaign_id    = $this->_filter($campaign_id);
            $device         = $this->parse_campaign($el[21], true);
            $device         = $this->get_device($device, true);

            DatasetSale::updateOrCreate([
                's_id' => trim(intval($el[0]))
            ],[
                'date'                  => Carbon::createFromFormat('d.m.Y', $date),
                'date_string'           => $date,
                'campaign_id'           => $campaign_id,
                'group_id'              => $group_id,
                'device'                => $device,

                'utm_source'            => trim($el[19]),
                'utm_medium'            => trim($el[20]),
                'utm_campaign'          => trim($el[21]),
                'utm_content'           => trim($el[22]),
                'utm_term'              => trim($el[23]),
                'google_client_id'      => trim($el[24]),
                'metrika_client_id'     => trim($el[25]),


                's_date'                => $sale_date,                          // дата оплаты
                's_name'                => trim($el[14]),
                's_amount'              => intval(trim($el[8])),
            ]);

            $res[] = $el[0];
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

    public function get_type($str) {
        $params = array_map('trim', explode(';', $str));
        if (str_contains($params[0], 'Клиент Имя')) {
            return 'direct';
        }
        if(str_contains($params[1], 'Название лида')) {
            return 'lead';
        }
        if(str_contains($params[1], 'Название сделки')) {
            return 'sale';
        }
        return false;
    }

    public function uploadFile(Request $r)
    {
        ini_set('max_execution_time', 600);

        $file = $r->file('file');

        $rows = array_map('trim', file($file));

        $type = $this->get_type($rows[0]);

        if(!$type) {
            return response()->json(['message' => 'Тип документа не определен', 'type' => 'Error!'], 200);
        }

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
            $data = $this->parse_direct($data);
        }
        if ($type === 'lead') {
            $data = $this->parse_lead($data);
        }
        if ($type === 'sale') {
            $data = $this->parse_sale($data);
        }


        return response()->json([$type, $data, true]);
    }

}

