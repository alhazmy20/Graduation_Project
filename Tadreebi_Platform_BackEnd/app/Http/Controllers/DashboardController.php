<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Institution;
use App\Models\Post;
use App\Models\Student;
use App\Models\News;
use App\Models\Supervisor;
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    use HttpResponses;

    /**
     * Display a listing of the resource.
     * @return \Illuminate\Http\JsonResponse
     */
    public function cardsStatistics()
    {
        return $this->success([
            'totalStudents' => Student::withoutTrashed()->count(),
            'totalInstitutions' => Institution::withoutTrashed()->count(),
            'totalSupervisors' => Supervisor::withoutTrashed()->count(),
            'totalPosts' => Post::withoutTrashed()->count(),
            'totalNews' => News::withoutTrashed()->count(),
            'unactiveInstitutions' => Institution::where('isActive', 0)->count(),
            'newStudents' => $this->getWeeklyStatistics(Student::class),
            'newSupervisors' => $this->getWeeklyStatistics(Supervisor::class),
            'newInstitutions' => $this->getWeeklyStatistics(Institution::class),

        ]);
    }

    public function getWeeklyStatistics($model)
    {
        $currentWeekStart = now()->startOfWeek();
        $currentWeekEnd = now()->endOfWeek();

        $currentWeekStudentsCount = $model::withoutTrashed()->whereBetween('created_at', [$currentWeekStart, $currentWeekEnd])
            ->count();

        $previousWeekStart = now()->subWeek()->startOfWeek();
        $previousWeekEnd = now()->subWeek()->endOfWeek();

        $previousWeekStudentsCount = $model::withoutTrashed()->whereBetween('created_at', [$previousWeekStart, $previousWeekEnd])
            ->count();

        if ($previousWeekStudentsCount > 0) {
            $percentageDifference = ($currentWeekStudentsCount - $previousWeekStudentsCount) / $previousWeekStudentsCount * 100;
        } else {
            $percentageDifference = 0;
        }
        return [
            'currentWeekCount' => $currentWeekStudentsCount,
            'percentageDifference' => $percentageDifference . '%'
        ];
    }
    /**
     * Display a listing of the resource.
     * @return \Illuminate\Http\JsonResponse
     */
    public function chartStatistics()
    {
        $requestedYear = request()->input('year');

        //both of these queries has n+1 problem, need to be solved later. Works fine for now

        // Total students in each university for all years
        $studentsByUniversity = Student::withoutTrashed()->select(DB::raw('count(*) as total_students, university, YEAR(created_at) as year'))
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
                    'totalStudents' => $student->total_students,
                    'totalApplications' => 0,
                ];
                $application = $applications->where('university', $student->university)->first();
                if ($application) {
                    $item['totalApplications'] = $application->total_applications;
                }
                $results->push($item);
            }
        }
        return $this->success($results);
    }

}
