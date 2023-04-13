<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Student extends Model
{
    use HasFactory, SoftDeletes;

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
        'major',
        'SCC',
        'GPA',
        'GPA_Type',
    ];

    protected $dates = ['deleted_at'];

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'id');
    }

    public function studentFiles()
    {
        return $this->hasOne(StudentFiles::class);
    }

    public function admins(){
        return $this->belongsToMany(Admin::class, 'admin_student')->withPivot('action');
    }
}
