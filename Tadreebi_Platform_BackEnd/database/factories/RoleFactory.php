<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Spatie\Permission\Models\Role;
 */
class RoleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
           ['name' => 'Admin'],
           ['name' => 'Institution'],
           ['name' => 'Student'],
           ['name' => 'Supervisor'],
        ];
    }
}
