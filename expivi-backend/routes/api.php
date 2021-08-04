<?php

use Illuminate\Http\Request;
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

Route::get('/login', function() {
    return [ 'msg' => 'Send a POST request with your credentials to this endpoint to get your token.'];
});
Route::post('/login', [\App\Http\Controllers\Api\AuthController::class, 'login'])->name('login');

Route::middleware('auth:sanctum')->group(function() {
    Route::get('/logout', [\App\Http\Controllers\Api\AuthController::class, 'logout'])->name('logout');

    Route::get('/items', [\App\Http\Controllers\Api\InfoController::class, 'showAll']);
    Route::post('/items', [\App\Http\Controllers\Api\InfoController::class, 'createOne']);
    Route::patch('/items/{itemSlug}', [\App\Http\Controllers\Api\InfoController::class, 'updateOne']);
    Route::delete('/items/{itemSlug}', [\App\Http\Controllers\Api\InfoController::class, 'deleteOne']);
});
