<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\ExportController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\InstitutionController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => 'auth:sanctum'], function () {

    Route::group(['middleware' => 'verified'], function () {
        Route::group(['middleware' => ['role:Student']], function () {
            Route::prefix('/applications')->group(function () {
                Route::get('/', [ApplicationController::class, 'index']);
                Route::post('/', [ApplicationController::class, 'store']);
            });
        });

        Route::group(['middleware' => ['role:Institution']], function () {
            Route::prefix('/posts')->group(function () {
                Route::get('/{post}/applicants/export', [ExportController::class, 'exportApplicants']);
                Route::post('/', [PostController::class, 'store']);
                Route::put('/{post}', [PostController::class, 'update']);
                Route::get('/{id}/applicants', [ApplicationController::class, 'index']);
            });
        });

        Route::group(['middleware' => ['role:Admin']], function () {
            Route::apiResource('admins', AdminController::class);
            Route::apiResource('news', NewsController::class)->except(['index', 'show']);
            Route::prefix('/institutions')->group(function () {
                Route::delete('/{institution}', [InstitutionController::class, 'destroy']);
                Route::get('/export', [ExportController::class, 'exportInstitutions']);
            });
            Route::prefix('/students')->group(function () {
                Route::get('/', [StudentController::class, 'index']);
                Route::delete('/{student}', [StudentController::class, 'destroy']);
                Route::get('/export', [ExportController::class, 'exportStudents']);
            });
            Route::prefix('/dashboard')->group(function () {
                Route::get('/chart', [DashboardController::class, 'chartStatistics']);
                Route::get('/cards', [DashboardController::class, 'cardsStatistics']);
            });
        });

        Route::group(['middleware' => ['role:Admin|Institution']], function () {
            Route::delete('/posts/{post}', [PostController::class, 'destroy']);
            Route::get('/posts', [PostController::class, 'index']);
            Route::prefix('/institutions')->group(function () {
                Route::get('/{institution}', [InstitutionController::class, 'show']);
                Route::put('/{institution}', [InstitutionController::class, 'update']);
            });
        });

        Route::group(['middleware' => ['role:Admin|Student']], function () {
            Route::prefix('/students')->group(function () {
                Route::get('/{student}', [StudentController::class, 'show']);
                Route::put('/{student}', [StudentController::class, 'update']);
            });
        });

        Route::group(['middleware' => ['role:Institution|Student']], function () {
            Route::put('/applications/{application}', [ApplicationController::class, 'update']);

        });
    });
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/user/{user}/change-password', [AuthController::class, 'changePassword']);
    Route::post('/email/verification-notification', [VerifyEmailController::class, 'resend'])
        ->name('verification.send');
});

//News - public
Route::prefix('news')->group(function () {
    Route::get('/', [NewsController::class, 'index']);
    Route::get('/{news}', [NewsController::class, 'show']);
});

//Posts - public
Route::prefix('posts')->group(function () {
    Route::get('/', [PostController::class, 'index']);
    Route::get('/{post}', [PostController::class, 'show']);
});

//Instituions - public
Route::prefix('institutions')->group(function () {
    Route::get('/', [InstitutionController::class, 'index']);
    Route::post('/', [InstitutionController::class, 'store']);
});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/students', [StudentController::class, 'store']);


Route::get('/email/verify/{id}/{hash}', [VerifyEmailController::class, 'verify'])
    ->middleware(['signed'])
    ->name('verification.verify');
