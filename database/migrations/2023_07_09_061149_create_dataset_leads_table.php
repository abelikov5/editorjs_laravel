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
        Schema::create('dataset_leads', function (Blueprint $table) {
            $table->id();
            $table->date('date')->nullable();
            $table->string('date_string')->nullable();
            $table->string('campaign_id')->nullable();
            $table->string('group_id')->nullable();
            $table->string('device')->nullable();
            // лиды
            $table->integer('l_id')->nullable();                //id лида
            $table->string('l_qlt')->nullable();                //лиды кач
            $table->string('l_utm_source')->nullable();         //utm source
            $table->string('l_utm_medium')->nullable();         //utm medium
            $table->string('l_utm_campaign')->nullable();       //utm campaign
            $table->string('l_utm_content')->nullable();        //utm content
            $table->string('l_utm_term')->nullable();           //utm term
            $table->string('l_google_client_id')->nullable();   //google client id
            $table->string('l_metrika_client_id')->nullable();  //metrika client id
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dataset_leads');
    }
};
