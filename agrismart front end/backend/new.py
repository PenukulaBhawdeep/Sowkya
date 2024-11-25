import pandas as pd

# Crop-specific nutrient requirements (NPK) in kg/ha for Rice by month
crop_npk_requirements = {
    'Rice': {
        'Black_Soil': {
            'N': {'Month_1': 25, 'Month_2': 35, 'Month_3': 30, 'Month_4': 25, 'Month_5': 15, 'Month_6': 10, 'Total': 140},
            'P': {'Month_1': 30, 'Month_2': 25, 'Month_3': 20, 'Month_4': 10, 'Month_5': 10, 'Month_6': 5, 'Total': 100},
            'K': {'Month_1': 30, 'Month_2': 25, 'Month_3': 20, 'Month_4': 10, 'Month_5': 10, 'Month_6': 25, 'Total': 120},
        },
        'Alluvial_Soil': {
            'N': {'Month_1': 20, 'Month_2': 30, 'Month_3': 30, 'Month_4': 20, 'Month_5': 10, 'Month_6': 10, 'Total': 130},
            'P': {'Month_1': 30, 'Month_2': 20, 'Month_3': 10, 'Month_4': 10, 'Month_5': 10, 'Month_6': 10, 'Total': 100},
            'K': {'Month_1': 20, 'Month_2': 20, 'Month_3': 15, 'Month_4': 10, 'Month_5': 10, 'Month_6': 20, 'Total': 105},
        },
        'Clayey_Soil': {
            'N': {'Month_1': 25, 'Month_2': 35, 'Month_3': 30, 'Month_4': 20, 'Month_5': 15, 'Month_6': 10, 'Total': 135},
            'P': {'Month_1': 35, 'Month_2': 25, 'Month_3': 15, 'Month_4': 10, 'Month_5': 10, 'Month_6': 10, 'Total': 105},
            'K': {'Month_1': 25, 'Month_2': 25, 'Month_3': 15, 'Month_4': 10, 'Month_5': 10, 'Month_6': 25, 'Total': 120},
        },
        'Red_Soil': {
            'N': {'Month_1': 30, 'Month_2': 35, 'Month_3': 25, 'Month_4': 15, 'Month_5': 15, 'Month_6': 10, 'Total': 130},
            'P': {'Month_1': 32, 'Month_2': 22, 'Month_3': 12, 'Month_4': 12, 'Month_5': 10, 'Month_6': 12, 'Total': 100},
            'K': {'Month_1': 22, 'Month_2': 22, 'Month_3': 18, 'Month_4': 10, 'Month_5': 12, 'Month_6': 20, 'Total': 104},
        },
    },
    # Other crops (Cotton, Maize) would follow the same structure as above...
}

# Fertilizer data
fertilizer_data = pd.DataFrame({
    'Fertilizer': ['Urea', 'DAP', 'MOP', 'SSP', 'Ammonium Sulphate', 'Potash', 'Zinc Sulphate', 'Gypsum',
                   'Calcium Nitrate', 'NPK 10-26-26', 'NPK 20-20-0', 'NPK 12-32-16', 'Ammonium Nitrate', 
                   'Magnesium Sulphate', 'Ferrous Sulphate', 'Boron'],
    'N_content': [46, 18, 0, 0, 21, 0, 0, 0, 15.5, 10, 20, 12, 33.5, 0, 0, 0],
    'P_content': [0, 46, 0, 16, 0, 0, 0, 0, 0, 26, 20, 32, 0, 0, 0, 0],
    'K_content': [0, 0, 60, 0, 0, 50, 0, 0, 0, 26, 0, 16, 0, 0, 0, 0],
    'Cost_per_kg': [4.78, 10.43, 5.00, 3.75, 6.50, 8.00, 15.00, 2.50, 20.00, 30.00, 15.00, 22.00, 12.00, 18.00, 10.00, 25.00],
})

# Function to predict fertilizer requirements based on soil NPK and month
def recommend_fertilizers(crop, soil_n, soil_p, soil_k, area_acres, month):
    crop_npk = crop_npk_requirements.get(crop)

    if not crop_npk:
        return "Crop not found!"

    area_hectares = area_acres * 0.404686

    # Get the nutrient requirement for the specified month
    n_required = crop_npk['Black_Soil']['N'].get(month, 0)  # Assuming Black Soil for simplicity
    p_required = crop_npk['Black_Soil']['P'].get(month, 0)
    k_required = crop_npk['Black_Soil']['K'].get(month, 0)

    n_deficit = max(0, n_required - soil_n)
    p_deficit = max(0, p_required - soil_p)
    k_deficit = max(0, k_required - soil_k)

    fertilizer_recommendations = []
    total_cost = 0

    # Calculate required fertilizers
    if n_deficit > 0:
        urea_needed_ha = n_deficit / fertilizer_data.loc[fertilizer_data['Fertilizer'] == 'Urea', 'N_content'].values[0]
        urea_needed_total = urea_needed_ha * area_hectares
        cost_urea = urea_needed_ha * fertilizer_data.loc[fertilizer_data['Fertilizer'] == 'Urea', 'Cost_per_kg'].values[0] * area_hectares
        fertilizer_recommendations.append(f'Urea: {urea_needed_total:.2f} kg (Cost: ₹{cost_urea:.2f})')
        total_cost += cost_urea

    if p_deficit > 0:
        dap_needed_ha = p_deficit / fertilizer_data.loc[fertilizer_data['Fertilizer'] == 'DAP', 'P_content'].values[0]
        dap_needed_total = dap_needed_ha * area_hectares
        cost_dap = dap_needed_ha * fertilizer_data.loc[fertilizer_data['Fertilizer'] == 'DAP', 'Cost_per_kg'].values[0] * area_hectares
        fertilizer_recommendations.append(f'DAP: {dap_needed_total:.2f} kg (Cost: ₹{cost_dap:.2f})')
        total_cost += cost_dap

    if k_deficit > 0:
        mop_needed_ha = k_deficit / fertilizer_data.loc[fertilizer_data['Fertilizer'] == 'MOP', 'K_content'].values[0]
        mop_needed_total = mop_needed_ha * area_hectares
        cost_mop = mop_needed_ha * fertilizer_data.loc[fertilizer_data['Fertilizer'] == 'MOP', 'Cost_per_kg'].values[0] * area_hectares
        fertilizer_recommendations.append(f'MOP: {mop_needed_total:.2f} kg (Cost: ₹{cost_mop:.2f})')
        total_cost += cost_mop

    return fertilizer_recommendations, total_cost

# Function to get user input
def get_user_input():
    crop = input("Enter the crop (e.g., Rice): ")
    area_acres = float(input("Enter the area in acres: "))
    soil_n = float(input("Enter the soil Nitrogen (N) content (kg/ha): "))
    soil_p = float(input("Enter the soil Phosphorus (P) content (kg/ha): "))
    soil_k = float(input("Enter the soil Potassium (K) content (kg/ha): "))
    month = input("Enter the month (e.g., Month_1, Month_2): ")
    return crop, area_acres, soil_n, soil_p, soil_k, month

# Example usage
if __name__ == "__main__":
    crop, area_acres, soil_n, soil_p, soil_k, month = get_user_input()
    recommendations, cost = recommend_fertilizers(crop, soil_n, soil_p, soil_k, area_acres, month)
    print("Fertilizer Recommendations:")
    for recommendation in recommendations:
        print(recommendation)
    print(f"Total Cost: ₹{cost:.2f}")