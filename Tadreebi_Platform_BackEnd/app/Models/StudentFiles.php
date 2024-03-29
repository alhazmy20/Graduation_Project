<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class StudentFiles extends Model
{
    use HasFactory,SoftDeletes;

    protected $fillable = [
        'student_id',
        'transcript_filename',
        'transcript_url',
        'CV_filename',
        'CV_url',
        'internshipLetter_filename',
        'internshipLetter_url',
        'nationalID_filename',
        'nationalID_url',
        'personalPicture_filename',
        'personalPicture_url'
    ];
    public function student()
    {
        return $this->belongsTo(Student::class);
    }
    public function scopeHasEmptyFiles(): bool
    {
        $requiredFields = ['transcript_url', 'internshipLetter_url','CV_url'];
        foreach ($requiredFields as $field) {
            if (empty($this->$field)) {
                return true;
            }
        }
        return false;
    }
}
