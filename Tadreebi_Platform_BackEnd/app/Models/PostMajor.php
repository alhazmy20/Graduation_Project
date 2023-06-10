<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PostMajor extends Model
{
    use HasFactory,SoftDeletes;

    protected $fillable = [
        'post_id',
        'major',
        'SCC'
    ];

    public function post(){
        return $this->belongsTo(Post::class);
    }
}
