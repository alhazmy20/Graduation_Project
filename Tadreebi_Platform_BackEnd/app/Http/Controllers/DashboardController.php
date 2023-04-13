<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Institution;
use App\Models\Post;
use App\Models\Student;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    use HttpResponses;

    public function cardsStatistics()
    {
        return $this->success([
            'total_users' => User::withoutTrashed()->count(),
            'new_students' => $this->getWeeklyStatistics(Student::class),
            'new_applications' => $this->getWeeklyStatistics(Application::class),
            'new_institutions' => $this->getWeeklyStatistics(Institution::class),
            'unactive_institutions' => Institution::where('isActive', 0)->count(),
            'new_posts' => $this->getWeeklyStatistics(Post::class),
        ]);
    }

    public function getWeeklyStatistics($model)
    {
        $currentWeekStart = now()->startOfWeek();
        $currentWeekEnd = now()->endOfWeek();

        $currentWeekStudentsCount = $model::whereBetween('created_at', [$currentWeekStart, $currentWeekEnd])
            ->count();

        $previousWeekStart = now()->subWeek()->startOfWeek();
        $previousWeekEnd = now()->subWeek()->endOfWeek();

        $previousWeekStudentsCount = $model::whereBetween('created_at', [$previousWeekStart, $previousWeekEnd])
            ->count();

        if ($previousWeekStudentsCount > 0) {
            $percentageDifference = ($currentWeekStudentsCount - $previousWeekStudentsCount) / $previousWeekStudentsCount * 100;
        } else {
            $percentageDifference = 0;
        }
        return [
            'current_week_count' => $currentWeekStudentsCount,
            'percentage_difference' => $percentageDifference . '%'
        ];
    }
    public function chartStatistics(Request $request)
    {
        $requestedYear = $request->input('year');

        // Total students in each university for all years
        $studentsByUniversity = Student::select(DB::raw('count(*) as total_students, university, YEAR(created_at) as year'))
            ->whereYear('created_at', '=', $requestedYear)
            ->groupBy('year', 'university')
            ->get();

        // Total applications in each university for all years
        $applicationsByUniversity = Application::select(DB::raw('count(*) as total_applications, students.university, YEAR(applications.created_at) as year'))
            ->join('students', 'students.id', '=', 'applications.student_id')
            ->whereYear('applications.created_at', '=', $requestedYear)
            ->groupBy('year', 'students.university')
            ->get();

        // Combine the results by year and university
        $results = collect();
        $years = array_unique(array_merge($studentsByUniversity->pluck('year')->toArray(), $applicationsByUniversity->pluck('year')->toArray()));
        foreach ($years as $year) {
            $students = $studentsByUniversity->where('year', $year);
            $applications = $applicationsByUniversity->where('year', $year);
            foreach ($students as $student) {
                $item = [
                    'university' => $student->university,
                    'total_students' => $student->total_students,
                    'total_applications' => 0,
                ];
                $application = $applications->where('university', $student->university)->first();
                if ($application) {
                    $item['total_applications'] = $application->total_applications;
                }
                $results->push($item);
            }
        }
        return $this->success($results);
    }
}
