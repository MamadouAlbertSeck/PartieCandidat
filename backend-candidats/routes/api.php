<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CandidatController;

// Route pour vérifier si le candidat existe
Route::get('/verify-candidate/{numeroCarte}', [CandidatController::class, 'verifierCandidat']);

// Route pour obtenir tous les candidats (si nécessaire)
Route::get('/candidats', [CandidatController::class, 'index']);

// Route pour enregistrer un candidat
Route::post('/enregistrer-candidat', [CandidatController::class, 'enregistrerCandidat']);

