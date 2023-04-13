<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'institution_id',
        'title',
        'content',
        't_type',
        'reward',
        'gender',
        'region',
        'city',
        't_startDate',
        't_endDate',
        'p_endDate',
    ];

    protected $dates = ['deleted_at'];

    public function institution()
    {
        return $this->belongsTo(Institution::class);
    }
    public function postMajors()
    {
        return $this->hasMany(PostMajor::class);
    }

    public function applications(){
        return $this->hasMany(Application::class);
    }
    public function admins()
    {
        return $this->belongsToMany(Admin::class, 'admin_post')->withPivot('action');
    }
}
