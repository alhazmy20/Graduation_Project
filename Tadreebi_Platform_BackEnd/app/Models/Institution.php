<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use ShiftOneLabs\LaravelCascadeDeletes\CascadesDeletes;

class Institution extends Model
{
    use HasFactory, SoftDeletes, CascadesDeletes;

    protected $fillable = [
        'id',
        'institutionName',
        'institutionSector',
        'institutionSummary',
        'institutionField',
        'institutionPhone',
        'managerEmail',
        'managerPhone',
        'managerPosition',
        'fName',
        'lName',
        'logo_filename',
        'logo_url',
        'isActive',
        'region',
        'city'
    ];
    protected $cascadeDeletes = ['user', 'posts'];

    protected $dates = ['deleted_at'];

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'id');
    }
    public function posts()
    {
        return $this->hasMany(Post::class);
    }
    public function admins()
    {
        return $this->belongsToMany(Admin::class, 'admin_institution')->withPivot('action');
    }
}
