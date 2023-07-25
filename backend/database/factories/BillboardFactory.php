<?php

namespace Database\Factories;

use App\Models\Store;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Billboard>
 */
class BillboardFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => Str::uuid(),
            'store_id' => Store::inRandomOrder()->first()->id,
            'label' => $this->faker->sentence,
            'img_url' => $this->faker->imageUrl(),
        ];
    }
}
