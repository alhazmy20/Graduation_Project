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
        ]);
        $user->sendEmailVerificationNotification();
        return $user;
    }
    public function update($id, $email)
    {
        User::where('id', $id)->update(['email' => $email]);
    }

    public function destroy($id)
    {
        $user = User::where('id', $id)->delete();
        return $user;
    }
}
