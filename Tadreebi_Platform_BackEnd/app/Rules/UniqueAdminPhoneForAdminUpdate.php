<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\DB;


class UniqueAdminPhoneForAdminUpdate implements Rule
{
    private $admin;
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($admin)
    {
        $this->admin = $admin;
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
        return !DB::table('admins')
        ->where('phone', $value)
        ->where('id', '<>', $this->admin->id)
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
