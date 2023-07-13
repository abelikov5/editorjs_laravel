<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('dataset_sales', function (Blueprint $table) {
            $table->id();
            $table->date('date')->nullable();
            $table->string('date_string')->nullable();
            $table->string('campaign_id')->nullable();
            $table->string('group_id')->nullable();
            $table->string('device')->nullable();

            // лиды
            $table->string('utm_source')->nullable();               //utm source
            $table->string('utm_medium')->nullable();               //utm medium
            $table->string('utm_campaign')->nullable();             //utm campaign
            $table->string('utm_content')->nullable();              //utm content
            $table->string('utm_term')->nullable();                 //utm term
            $table->string('google_client_id')->nullable();         //google client id
            $table->string('metrika_client_id')->nullable();        //metrika client id

            // сделки
            $table->integer('s_id')->nullable();                    // id сделки
            $table->string('s_date')->nullable();                   // дата оплаты
            $table->string('s_name')->nullable();                   // название сделки
            $table->integer('s_amount')->nullable();                // выручка

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dataset_sales');
    }
};
