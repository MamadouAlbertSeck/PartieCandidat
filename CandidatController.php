<?php

namespace App\Http\Controllers;

use App\Models\Electeur;  // Assurez-vous que le modèle Electeur existe
use App\Models\Candidat;  // Le modèle Candidat pour enregistrer un candidat
use Illuminate\Http\Request;
use App\Mail\SecurityCodeMail;
use Illuminate\Support\Facades\Mail;

class CandidatController extends Controller
{
    // Méthode pour vérifier si le candidat existe
    public function verifierCandidat($numeroCarte)
    {
        $electeur = Electeur::where('numero_carte', $numeroCarte)->first();

        if ($electeur) {
            return response()->json([
                'exists' => true,
                'electeur' => $electeur
            ]);
        } else {
            return response()->json(['exists' => false], 404);
        }
    }

    // Méthode pour obtenir tous les candidats
    public function index()
    {
        $candidats = Candidat::all();
        return response()->json($candidats);
    }

    // Méthode pour enregistrer un candidat
    public function enregistrerCandidat(Request $request)
    {
        try {
            // Valider les données envoyées par le client
            $request->validate([
                'numero_carte' => 'required|string',
                'nom' => 'required|string',
                'prenom' => 'required|string',
                'date_naissance' => 'required|date',
                'email' => 'required|email',
                'telephone' => 'required|string',
                'parti_politique' => 'required|string',
                'slogan' => 'required|string',
                'couleur1' => 'nullable|string',
                'couleur2' => 'nullable|string',
                'couleur3' => 'nullable|string',
                'photo' => 'nullable|string',
                'url_infos' => 'nullable|string',
            ]);
    
            // Vérifier si un candidat avec le même numéro de carte existe déjà
            $existingCandidat = Candidat::where('numero_carte', $request->numero_carte)->first();
            if ($existingCandidat) {
                return response()->json([
                    'success' => false,
                    'message' => 'Ce candidat est déjà enregistré avec ce numéro de carte.'
                ], 400);  // Code 400 pour indiquer que la requête est incorrecte
            }
    
            // Enregistrer le candidat dans la base de données
            $candidat = Candidat::create($request->all());
    
            return response()->json([
                'success' => true,
                'message' => 'Candidat enregistré avec succès',
                'candidat' => $candidat
            ], 201);
    
        } catch (\Illuminate\Database\QueryException $e) {
            // Erreurs liées à la base de données
            \Log::error('Erreur de base de données: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Erreur interne du serveur, impossible de traiter la demande.'
            ], 500);
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Erreurs de validation
            \Log::error('Erreur de validation: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Les données envoyées ne sont pas valides.'
            ], 422);  // 422 pour une erreur de validation
        } catch (\Exception $e) {
            // Autres erreurs génériques
            \Log::error('Erreur générale: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Une erreur imprévue est survenue. Veuillez réessayer.'
            ], 500);
        }
    }
    

        
}

   

