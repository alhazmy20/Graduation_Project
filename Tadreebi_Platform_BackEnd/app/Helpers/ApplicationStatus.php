<?php

namespace App\Helpers;

Class ApplicationStatus
{
    const WAITING_INSTITUTION_APPROVAL = 1;
    const WAITING_SUPERVISOR_APPROVAL = 2;
    const WAITING_STUDENT_APPROVAL = 3;
    const APPROVED = 4;
    const INSTITUTION_REJECTED  = 5;
    const SUPERVISOR_REJECTED  = 6;
    const STUDENT_REJECTED = 7;
    const CANCELED = 8;

}
