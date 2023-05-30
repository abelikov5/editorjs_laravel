<?php

use App\Http\Controllers\EditorController;
use App\Http\Controllers\HomeController;
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
Route::get('/editor',   [HomeController::class, 'editor'])->name('editor');
Route::get('/setup',    [HomeController::class, 'setup'])->name('setup');
Route::get('/dashboard',[HomeController::class, 'dashboard'])->name('dashboard');
Route::get('/preview',  [EditorController::class, 'preview'])->name('preview');
Route::post('/preview', [EditorController::class, 'upload']);

Route::get('/qq', [EditorController::class, 'api_nebo_sport']);


Route::prefix('/api')->group(function () {
    Route::post('/uploadFile',  [EditorController::class, 'uploadFile']);
    Route::delete('/editor',    [EditorController::class, 'delete'])->name('del_editor');
    Route::post('/copy',        [EditorController::class, 'copy'])->name('copy_editor');
    Route::post('/page_setup',  [EditorController::class, 'page_setup'])->name('page_setup');
});
