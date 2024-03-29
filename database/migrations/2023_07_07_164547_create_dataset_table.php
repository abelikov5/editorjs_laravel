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
        Schema::create('datasets', function (Blueprint $table) {

            // директ
            $table->id();
            $table->date('date')->nullable();
            $table->string('date_string')->nullable();
            $table->string('campaign_id')->nullable();
            $table->string('group_id')->nullable();
            $table->string('device')->nullable();
            $table->float('cost')->nullable();
            $table->float('click_position')->nullable();
            $table->integer('clicks')->nullable();
            $table->integer('leads')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dataset');
    }
};
