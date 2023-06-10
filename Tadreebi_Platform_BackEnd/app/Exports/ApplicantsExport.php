<?php

namespace App\Exports;

use App\Helpers\Gender;
use App\Models\Application;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;

class ApplicantsExport implements
    FromQuery,
    ShouldAutoSize,
    WithMapping,
    WithHeadings,
    WithEvents
{
    use Exportable;

    private $postId;
    private $userId;

    public function __construct($postId,$userId)
    {
        $this->postId = $postId;
        $this->userId = $userId;

    }

    public function query()
    {
        return Application::query()->whereHas('post', function ($query) {
            $query->where('institution_id', $this->userId);
        })
            ->where('post_id', $this->postId)
            ->with(['student', 'student.studentFiles', 'student.user', 'status',]);
    }

    public function map($applicant): array
    {
        // static counter to retain its values between function calls
        static $counter = 0;
        $counter++;
        return [
            $counter,
            $applicant->student->fName . ' ' . $applicant->student->sName . ' ' . $applicant->student->tName . ' ' . $applicant->student->lName,
            $applicant->student->national_ID,
            $applicant->student->user->email,
            $applicant->student->phone,
            $applicant->student->gender == Gender::MALE ? 'ذكر' : 'انثى',
            $applicant->student->university,
            $applicant->student->major,
            $applicant->student->GPA,
            $applicant->student->GPA_Type,
            $applicant->status->name,
            $applicant->student->studentFiles->nationalID_url,
            $applicant->student->studentFiles->CV_url,
            $applicant->student->studentFiles->internshipLetter_url,
            $applicant->student->studentFiles->transcript_url,
        ];
    }

    public function headings(): array
    {
        return [
            '#',
            'اسم الطالب',
            'الهوية الوطنية',
            'البريد الالكتروني',
            'رقم الهاتف',
            'الجنس',
            'الجامعة',
            'التخصص',
            'المعدل',
            'من',
            'حالة الطلب',
            'صورة بطاقة الاحوال',
            'السيرة الذاتية',
            'خطاب التدريب',
            'السجل الاكاديمي'
        ];
    }


    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                // Format cells A1 to C1
                $event->sheet->getDelegate()->getStyle('A1:O1')->applyFromArray([
                    'font' => [
                        'bold' => true,
                        'size' => 15,
                    ],
                    'fill' => [
                        'fillType' => Fill::FILL_SOLID,
                        'startColor' => [
                            'rgb' => 'D9D9D9',
                        ],
                    ],
                    'alignment' => [
                        'horizontal' => Alignment::HORIZONTAL_CENTER,
                    ],
                ]);
                // Format all other occupied cells
                $lastColumn = $event->sheet->getHighestColumn();
                $lastRow = $event->sheet->getHighestRow();
                $whiteFill = [
                    'fillType' => Fill::FILL_SOLID,
                    'startColor' => [
                        'rgb' => 'D9D9D9',
                    ],
                ];
                $greyFill = [
                    'fillType' => Fill::FILL_SOLID,
                    'startColor' => [
                        'rgb' => 'FFFFFF',
                    ],
                ];
                for ($row = 2; $row <= $lastRow; $row++) {
                    $fill = ($row % 2 == 0) ? $greyFill : $whiteFill;
                    $event->sheet->getDelegate()->getStyle('A' . $row . ':' . $lastColumn . $row)->applyFromArray([
                        'font' => [
                            'size' => 13,
                        ],
                        'fill' => $fill,
                        'alignment' => [
                            'horizontal' => Alignment::HORIZONTAL_CENTER,
                        ],
                    ]);
                }
                // Add an outline to the table
                $event->sheet->getDelegate()->getStyle('A1:' . $lastColumn . $lastRow)->applyFromArray([
                    'borders' => [
                        'allBorders' => [
                            'borderStyle' => Border::BORDER_MEDIUM,
                        ],
                    ],
                ]);
            },
        ];
    }
}
