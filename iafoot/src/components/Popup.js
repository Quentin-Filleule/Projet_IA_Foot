// Popup.js

import React from 'react';
import './Popup.css';

const Popup = ({ handleClose, show, data }) => {
  const showHideClassName = show ? 'popup display-block' : 'popup display-none';

  return (
    <div className={showHideClassName}>
      <section className="popup-main">
        <p>Données de formulaire :</p>
        <pre>{JSON.stringify(data, null, 2)}</pre>
        <button onClick={handleClose}>Fermer</button>
      </section>
    </div>
  );
};

export default Popup;
