<?php

use App\Http\Controllers\DownloadController;
use App\Http\Controllers\ParserController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MailController;
use App\Http\Middleware\PreviewEditor;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return redirect('/login');
});


Auth::routes();

//Route::get('/home',     [HomeController::class, 'index'])->name('home');
//Route::get('/editor',   [HomeController::class, 'editor'])->name('editor');
//Route::get('/setup',    [HomeController::class, 'setup'])->name('setup');
Route::get('/dashboard',[HomeController::class, 'dashboard'])->name('dashboard');
Route::get('/qq',[ParserController::class, 'qq']);
//Route::get('/preview',  [EditorController::class, 'preview'])->name('preview');
//Route::post('/safe',    [EditorController::class, 'safe']);

Route::get('/mail', [MailController::class, 'PageInform']);

Route::prefix('/api')->group(function () {
    Route::post('/uploadFile',  [ParserController::class, 'uploadFile'])->middleware('auth');
    Route::get('/download',     [DownloadController::class, 'index'])->middleware('auth');
    Route::get('/datasetfinal', [DownloadController::class, 'create_dataset_final']);
//    Route::delete('/editor',    [EditorController::class, 'delete'])->name('del_editor');
//    Route::post('/copy',        [EditorController::class, 'copy'])->name('copy_editor');
//    Route::post('/page_setup',  [EditorController::class, 'page_setup'])->name('page_setup');
//    Route::post('/mail',        [MailController::class, 'PageInform']);
});
