<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use ShiftOneLabs\LaravelCascadeDeletes\CascadesDeletes;

class Admin extends Model
{
    use HasFactory, SoftDeletes, CascadesDeletes;

    protected $fillable = [
        'id',
        'fName',
        'lName',
        'phone',
    ];
    protected $cascadeDeletes = ['user'];
    protected $dates = ['deleted_at'];

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'id');
    }
    public function news()
    {
        return $this->belongsToMany(News::class, 'admin_news')->withPivot('action');
    }

    public function post()
    {
        return $this->belongsToMany(Post::class, 'admin_post')->withPivot('action');
    }
    public function student()
    {
        return $this->belongsToMany(Student::class, 'admin_student')->withPivot('action');
    }
    public function institution()
    {
        return $this->belongsToMany(institution::class, 'admin_institution')->withPivot('action');
    }

    public function supervisor()
    {
        return $this->belongsToMany(Supervisor::class, 'admin_supervisor')->withPivot('action');
    }
}
