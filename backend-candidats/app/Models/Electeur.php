<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Electeur extends Model
{
    use HasFactory;

    // Si vous avez des colonnes spécifiques, vous pouvez les déclarer ici
    protected $table = 'electeur';
   // protected $fillable = ['numero_carte', 'nom', 'prenom', 'date_naissance', 'lieu_naissance', 'sexe'];
}
