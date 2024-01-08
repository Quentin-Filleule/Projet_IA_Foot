import React from 'react';
import Formulaire from './components/Formulaire';

const App = () => {
  const handleSubmit = (data) => {
    // Envoyer les données au backend Python ici
    console.log('Données soumises :', data);
    // Vous pouvez effectuer une requête API vers votre backend Python à ce stade
  };

  return (
    <div className="App">
      <Formulaire onSubmit={handleSubmit} />
    </div>
  );
};

export default App;
