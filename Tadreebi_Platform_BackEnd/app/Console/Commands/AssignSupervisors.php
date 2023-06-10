<?php

namespace App\Console\Commands;

use App\Helpers\Gender;
use App\Helpers\SupervisorSection;
use App\Models\Student;
use App\Models\Supervisor;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;

class AssignSupervisors extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'AssignSupervisors';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update the supervisor_id in students table to link the student with his supervisor from his universitiy';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        // #1
        // unlink the supervisor from students if the supervisor changed supervised section from both section to either female or male section
        $students = Student::with('supervisor')
            //get all the students who has a supervisor
            ->whereNotNull('supervisor_id')
            ->get()
            // filter the students to set the supervisor_id to null if the supervised section missmatch the student gender
            ->filter(function ($student) {
                ($student->supervisor->section == SupervisorSection::FEMALE_SECTION && $student->gender == Gender::MALE) ||
                ($student->supervisor->section == SupervisorSection::MALE_SECTION && $student->gender == Gender::FEMALE);
                $student->supervisor_id = null;
                $student->save();
                Cache::forget('supervisor_students');
            });
        // #2
        //link the supervisor to the students supervised section, university, college,and department
        $supervisors = Supervisor::all();
        foreach ($supervisors as $supervisor) {
            $query = Student::where([
                ['university', $supervisor->university],
                ['college', $supervisor->college],
                ['department', $supervisor->department],
            ]);
            //check if the supervisor suprivse on both section then add a query to retrieve all the students
            if ($supervisor->section == SupervisorSection::BOTH_SECTIONS) {
                $query->whereIn('gender', [Gender::MALE, Gender::FEMALE]);
            }
            //check if the supervisor suprivse on female section only then add a query to retrieve all the female students
            elseif ($supervisor->section == SupervisorSection::FEMALE_SECTION) {
                $query->where('gender', Gender::FEMALE);
            }
            //check if the supervisor suprivse on male section only then add a query to retrieve all the male students
            elseif ($supervisor->section == SupervisorSection::MALE_SECTION) {
                $query->where('gender', Gender::MALE);
            }
            // get the students
            $students = $query->whereNull('supervisor_id')->get();
            // if there are students related to a supervisor and they are not linked, link them and forget the cache
            if ($students) {
                foreach ($students as $student) {
                    $student->supervisor_id = $supervisor->id;
                    $student->save();
                }
                Cache::forget('supervisor_students');
            }
        }
    }
}
