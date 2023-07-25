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
        Schema::create('products', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('store_id')
                ->constrained('stores')
                ->cascadeOnDelete();
            $table->foreignUuid('category_id')
                ->constrained('categories')
                ->cascadeOnDelete();
            $table->string('name');
            $table->decimal('price', 10, 2);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_archived')->default(false);
            $table->foreignUuid('size_id')
                ->constrained('sizes')
                ->cascadeOnDelete();
            $table->foreignUuid('color_id')
                ->constrained('colors')
                ->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
