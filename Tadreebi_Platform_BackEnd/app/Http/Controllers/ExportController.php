<?php

namespace App\Http\Controllers;

use App\Exports\ApplicantsExport;
use App\Exports\InstitutionsExport;
use App\Exports\AdminStudentsExport;
use App\Exports\SupervisorStudentsExport;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Facades\Excel;


class ExportController extends Controller
{

    public function exportApplicants(Post $post)
    {
        $filename = $post->title . '-' . date('Y-m-d') . '.xlsx';
        return Excel::download(new ApplicantsExport($post->id, Auth::id()), $filename);
    }

    public function exportInstitutions()
    {
        $filename = 'المنشآت' . '-' . date('Y-m-d') . '.xlsx';
        return Excel::download(new InstitutionsExport, $filename);
    }

    public function exportAdminStudents()
    {
        $filename = 'الطلاب' . '-' . date('Y-m-d') . '.xlsx';
        return Excel::download(new AdminStudentsExport, $filename);
    }
    public function exportSupervisorStudents()
    {
        $filename = 'الطلاب' . '-' . date('Y-m-d') . '.xlsx';
        return Excel::download(new SupervisorStudentsExport, $filename);
    }
}
