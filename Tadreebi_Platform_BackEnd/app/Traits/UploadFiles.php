<?php

namespace App\Traits;

use App\Models\Institution;
use App\Models\News;
use App\Models\StudentFiles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

trait UploadFiles
{
    public function uploadFiles(Request $request, $id)
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
                    $model = Institution::findOrFail($id);
                } elseif ($field == 'newsLogo') {
                    $model = News::findOrFail($id);
                } else {
                    $model = StudentFiles::where('student_id', $id)->firstOrFail();
                }
                $this->updateFileInformation($model, $field, $folder, $filename, $url);
            }
        }
    }
    private function updateFileInformation($model, $field, $folder, $filename, $url)
    {
        // replace the name of newsLogo field to logo to match the field in the db
        if ($model instanceof News) {
            $field='logo';
        }
        // delete the current uploaded file then updating the db with the uploaded one
        if ($model->{$field . '_filename'}) {
            Storage::disk('s3')->delete($folder . '/' . $model->{$field . '_filename'});
        }
        $model->update([
            $field . '_filename' => $filename,
            $field . '_url' => Storage::disk('s3')->url($url),
        ]);
    }

}
