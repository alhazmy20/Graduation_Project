<?php

namespace App\Traits;

use Svnwa\LaravelStrapi\Facades\Strapi;


trait UniversitiyAPI
{
    public function UniversityAPI($university, $email, $collection)
    {
        switch ($university) {
            case 'جامعة طيبة':
                $user = Strapi::collection($collection)->filterBy([['[email]', $email],])->get();
                return !empty($user['data'][0]['attributes']) ? $user : false;
            case 'الجامعة الإسلامية':
                $user = Strapi::collection($collection)->filterBy([['[email]', $email],])->get();
                return !empty($user['data'][0]['attributes']) ? $user : false;
            default:
                return false;
        }
    }
}
