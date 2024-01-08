import joblib
import pandas as pd


loaded_model = joblib.load('random_forest_model.pkl')


#Prediction pour un joueur

player = pd.DataFrame({
    'age': [28],
    'overall_rating': [99],
    'potential': [99],
    'international_reputation(1-5)': [4],
    'wage_euro': [150000],
    'release_clause_euro': [0],
    'reactions': [87],
    'composure': [85],
    'age_to_potential_ratio': [0.304],
    'performance_index': [0.882],
    'weighted_skill_score': [0.75],
    'weighted_shoot_score': [0.82],
    'prospect': [0.9]
})

# Make predictions on new data
predictions = loaded_model.predict(player)

# Display the predictions
print("Predicted value for the new player:", predictions)