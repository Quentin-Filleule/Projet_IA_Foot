from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

loaded_model = joblib.load('../.././PartieIA/random_forest_model.pkl')

app = Flask(__name__)
CORS(app)  # Active CORS pour toutes les routes

@app.route('/recevoir-donnees', methods=['POST'])
def recevoir_donnees():
    data = request.json
    print('Données reçues:', data)

    age_to_potential_ratio = float(data['age']) / float(data['potential'])
    performance_index = (float(data['overall_rating']) + float(data['potential']) + float(data['composure'])) / 3
    prospect = float(data['potential']) / float(data['overall_rating'])
    oportunity = ((float(data['overall_rating']) + float(data['potential'])/2)) / float(data['release_clause_euro'])


    # Fusion de certaines capacitées pour donner du poids
    skills = ['dribbling', 'crossing', 'ball_control', 'stamina', 'short_passing','long_passing','skill_moves']
    tab_skills = {cle: data[cle] for cle in skills}
    valeurs_float_skills = {cle: float(valeur) for cle, valeur in tab_skills.items()}
    weighted_skill_score = sum(valeurs_float_skills.values()) / len(valeurs_float_skills)

    shoot = ['shot_power','long_shots','penalties','finishing','volleys', 'curve', 'freekick_accuracy']
    # création d'un dictionnaire avec toutes les valeurs
    tab_shoot = {cle: data[cle] for cle in shoot}
    valeurs_float_shoot = {cle: float(valeur) for cle, valeur in tab_shoot.items()}
    weighted_shoot_score = sum(valeurs_float_shoot.values()) / len(valeurs_float_shoot)

    player = pd.DataFrame({
    'age': [data['age']],
    'overall_rating': [data['overall_rating']],
    'potential': [data['potential']],
    'international_reputation(1-5)': [data['international_reputation']],
    'wage_euro': [data['wage_euro']],
    'release_clause_euro': [data['release_clause_euro']],
    'reactions': [data['reactions']],
    'composure': [data['composure']],
    'age_to_potential_ratio': [age_to_potential_ratio],
    'performance_index': [performance_index],
    'weighted_skill_score': [weighted_skill_score],
    'weighted_shoot_score': [weighted_shoot_score],
    'prospect': [prospect],
    'oportunity': [oportunity]
    })

    predictions = loaded_model.predict(player)
    prediction_value = predictions[0]
    print("voici la prédiction : " + str(prediction_value))

    response_data = {'Voici la valeur du joueur': str(prediction_value)}
    return jsonify(response_data)

if __name__ == '__main__':
    app.run(debug=True)