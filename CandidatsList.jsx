import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CandidatsList.css'; 

const CandidatsList = () => {
    const [candidats, setCandidats] = useState([]);
    const [loading, setLoading] = useState(true); // État pour gérer le chargement
    const [error, setError] = useState(null); // État pour gérer les erreurs

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/candidats')
            .then(response => {
                setCandidats(response.data);
                setLoading(false); // Arrêter le chargement une fois les données reçues
            })
            .catch(error => {
                setError('Erreur lors de la récupération des candidats');
                setLoading(false);
                console.error("Erreur :", error);
            });
    }, []);

    return (
        <div className="container">
            <h1>Liste des Candidats</h1>
            
            {loading ? (
                <p>Chargement...</p> // Affichage pendant le chargement
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p> // Affichage de l'erreur
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Date de Naissance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {candidats.length > 0 ? (
                            candidats.map((candidat) => (
                                <tr key={candidat.id}> {/* Utilisation de l'id du candidat si disponible */}
                                    <td>{candidat.nom}</td>
                                    <td>{candidat.prenom}</td>
                                    <td>{new Date(candidat.date_naissance).toLocaleDateString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">Aucun candidat trouvé.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default CandidatsList;
