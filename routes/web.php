<?php

use App\Http\Controllers\EditorController;
use App\Http\Controllers\HomeController;
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
//    return view('welcome');
});

Auth::routes();

//Route::get('/home',     [HomeController::class, 'index'])->name('home');
Route::get('/home',     [HomeController::class, 'home'])->name('home');
Route::get('/preview',  [EditorController::class, 'preview'])->name('preview');
Route::post('/preview', [EditorController::class, 'upload']);
Route::post('/api/uploadFile', [EditorController::class, 'uploadFile']);
