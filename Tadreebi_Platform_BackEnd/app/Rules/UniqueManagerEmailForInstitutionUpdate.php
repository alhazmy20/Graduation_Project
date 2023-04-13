<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UniqueManagerEmailForInstitutionUpdate implements Rule
{
    private $institution;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($institution)
    {
        $this->institution = $institution;
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
        $isAuthAdmin = Auth::user()->hasRole('Admin');
        $currentManagerEmail = $this->institution->managerEmail;

        // Check if the authenticated user is an admin and email being updated is the same as the current manager email
        if ($isAuthAdmin && $currentManagerEmail === $value) {
            return true;
        }

        // Check if the email exists in the institutions table (excluding the current institution being updated)
        return !DB::table('institutions')
            ->where('managerEmail', $value)
            ->where('id', '<>', $this->institution->id)
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
