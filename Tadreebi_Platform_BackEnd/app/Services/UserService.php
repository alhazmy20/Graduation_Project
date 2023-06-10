<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserService
{
    public function store($email, $password)
    {
        $user = User::create([
            'email' => $email,
            'password' => Hash::make($password),
            'email_verified_at' => request()->is('api/admins') ? now() : null

        ]);
        request()->is('api/admins') ? null : $user->sendEmailVerificationNotification();
        return $user;
    }
    public function update($id, $email)
    {
        $user = User::where('id', $id)->update(['email' => $email]);
        return $user;
    }
}
