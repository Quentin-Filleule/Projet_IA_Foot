import React, { useState } from 'react';
import './Formulaire.css'; // Importe le fichier CSS

const InputComponent = ({ label, value, onChange }) => {
  return (
    <label>
      {label}:
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
};

const Formulaire = ({ onSubmit }) => {

  const [full_name, setFullName] = useState('');
  const [name, setName] = useState('');
  const [birth_date, setBirthDate] = useState('');
  const [age, setAge] = useState('');
  const [height_cm, setHeightCm] = useState('');
  const [weight_kgs, setWeightKgs] = useState('');
  const [positions, setPositions] = useState('');
  const [nationality, setNationality] = useState('');
  const [overall_rating, setOverallRating] = useState('');
  const [potential, setPotential] = useState('');
  const [value_euro, setValueEuro] = useState('');
  const [wage_euro, setWageEuro] = useState('');
  const [preferred_foot, setPreferredFoot] = useState('');
  const [international_reputation, setInternationalReputation] = useState('');
  const [weak_foot, setWeakFoot] = useState('');
  const [skill_moves, setSkillMoves] = useState('');
  const [body_type, setBodyType] = useState('');
  const [release_clause_euro, setReleaseClauseEuro] = useState('');
  const [national_team, setNationalTeam] = useState('');
  const [national_rating, setNationalRating] = useState('');
  const [national_team_position, setNationalTeamPosition] = useState('');
  const [national_jersey_number, setNationalJerseyNumber] = useState('');
  const [crossing, setCrossing] = useState('');
  const [finishing, setFinishing] = useState('');
  const [heading_accuracy, setHeadingAccuracy] = useState('');
  const [short_passing, setShortPassing] = useState('');
  const [volleys, setVolleys] = useState('');
  const [dribbling, setDribbling] = useState('');
  const [curve, setCurve] = useState('');
  const [freekick_accuracy, setFreekickAccuracy] = useState('');
  const [long_passing, setLongPassing] = useState('');
  const [ball_control, setBallControl] = useState('');
  const [acceleration, setAcceleration] = useState('');
  const [sprint_speed, setSprintSpeed] = useState('');
  const [agility, setAgility] = useState('');
  const [reactions, setReactions] = useState('');
  const [balance, setBalance] = useState('');
  const [shot_power, setShotPower] = useState('');
  const [jumping, setJumping] = useState('');
  const [stamina, setStamina] = useState('');
  const [strength, setStrength] = useState('');
  const [long_shots, setLongShots] = useState('');
  const [aggression, setAggression] = useState('');
  const [interceptions, setInterceptions] = useState('');
  const [positioning, setPositioning] = useState('');
  const [vision, setVision] = useState('');
  const [penalties, setPenalties] = useState('');
  const [composure, setComposure] = useState('');
  const [marking, setMarking] = useState('');
  const [standing_tackle, setStandingTackle] = useState('');
  const [sliding_tackle, setSlidingTackle] = useState('');



  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/recevoir-donnees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        full_name,
        name,
        birth_date,
        age,
        height_cm,
        weight_kgs,
        positions,
        nationality,
        overall_rating,
        potential,
        value_euro,
        wage_euro,
        preferred_foot,
        international_reputation,
        weak_foot,
        skill_moves,
        body_type,
        release_clause_euro,
        national_team,
        national_rating,
        national_team_position,
        national_jersey_number,
        crossing,
        finishing,
        heading_accuracy,
        short_passing,
        volleys,
        dribbling,
        curve,
        freekick_accuracy,
        long_passing,
        ball_control,
        acceleration,
        sprint_speed,
        agility,
        reactions,
        balance,
        shot_power,
        jumping,
        stamina,
        strength,
        long_shots,
        aggression,
        interceptions,
        positioning,
        vision,
        penalties,
        composure,
        marking,
        standing_tackle,
        sliding_tackle })
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);
      // Traitez la réponse si nécessaire
      onSubmit(responseData);
    } else {
      console.error('Erreur lors de la soumission du formulaire');
    }
    // Réinitialiser les champs après la soumission
    setFullName('');

    

  };


  return (
    <form onSubmit={handleSubmit}>
      <InputComponent label="Nom Complet" value={full_name} onChange={setFullName} />
      <InputComponent label="Nom" value={name} onChange={setName} />
      <InputComponent label="Date de naissance" value={birth_date} onChange={setBirthDate} />
      <InputComponent label="Âge" value={age} onChange={setAge} />
      <InputComponent label="Taille (cm)" value={height_cm} onChange={setHeightCm} />
      <InputComponent label="Poids (kgs)" value={weight_kgs} onChange={setWeightKgs} />
      <InputComponent label="Positions" value={positions} onChange={setPositions} />
      <InputComponent label="Nationalité" value={nationality} onChange={setNationality} />
      <InputComponent label="Note globale" value={overall_rating} onChange={setOverallRating} />
      <InputComponent label="Potentiel" value={potential} onChange={setPotential} />
      <InputComponent label="Valeur en euros" value={value_euro} onChange={setValueEuro} />
      <InputComponent label="Salaire en euros" value={wage_euro} onChange={setWageEuro} />
      <InputComponent label="Pied préféré" value={preferred_foot} onChange={setPreferredFoot} />
      <InputComponent label="Réputation internationale" value={international_reputation} onChange={setInternationalReputation} />
      <InputComponent label="Pied faible" value={weak_foot} onChange={setWeakFoot} />
      <InputComponent label="Compétences techniques" value={skill_moves} onChange={setSkillMoves} />
      <InputComponent label="Type de corps" value={body_type} onChange={setBodyType} />
      <InputComponent label="Clause libératoire en euros" value={release_clause_euro} onChange={setReleaseClauseEuro} />
      <InputComponent label="Équipe nationale" value={national_team} onChange={setNationalTeam} />
      <InputComponent label="Note nationale" value={national_rating} onChange={setNationalRating} />
      <InputComponent label="Position dans l'équipe nationale" value={national_team_position} onChange={setNationalTeamPosition} />
      <InputComponent label="Numéro de maillot national" value={national_jersey_number} onChange={setNationalJerseyNumber} />
      <InputComponent label="Crossing" value={crossing} onChange={setCrossing} />
      <InputComponent label="Finishing" value={finishing} onChange={setFinishing} />
      <InputComponent label="Précision de tête" value={heading_accuracy} onChange={setHeadingAccuracy} />
      <InputComponent label="Passe courte" value={short_passing} onChange={setShortPassing} />
      <InputComponent label="Volley" value={volleys} onChange={setVolleys} />
      <InputComponent label="Dribble" value={dribbling} onChange={setDribbling} />
      <InputComponent label="Courbe" value={curve} onChange={setCurve} />
      <InputComponent label="Précision coup franc" value={freekick_accuracy} onChange={setFreekickAccuracy} />
      <InputComponent label="Passe longue" value={long_passing} onChange={setLongPassing} />
      <InputComponent label="Contrôle de balle" value={ball_control} onChange={setBallControl} />
      <InputComponent label="Accélération" value={acceleration} onChange={setAcceleration} />
      <InputComponent label="Vitesse de sprint" value={sprint_speed} onChange={setSprintSpeed} />
      <InputComponent label="Agilité" value={agility} onChange={setAgility} />
      <InputComponent label="Réactions" value={reactions} onChange={setReactions} />
      <InputComponent label="Équilibre" value={balance} onChange={setBalance} />
      <InputComponent label="Puissance de tir" value={shot_power} onChange={setShotPower} />
      <InputComponent label="Saut" value={jumping} onChange={setJumping} />
      <InputComponent label="Endurance" value={stamina} onChange={setStamina} />
      <InputComponent label="Force" value={strength} onChange={setStrength} />
      <InputComponent label="Tirs de loin" value={long_shots} onChange={setLongShots} />
      <InputComponent label="Aggressivité" value={aggression} onChange={setAggression} />
      <InputComponent label="Interceptions" value={interceptions} onChange={setInterceptions} />
      <InputComponent label="Placement" value={positioning} onChange={setPositioning} />
      <InputComponent label="Vision" value={vision} onChange={setVision} />
      <InputComponent label="Penalties" value={penalties} onChange={setPenalties} />
      <InputComponent label="Calme" value={composure} onChange={setComposure} />
      <InputComponent label="Marquage" value={marking} onChange={setMarking} />
      <InputComponent label="Tacle debout" value={standing_tackle} onChange={setStandingTackle} />
      <InputComponent label="Tacle glissé" value={sliding_tackle} onChange={setSlidingTackle} />
      <button type="submit">Soumettre</button>
    </form>

  );
};

export default Formulaire;