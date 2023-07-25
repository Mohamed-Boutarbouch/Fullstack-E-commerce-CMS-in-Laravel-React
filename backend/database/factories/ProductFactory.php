<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Color;
use App\Models\Size;
use App\Models\Store;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
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
            'store_id' => fn () => Store::inRandomOrder()->first()->id,
            'category_id' => fn () => Category::inRandomOrder()->first()->id,
            'name' => $this->faker->word,
            'price' => $this->faker->randomFloat(2, 10, 1000),
            'is_featured' => $this->faker->boolean,
            'is_archived' => $this->faker->boolean,
            'size_id' => fn () => Size::inRandomOrder()->first()->id,
            'color_id' => fn () => Color::inRandomOrder()->first()->id,
        ];
    }
}
