<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use ShiftOneLabs\LaravelCascadeDeletes\CascadesDeletes;

class Post extends Model
{
    use HasFactory, SoftDeletes, CascadesDeletes;

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
    protected $cascadeDeletes = ['postMajors', 'applications'];
    protected $dates = ['deleted_at'];

    public function institution()
    {
        return $this->belongsTo(Institution::class);
    }
    public function postMajors()
    {
        return $this->hasMany(PostMajor::class);
    }

    public function applications()
    {
        return $this->hasMany(Application::class);
    }
    public function admins()
    {
        return $this->belongsToMany(Admin::class, 'admin_post')->withPivot('action');
    }

    public function scopeRemainingTime()
    {
        $p_endDate = Carbon::parse($this->p_endDate, 'Asia/Riyadh');
        $diff = $p_endDate->diff(Carbon::now('Asia/Riyadh'));
        switch ($diff) {
            case $this->p_endDate <= Carbon::now()->addDay()->format('Y-m-d'):
                return 'منتهي';
            case $diff->days == 0 && $diff->h == 0 && $diff->i == 1:
                return 'متبقي دقيقة واحدة';
            case $diff->days == 0 && $diff->h == 0 && $diff->i == 2;
                return 'متبقي دقيقتين ';
            case $diff->days == 0 && $diff->h == 0 && $diff->i > 2 && $diff->i <= 10:
                return 'متبقي ' . $diff->i . ' دقائق';
            case $diff->days == 0 && $diff->h == 0 && $diff->i > 10:
                return 'متبقي ' . $diff->i . ' دقيقة';
            case $diff->days == 0 && $diff->h == 1;
                return 'متبقي ساعة';
            case $diff->days == 0 && $diff->h == 2:
                return 'متبقي ساعتين';
            case $diff->days == 0 && $diff->h <= 10:
                return 'متبقي ' . $diff->h . ' ساعات';
            case $diff->days == 0 && $diff->h > 10:
                return 'متبقي ' . $diff->h . ' ساعة';
            case $diff->days == 1:
                return 'متبقي يوم واحد';
            case $diff->days == 2:
                return 'متبقي يومين';
            case $diff->days > 2 && $diff->days <= 10:
                return 'متبقي ' . $diff->days . ' أيام';
            case $diff->days > 10:
                return 'متبقي ' . $diff->days . ' يوم';
        }
    }
}
