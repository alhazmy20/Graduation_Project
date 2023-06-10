<?php

namespace App\Traits;

use App\Models\Institution;
use App\Models\StudentFiles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

trait DeleteFiles
{
    public function deleteImage(Request $request, $id)
    {
        if ($request->has('deleteInstitutionLogo') && $request->deleteInstitutionLogo == 1) {
            $model = Institution::findOrFail($id);
            $this->deleteFileInformation($model, 'logo', 'institutions/logo/');
        }
        if ($request->has('deletePersonalPicture') && $request->deletePersonalPicture == 1) {
            $model = StudentFiles::where('student_id', $id)->firstOrFail();
            $this->deleteFileInformation($model, 'personalPicture', 'students/personal_pictures/');
        }
    }
    public function deleteFileInformation($model, $field, $folder)
    {
        Storage::disk('s3')->delete($folder . '/' . $model->{$field . '_filename'});
        $model->update([
            $field . '_filename' => null,
            $field . '_url' => null,
        ]);

    }
}
