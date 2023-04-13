<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Status>
 */
class StatusFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            ['name' => 'بإنتظار موافقة المنشأة'],
            ['name' => 'بإنتظار تأكيد الطالب'],
            ['name' => 'مقبول'],
            ['name' => 'مرفوض'],
            ['name' => 'تم الغاء الطلب'],

        ];
    }
}
