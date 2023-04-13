<?php

namespace App\Http\Controllers;

use App\Exports\ApplicantsExport;
use App\Exports\InstitutionsExport;
use App\Exports\StudentsExport;
use App\Models\Post;
use Maatwebsite\Excel\Excel;

class ExportController extends Controller
{
    private $excel;
    public function __construct(Excel $excel)
    {
        $this->excel = $excel;
    }
    public function exportApplicants(Post $post)
    {
        $filename = $post->title . '-' . date('Y-m-d') . '.xlsx';
        return $this->excel->download(new ApplicantsExport($post->id), $filename);
    }

    public function exportInstitutions()
    {
        $filename = 'المنشآت' . '-' . date('Y-m-d') . '.xlsx';
        return $this->excel->download(new InstitutionsExport, $filename);
    }

    public function exportStudents()
    {
        $filename = 'الطلاب' . '-' . date('Y-m-d') . '.xlsx';
        return $this->excel->download(new StudentsExport, $filename);
    }
}
