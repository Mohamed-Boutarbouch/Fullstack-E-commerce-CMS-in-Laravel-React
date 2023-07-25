<?php

namespace Database\Factories;

use App\Models\Store;
use App\Models\Billboard;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
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
            'billboard_id' => Billboard::inRandomOrder()->first()->id,
            'name' => $this->faker->word,
        ];
    }
}
