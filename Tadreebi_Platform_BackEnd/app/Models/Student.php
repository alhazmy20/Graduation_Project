<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use ShiftOneLabs\LaravelCascadeDeletes\CascadesDeletes;

class Student extends Model
{
    use HasFactory, SoftDeletes, CascadesDeletes;

    protected $fillable = [
        'id',
        'fName',
        'sName',
        'tName',
        'lName',
        'phone',
        'gender',
        'national_ID',
        'university',
        'college',
        'department',
        'major',
        'SCC',
        'GPA',
        'GPA_Type',
    ];

    protected $casts = ['national_ID' => 'string'];

    protected $cascadeDeletes = [
        'user',
        'applications',
        'studentFiles'
    ];
    protected $dates = ['deleted_at'];

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'id');
    }

    public function supervisor()
    {
        return $this->belongsTo(Supervisor::class);
    }

    public function applications()
    {
        return $this->hasMany(Application::class);
    }
    public function studentFiles()
    {
        return $this->hasOne(StudentFiles::class);
    }

    public function admins()
    {
        return $this->belongsToMany(Admin::class, 'admin_student')->withPivot('action');
    }
}
