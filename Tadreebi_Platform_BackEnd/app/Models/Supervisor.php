<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use ShiftOneLabs\LaravelCascadeDeletes\CascadesDeletes;

class Supervisor extends Model
{
    use HasFactory, SoftDeletes, CascadesDeletes;
    protected $fillable = [
        'id',
        'university',
        'college',
        'department',
        'major',
        'section'
    ];

    protected $casts = ['section' => 'string'];

    protected $cascadeDeletes = ['user'];

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'id');
    }

    public function students()
    {
        return $this->hasMany(Student::class);

    }

    public function admins()
    {
        return $this->belongsToMany(Admin::class, 'admin_supervisor')->withPivot('action');
    }

}
