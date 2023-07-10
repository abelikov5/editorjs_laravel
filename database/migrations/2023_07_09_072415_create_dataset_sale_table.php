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
            $table->string('date_string')->nullable();
            $table->string('campaign_id')->nullable();
            $table->string('group_id')->nullable();
            $table->string('device')->nullable();
            // сделки
            $table->integer('s_id')->nullable();                    // id сделки
            $table->date('s_date')->nullable();                     // дата оплаты
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
