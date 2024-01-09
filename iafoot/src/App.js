// App.js

import React, { useState } from 'react';
import Formulaire from './components/Formulaire';
import Popup from './components/Popup';
import './App.css';

const App = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState(null);

  const handleSubmit = (data) => {
    // Envoyer les données au backend Python ici
    console.log('Données soumises :', data);
    // Vous pouvez effectuer une requête API vers votre backend Python à ce stade

    // Mettre à jour le state avec les données du formulaire
    setFormData(data);

    // Afficher la fenêtre pop-up
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    // Fermer la fenêtre pop-up
    setShowPopup(false);
  };

  return (
    <div className="App">
      <Formulaire onSubmit={handleSubmit} />
      {/* Afficher le Popup avec les données du formulaire */}
      <Popup show={showPopup} handleClose={handleClosePopup} data={formData} />
    </div>
  );
};

export default App;
