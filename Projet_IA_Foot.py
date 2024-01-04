import pandas as pd
import plotly.express as px
import numpy as np
import plotly.figure_factory as ff
import plotly.graph_objects as go

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.svm import SVR
from sklearn.metrics import make_scorer, r2_score, mean_squared_error
from sklearn.model_selection import cross_val_score, KFold
import joblib

# Chargement du dataset

path = "./fifa_players.csv"
fifa_data = pd.read_csv(path)


##########################################################################################################################################################################
# Prétraitement des données 
##########################################################################################################################################################################


#Remplacement des données manquante dans les catégories "value_euro", "wage_euro" et "release_clause_euro"
#On utilise la valeur median pour ne pas la modifier car elle peut etre utile pour de futur calcul

value_euro_median = fifa_data['value_euro'].median()
wage_euro_median = fifa_data['wage_euro'].median()
release_clause_euro_median = fifa_data['release_clause_euro'].median()

fifa_data['value_euro'].fillna(value_euro_median, inplace=True)
fifa_data['wage_euro'].fillna(wage_euro_median, inplace=True)
fifa_data['release_clause_euro'].fillna(wage_euro_median, inplace=True)


#Changer le type des données qui ne sont pas des chiffres
fifa_data['preferred_foot'] = fifa_data['preferred_foot'].map({'Left': '1', 'Right': '2'}).astype(int)


# Affichage du prix des joueurs en fonction du poste principale
fifa_data['primary_position'] = fifa_data['positions'].str.split(',').str[0]

#on cherche maintenant à remplacer les postes par des nombres
fifa_data['primary_position'] = fifa_data['primary_position'].map({'CB': '1', 'ST': '2' , 'CM': '3','CAM': '4','CDM': '5','GK': '6',
                                                                   'LM': '7','RM': '8','RB': '9','LB': '10','RW': '11','LW': '12','CF': '13',
                                                                   'RWB': '14','LWB': '15'}).astype(int)

##########################################################################################################################################################################
# Matrice de corrélation
##########################################################################################################################################################################

# Sélection des valeurs numérique pour la corrélation
numeric_columns = fifa_data.select_dtypes(include=[np.number])

# Prise en charge en cas de valeurs manquantes
numeric_columns.fillna(method='bfill', inplace=True)
correlation_matrix = numeric_columns.corr()

# Création de la matrice de corrélation avec Plotly
fig = ff.create_annotated_heatmap(
    z=correlation_matrix.to_numpy(),
    x=correlation_matrix.columns.tolist(),
    y=correlation_matrix.columns.tolist(),
    colorscale='Viridis',
    annotation_text=correlation_matrix.round(2).to_numpy(),
    showscale=True
)

# Ajustement de la taille de la matrice 
fig.update_layout(
    title='Correlation Matrix',
    xaxis_title='Features',
    yaxis_title='Features',
    height=2000,  # Adjust the height as needed
    width=2000    # Adjust the width as needed
)

# Affichage de la matrice
#fig.show()

# Sauvegarder l'image
#sauv = go.Figure()
#sauv.write_image("Matrice_de_Correlation.png")


##########################################################################################################################################################################
# Données liées à la colonne value_euro
##########################################################################################################################################################################

# Sélectionner seulement les colonnes numériques pour la matrice de corrélation
numeric_columns = fifa_data.select_dtypes(include=[np.number])

# Remplir les valeurs manquantes, par exemple en utilisant la méthode de remplissage arrière (bfill)
numeric_columns.fillna(method='bfill', inplace=True)

# Extraire la matrice de corrélation uniquement pour la colonne "value-euro"
correlation_with_value_euro = numeric_columns.corr()['value_euro']

# Créer un dataframe pour la colonne "value-euro" et ses corrélations avec d'autres colonnes
correlation_df = pd.DataFrame(correlation_with_value_euro)
#print(correlation_df)

# On fait maintenant le trie deans ces valeurs

# Filtrer les corrélations supérieures à 0.4
corr_above_threshold = correlation_df[correlation_df['value_euro'] > 0.4]

# Filtrer les corrélations comprisent entre 0.2 et 0.4
corr_between_thresholds = correlation_df[(correlation_df['value_euro'] >= 0.2) & (correlation_df['value_euro'] <= 0.4)]

# Afficher le résultat des valeurs > 0.4 puis 0.2 < x < 0.4
#print(corr_above_threshold)
#print("------------------------------------")
#print(corr_between_thresholds)


##########################################################################################################################################################################
# Données liées à la colonne value_euro
##########################################################################################################################################################################

#--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
# Feature Engineering
#--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

fifa_data['age_to_potential_ratio'] = fifa_data['age'] / fifa_data['potential']
fifa_data['performance_index'] = (fifa_data['overall_rating'] + fifa_data['potential'] + fifa_data['composure']) / 3
fifa_data['prospect'] = fifa_data['potential'] / fifa_data['overall_rating']


# Skill attributes for Weighted Skill Score
skills = ['dribbling', 'crossing', 'ball_control', 'stamina', 'short_passing','long_passing','skill_moves(1-5)']
shoot = ['shot_power','long_shots','penalties','finishing','volleys', 'curve', 'freekick_accuracy']

fifa_data['weighted_skill_score'] = fifa_data[skills].mean(axis=1)
fifa_data['weighted_shoot_score'] = fifa_data[shoot].mean(axis=1)

#--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
# Training Model
#--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Defining the features and target variable
features = ['age', 'overall_rating', 'potential', 'international_reputation(1-5)', 'wage_euro',
            'release_clause_euro', 'reactions', 'composure','age_to_potential_ratio','performance_index','weighted_skill_score','weighted_shoot_score','prospect']
targets = ['value_euro']

# Splitting the dataset
X = fifa_data[features]
y = fifa_data[targets]
y = y.values.ravel()


# Improved Model using Random Forest with Cross-Validation
random_forest_model = RandomForestRegressor(n_estimators=100, random_state=42)

# Use KFold cross-validation with 10 folds
kf = KFold(n_splits=10, shuffle=True, random_state=42)

# Perform cross-validation and calculate RMSE and R²
cross_val_results_rmse = cross_val_score(random_forest_model, X, y, cv=kf, scoring=make_scorer(mean_squared_error, squared=False))
cross_val_results_r2 = cross_val_score(random_forest_model, X, y, cv=kf, scoring='r2')

# Entraîner le modèle
random_forest_model.fit(X, y)

# Sauvegarder le modèle dans un fichier
joblib.dump(random_forest_model, 'random_forest_model.pkl')

# Charger le modèle à partir du fichier dans un autre script
loaded_model = joblib.load('random_forest_model.pkl')

# Displaying the results
print("Improved Random Forest Model with Cross-Validation:")
print(f"Average RMSE across 10 folds: {np.mean(cross_val_results_rmse)}")
print(f"Average R² across 10 folds: {np.mean(cross_val_results_r2)}")


