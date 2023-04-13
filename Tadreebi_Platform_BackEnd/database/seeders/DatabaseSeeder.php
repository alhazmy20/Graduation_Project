<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Institution;
use App\Models\User;
use App\Models\Status;
use Spatie\Permission\Models\Role;


use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // User::factory(10)->create();
        // Status::factory(2)->create();

        // Institution::factory(10)->create();

        $this->call(StatusSeeder::class);
        $this->call(RoleSeeder::class);
        $this->call(AdminSeeder::class);
        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
