<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Order::factory(30)->create();

        foreach (Order::all() as $order) {
            $products = Product::inRandomOrder()->take(rand(1, 50))->pluck('id');
            $order->products()->attach($products);
        }
    }
}
