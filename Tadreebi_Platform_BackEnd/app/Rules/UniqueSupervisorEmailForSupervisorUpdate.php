<?php

namespace App\Rules;

use App\Helpers\UserRole;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UniqueSupervisorEmailForSupervisorUpdate implements Rule
{
    private $supervisor;
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($supervisor)
    {
        $this->supervisor = $supervisor;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $isAuthAdmin = UserRole::isAdmin();
        $currentAuthEmail = Auth::user()->email;
        $currentSupervisorEmail = $this->supervisor->user->email;

        // If the authenticated user is an admin or the institution is updating with the same email,
        // or the admin is updating with the same email, then the validation passes.
        if (($isAuthAdmin && $currentAuthEmail === $value) || $currentSupervisorEmail === $value) {
            return true;
        }

        // Otherwise, perform a unique check on the email column in the users table.
        return DB::table('users')
            ->where('email', $value)
            ->where('id', '<>', $this->supervisor->id)
            ->doesntExist();
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'قيمة الحقل :attribute مستخدمة من قبل';
    }
}
