<?php

namespace App\Exports;

use App\Models\Student;
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

class StudentsExport implements
    FromQuery,
    ShouldAutoSize,
    WithMapping,
    WithHeadings,
    WithEvents
{
    use Exportable;

    public function query()
    {
        return Student::query()->with('user');
    }

    public function map($student): array
    {
        // static counter to retain its values between function calls
        static $counter = 0;
        $counter++;
        return [
            $counter,
            $student->fName . ' ' . $student->sName . ' ' . $student->tName . ' ' . $student->lName,
            $student->national_ID,
            $student->user->email,
            $student->phone,
            $student->gender == 0 ? 'ذكر' : 'انثى',
            $student->university,
            $student->major,
            $student->GPA,
            $student->GPA_Type,
            $student->studentFiles->nationalID_url,
            $student->studentFiles->CV_url,
            $student->studentFiles->internshipLetter_url,
            $student->studentFiles->transcript_url,
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
                $event->sheet->getDelegate()->getStyle('A1:N1')->applyFromArray([
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
