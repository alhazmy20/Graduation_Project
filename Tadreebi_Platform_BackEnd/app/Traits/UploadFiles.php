<?php

namespace App\Traits;

use App\Models\Institution;
use App\Models\News;
use App\Models\StudentFiles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

trait UploadFiles
{
    public function upload(Request $request, $id)
    {
        $fields = [
            'transcript' => 'students/transcripts',
            'CV' => 'students/CV',
            'internshipLetter' => 'students/internship_letters',
            'nationalID' => 'students/national_id',
            'personalPicture' => 'students/personal_pictures',
            'logo' => 'institutions/logo',
            'newsLogo' => 'news/logo'
        ];

        foreach ($fields as $field => $folder) {
            if ($request->hasFile($field)) {
                $file = $request->file($field);
                $filename = uniqid() . '_' . $file->getClientOriginalName();
                $url = Storage::disk('s3')->putFileAs("{$folder}", $file, $filename, 'public');
                if ($field == 'logo') {
                    $institution = Institution::findOrFail($id);
                    if ($institution->logo_filename) {
                        Storage::disk('s3')->delete($folder . '/' . $institution->logo_filename);
                    }
                    $institution->update([
                        'logo_filename' => $filename,
                        'logo_url' => Storage::disk('s3')->url($url),
                    ]);
                } elseif ($field == 'newsLogo') {
                    $news = News::findOrFail($id);
                    if ($news->logo_filename) {
                        Storage::disk('s3')->delete($folder . '/' . $news->logo_filename);
                    }
                    $news->update([
                        'logo_filename' => $filename,
                        'logo_url' => Storage::disk('s3')->url($url),
                    ]);
                } else {
                    $studentFiles = StudentFiles::where('student_id', $id)->firstOrFail();
                    if ($request->has('isPersonalPictureDeleted') && $request->isPersonalPictureDeleted == 1) {
                        Storage::disk('s3')->delete('students/personal_pictures/' . $studentFiles->personalPicture_filename);
                        $studentFiles->update([
                            'personalPicture_filename' => null,
                            'personalPicture_url' => null
                        ]);
                    } else {
                        if ($studentFiles->{$field . '_filename'}) {
                            Storage::disk('s3')->delete($folder . '/' . $studentFiles->{$field . '_filename'});
                        }
                        $studentFiles->update([
                            $field . '_filename' => $filename,
                            $field . '_url' => Storage::disk('s3')->url($url),
                        ]);
                    }
                }
            }
        }
    }
}
