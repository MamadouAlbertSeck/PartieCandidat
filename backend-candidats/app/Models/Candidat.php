<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Candidat extends Model
{
    use HasFactory;

    protected $table = 'candidats'; // Vérifie que le nom correspond bien à ta table dans MySQL

    protected $fillable = [
        'numero_carte',
        'nom',
        'prenom',
        'date_naissance',
        'adresse_email',
        'telephone',
        'nom_parti',
        'slogan',
        'photo',
        'couleur1',
        'couleur2',
        'couleur3',
        'page_info',
    ];
}

