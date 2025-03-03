<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

Route::get('/test-connexion', function () {
    try {
        DB::connection()->getPdo();
        return "Connexion à la base de données réussie !";
    } catch (\Exception $e) {
        return "Échec de la connexion : " . $e->getMessage();
    }
});

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/test-db', function () {
    return env('DB_DATABASE');
});