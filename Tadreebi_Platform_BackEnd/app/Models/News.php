<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class News extends Model
{
    use HasFactory,SoftDeletes;

    protected $fillable = [
    'title',
    'content',
    'logo_filename',
    'logo_url',
    ];
    protected $dates = ['deleted_at'];


    public function admins()
    {
        return $this->belongsToMany(Admin::class, 'admin_news')->withPivot('action');
    }
}
