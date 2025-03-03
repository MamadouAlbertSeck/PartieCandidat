import React, { useState } from 'react';
import axios from 'axios';
import './VerifierCandidats.css';  // Assure-toi que le CSS est bien importé

const VerifierCandidat = () => {
  const [numeroCarte, setNumeroCarte] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [electeur, setElecteur] = useState(null);
  const [candidatInfo, setCandidatInfo] = useState({
    email: '',
    telephone: '',
    parti: '',
    slogan: '',
    couleur1: '',
    couleur2: '',
    couleur3: '',
    photo: '',
    url: ''
  });
  const [isVerified, setIsVerified] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');  // État pour afficher un message après enregistrement
  const [feedbackType, setFeedbackType] = useState('');  // 'success' ou 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedbackMessage('');
    const numeroCarteClean = numeroCarte.trim();

    if (!numeroCarteClean) {
      setErrorMessage('Veuillez entrer un numéro de carte valide.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8000/api/verify-candidate/${numeroCarteClean}`);

      if (response.data.exists) {
        setElecteur(response.data.electeur);
        setIsVerified(true);
        setErrorMessage('');
      } else {
        setErrorMessage('Le candidat n\'est pas présent dans le fichier électoral.');
        setIsVerified(false);
      }
    } catch (error) {
      setErrorMessage('Une erreur est survenue lors de la vérification.');
      console.error(error);
      setIsVerified(false);
    }
  };

  const handleSaveCandidat = async (e) => {
    e.preventDefault();
    setFeedbackMessage('');
    const numeroCarteClean = numeroCarte.trim();
  
    try {
      const response = await axios.post('http://localhost:8000/api/enregistrer-candidat', {
        numero_carte: numeroCarteClean,
        nom: electeur.nom,
        prenom: electeur.prenom,
        date_naissance: electeur.date_naissance,
        email: candidatInfo.email,
        telephone: candidatInfo.telephone,
        parti_politique: candidatInfo.parti,
        slogan: candidatInfo.slogan,
        photo: candidatInfo.photo,
        couleur1: candidatInfo.couleur1,
        couleur2: candidatInfo.couleur2,
        couleur3: candidatInfo.couleur3,
        url_infos: candidatInfo.url
      });
  
      if (response.data.success) {
        setFeedbackMessage('Candidat enregistré avec succès !');
        setFeedbackType('success');
      } else {
        setFeedbackMessage(response.data.message);  // Affiche le message retourné par le backend
        setFeedbackType('error');
      }
    } catch (error) {
      // Gérer les erreurs du backend
      if (error.response) {
        // Erreur retournée par le serveur
        setFeedbackMessage(error.response.data.message || 'Une erreur est survenue.');
      } else if (error.request) {
        // Aucune réponse reçue du serveur
        setFeedbackMessage('Le serveur ne répond pas. Veuillez réessayer plus tard.');
      } else {
        // Autres erreurs
        setFeedbackMessage('Une erreur imprévue est survenue.');
      }
      setFeedbackType('error');
      console.error(error);
    }
  };
  
  

  return (
    <div className="container">
      <h1>Vérification et Enregistrement du Candidat</h1>

      <div className="section">
        <form onSubmit={handleSubmit}>
          <label>
            Numéro de Carte d’Électeur:
            <input
              type="text"
              value={numeroCarte}
              onChange={(e) => setNumeroCarte(e.target.value)}
            />
          </label>
          <button type="submit">Vérifier</button>
        </form>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {isVerified && electeur && (
        <div className="section">
          <h2>Informations du Candidat</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Date de Naissance</th>
                <th>Lieu de Naissance</th>
                <th>Sexe</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{electeur.nom}</td>
                <td>{electeur.prenom}</td>
                <td>{electeur.date_naissance}</td>
                <td>{electeur.lieu_naissance}</td>
                <td>{electeur.sexe}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {isVerified && electeur && (
        <div className="section">
          <h2>Informations Complémentaires</h2>
          <form onSubmit={handleSaveCandidat}>
            <label>
              Email:
              <input
                type="email"
                value={candidatInfo.email}
                onChange={(e) => setCandidatInfo({ ...candidatInfo, email: e.target.value })}
              />
            </label>
            <label>
              Téléphone:
              <input
                type="text"
                value={candidatInfo.telephone}
                onChange={(e) => setCandidatInfo({ ...candidatInfo, telephone: e.target.value })}
              />
            </label>
            <label>
              Parti politique:
              <input
                type="text"
                value={candidatInfo.parti}
                onChange={(e) => setCandidatInfo({ ...candidatInfo, parti: e.target.value })}
              />
            </label>
            <label>
              Slogan:
              <input
                type="text"
                value={candidatInfo.slogan}
                onChange={(e) => setCandidatInfo({ ...candidatInfo, slogan: e.target.value })}
              />
            </label>
            <label>
              Photo (URL):
              <input
                type="text"
                value={candidatInfo.photo}
                onChange={(e) => setCandidatInfo({ ...candidatInfo, photo: e.target.value })}
              />
            </label>

            <label>
              Couleur 1:
              <input
                type="text"
                value={candidatInfo.couleur1}
                onChange={(e) => setCandidatInfo({ ...candidatInfo, couleur1: e.target.value })}
              />
            </label>
            <label>
              Couleur 2:
              <input
                type="text"
                value={candidatInfo.couleur2}
                onChange={(e) => setCandidatInfo({ ...candidatInfo, couleur2: e.target.value })}
              />
            </label>
            <label>
              Couleur 3:
              <input
                type="text"
                value={candidatInfo.couleur3}
                onChange={(e) => setCandidatInfo({ ...candidatInfo, couleur3: e.target.value })}
              />
            </label>
           
            <label>
              URL d'informations supplémentaires:
              <input
                type="text"
                value={candidatInfo.url}
                onChange={(e) => setCandidatInfo({ ...candidatInfo, url: e.target.value })}
              />
            </label>

            <button type="submit">Enregistrer le Candidat</button>
            {feedbackMessage && (
              <p className={feedbackType === 'success' ? 'success-message' : 'error-message'}>
                {feedbackMessage}
              </p>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default VerifierCandidat;  // Assure-toi d'ajouter cette ligne pour l'export par défaut
