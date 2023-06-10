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
            ['name' => 'بإنتظار موافقة المشرف الجامعي'],
            ['name' => 'بإنتظار موافقة الطالب'],
            ['name' => 'مقبول'],
            ['name' => 'تم الرفض من قبل المنشأة'],
            ['name' => 'تم الرفض من قبل المشرف الجامعي'],
            ['name' => 'تم الرفض من قبل الطالب'],
            ['name' => 'تم الغاء الطلب من قبل النظام'],
        ];
    }
}
