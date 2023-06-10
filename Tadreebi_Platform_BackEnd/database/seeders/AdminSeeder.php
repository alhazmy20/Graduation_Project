<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Services\UserService;

use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $userService = new UserService();
        $user = $userService->store('a@a.com', 'Az123456');
        $user->assignRole('Admin');
        $user->update(['email_verified_at' => now()]);
        Admin::create([
            'id' => $user->id,
            'fName' => 'a',
            'lName' => 'a',
            'phone' => '0000000000',
        ]);
    }
}
