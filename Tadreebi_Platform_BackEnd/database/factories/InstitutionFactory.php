<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Institution>
 */
class InstitutionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $sectors = ['AA','BB'];
        $fields = ['AA','BB'];
        return [
            'institution_id' => fake()->unique()->numberBetween(1,10),
            'institutionName' => fake()->company(),
            'institutionSector' => Arr::random($sectors),
            'institutionField' => Arr::random($fields),
            'institutionPhone' => fake()->randomNumber(),
            'managerEmail' => fake()->unique()->email(),
            'managerPhone' => fake()->randomNumber(),
            'managerPosition' => fake()->jobTitle(),
            'fName' => fake()->firstName(),
            'lName' => fake()->lastName(),
            'isActive' => fake()->boolean(),
            'region' => fake()->country(),
            'city' => fake()->city(),
        ];
    }
}
