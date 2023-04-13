<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Admin extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'id',
        'fName',
        'lName',
        'phone',
    ];

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
}
