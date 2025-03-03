<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB; 


class CandidatSeeder extends Seeder
{
    public function run()
    {
        DB::table('candidats')->insert([
            [
                'numero_carte' => '567890123',
                'nom' => 'Ndiaye',
                'prenom' => 'Ousmane',
                'date_naissance' => '1980-03-10',
                'email' => null,
                'telephone' => null,
                'parti_politique' => null,
                'slogan' => null,
                'photo' => null,
                'couleur1' => null,
                'couleur2' => null,
                'couleur3' => null,
                'url_infos' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'numero_carte' => '456123789',
                'nom' => 'Sow',
                'prenom' => 'Fatou',
                'date_naissance' => '1995-12-05',
                'email' => null,
                'telephone' => null,
                'parti_politique' => null,
                'slogan' => null,
                'photo' => null,
                'couleur1' => null,
                'couleur2' => null,
                'couleur3' => null,
                'url_infos' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
