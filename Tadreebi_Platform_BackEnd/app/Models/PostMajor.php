<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostMajor extends Model
{
    use HasFactory;

    protected $fillable = [
        'post_id',
        'major',
        'SCC'
    ];

    public function post(){
        return $this->belongsTo(Post::class);
    }
}
