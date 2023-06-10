<?php

namespace App\Rules;

use App\Helpers\UserRole;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\DB;

class UniqueSupervisorPhoneForSupervisorUpdate implements Rule
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
        $currentStudentPhone = $this->supervisor->phone;

        // Check if the authenticated user is an admin and email being updated is the same as the current student phone
        if ($isAuthAdmin && $currentStudentPhone === $value) {
            return true;
        }

        // Check if the email exists in the institutions table (excluding the current institution being updated)
        return !DB::table('supervisors')
            ->where('phone', $value)
            ->where('id', '<>', $this->supervisor->id)
            ->exists();
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
