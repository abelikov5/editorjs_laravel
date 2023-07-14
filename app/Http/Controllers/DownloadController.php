<?php

namespace App\Http\Controllers;

use App\Models\Dataset;
use App\Models\DatasetFinal;
use App\Models\DatasetLead;
use App\Models\DatasetSale;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Shuchkin\SimpleXLSXGen;
use Symfony\Component\HttpFoundation\JsonResponse;


class DownloadController extends Controller
{
    public function head() {
        return [
            'date'          => 'дата (перехода | списания | создания лида)',                            // 0  ДИРЕКТ
            'date_string'   => 'id кампании',                                                           // 1
            'campaign_id'   => 'id группы',                                                             // 2
            'device'        => 'устройство',                                                            // 3
            'cost'          => 'расход',                                                                // 4
            'click_position'=> 'трафик',                                                                // 5
            'clicks'        => 'позиция клика',                                                         // 6
            'leads'         => 'лиды вход',                                                             // 7
            'l_id' => 'id лида',                                                                        // 8   ЛИДЫ
            'l_qlt' => 'лиды кач',                                                                      // 9
            'l_utm_source' => 'utm source',                                                             // 10
            'l_utm_medium' => 'utm medium',                                                             // 11
            'l_utm_campaign' => 'utm campaign',                                                         // 12
            'l_utm_content' => 'utm content',                                                           // 13
            'l_utm_term' => 'utm term',                                                                 // 14
            'l_google_client_id' => 'google client id',                                                 // 15
            'l_metrika_client_id' => 'metrika client id',                                               // 16
            's_id' => 'id сделки',                                                                      // 17   СДЕЛКИ
            's_name' => 'сделка',                                                                       // 18
            's_amount' => 'выручка',                                                                    // 19
            's_date' => 'дата оплаты'                                                                   // 20
        ];
    }

    public function assoc_arr($arr) {
        return [
            'date'                  => Carbon::createFromFormat('d.m.Y', $arr[0]),    // 0  ДИРЕКТ
            'date_string'           => $arr[0] ??  null,     // 0
            'campaign_id'           => $arr[1] ??  null,     // 1
            'group_id'              => $arr[2] ??  null,     // 1
            'device'                => $arr[3] ??  null,     // 2
            'cost'                  => $arr[4] ??  null,     // 3
            'click_position'        => $arr[5] ??  null,     // 4
            'clicks'                => $arr[6] ??  null,     // 5
            'leads'                 => $arr[7] ??  null,     // 6
            'l_id'                  => $arr[8] ??  null,     // 7
            'l_qlt'                 => $arr[9] ??  null,     // 8   ЛИДЫ
            'l_utm_source'          => $arr[10] ??  null,     // 9
            'l_utm_medium'          => $arr[11] ?? null,     // 10
            'l_utm_campaign'        => $arr[12] ?? null,     // 11
            'l_utm_content'         => $arr[13] ?? null,     // 12
            'l_utm_term'            => $arr[14] ?? null,     // 13
            'l_google_client_id'    => $arr[15] ?? null,     // 14
            'l_metrika_client_id'   => $arr[16] ?? null,     // 15
            's_id'                  => $arr[17] ?? null,     // 16
            's_name'                => $arr[18] ?? null,     // 17   СДЕЛКИ
            's_amount'              => $arr[19] ?? null,     // 18
            's_date'                => $arr[20] ?? null      // 19

        ];
    }

    private function direct_utm_source_ref($campaign_id) {
        $obj = [
            84885948 => "yandex.poisk",
            84888494 => "yandex.master",
            85555843 => "yandex.rsy",
            85848502 => "yandex.rsy",
            86013946 => "yandex.poisk",
            85847823 => "yandex.poisk",
            85847834 => "yandex.poisk",
            85855895 => "yandex.rsy",
            86013985 => "yandex.poisk",
            85975527 => "yandex.master",
            85847807 => "yandex.poisk",
            50951971 => "yandex.rsy",
            87981285 => "yandex.rsy",
            87680985 => "yandex.master",
            86915847 => "yandex.master",
            52658833 => "yandex.poisk",
            61533205 => "yandex.poisk",
            87681265 => "yandex.master",
            89679802 => "yandex.rsy",
        ];

        return $obj[$campaign_id] ?? "undefined";
    }


    private function parse_direct($obj):array {
        return [
            $obj->date_string,
            $obj->campaign_id,
            $obj->group_id,
            $obj->device,
            $obj->cost,
            $obj->clicks,
            $obj->click_position,
            $obj->leads,
            null,
            null,
            $this->direct_utm_source_ref($obj->campaign_id),
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ];
    }
    private function parse_lead($obj):array {
        return [
            $obj->date_string,
            $obj->campaign_id,
            $obj->group_id,
            $obj->device,
            null,
            null,
            null,
            null,
            $obj->l_id, // лиды
            $obj->l_qlt,
            $obj->l_utm_source,
            $obj->l_utm_medium,
            $obj->l_utm_campaign,
            $obj->l_utm_content,
            $obj->l_utm_term,
            $obj->l_google_client_id,
            $obj->l_metrika_client_id,
            null,
            null,
            null,
            null,
        ];
    }

    private function parse_sale($obj):array {
        return [
            $obj->date_string,
            $obj->campaign_id,
            $obj->group_id,
            $obj->device,
            null,
            null,
            null,
            null,
            null,
            null,

            $obj->utm_source,
            $obj->utm_medium,
            $obj->utm_campaign,
            $obj->utm_content,
            $obj->utm_term,
            $obj->google_client_id,
            $obj->metrika_client_id,

            $obj->s_id,
            $obj->s_name,
            $obj->s_amount,
            $obj->s_date,
        ];
    }

    private function prepare_dataset():array {
        $res    = [];
        $res[]  = $this->head();

        foreach (Dataset::all() as $el) {
            $res[]  = $this->parse_direct($el);
        }
        foreach (DatasetLead::all() as $el) {
            $res[]  = $this->parse_lead($el);
        }
        foreach (DatasetSale::all() as $el) {
            $res[]  = $this->parse_sale($el);
        }

        return $res;
    }
    public function index(Request $r): JsonResponse
    {
        $xlsx   = new SimpleXLSXGen;

        $file = $xlsx::fromArray($this->prepare_dataset());
        $path = '/files/' . time() . '.xlsx';
        $file_path = public_path() . $path;

        $file->saveAs($file_path);

        return response()->json('https://www.' . env('APP_URL') . $path);
    }

    public function create_dataset_final() {
        $dataset = $this->prepare_dataset();
        $res = [];

        DatasetFinal::truncate();
        $i = 0;
        foreach ($dataset as $el) {
            if($i > 0) {
                $res[] = DatasetFinal::insert($this->assoc_arr($el));
//                $res[] =$el;
            }
            $i++;
        }
        return response()->json($res);
    }

}

