import pandas as pd

# Crop NPK requirements
crop_npk_requirements = {
    'Rice': {
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
        'Loamy_Soil': {
            'N': {'Month_1': 22, 'Month_2': 28, 'Month_3': 28, 'Month_4': 20, 'Month_5': 12, 'Month_6': 12, 'Total': 130},
            'P': {'Month_1': 32, 'Month_2': 22, 'Month_3': 12, 'Month_4': 12, 'Month_5': 10, 'Month_6': 10, 'Total': 98},
            'K': {'Month_1': 22, 'Month_2': 22, 'Month_3': 15, 'Month_4': 10, 'Month_5': 12, 'Month_6': 18, 'Total': 109},
        },
    },
}

# Fertilizer data
fertilizer_data = pd.DataFrame({
    'Fertilizer': ['Urea', 'DAP', 'MOP'],
    'N_content': [46, 18, 0],
    'P_content': [0, 46, 0],
    'K_content': [0, 0, 60],
    'Cost_per_kg': [4.78, 10.43, 5.00],
})

# Function to recommend fertilizers based on soil NPK, soil type, and month
def recommend_fertilizers(crop, soil_type, soil_n, soil_p, soil_k, area_acres, month):
    crop_npk = crop_npk_requirements.get(crop, {}).get(soil_type)

    if not crop_npk:
        return "Crop or soil type not found!", None

    area_hectares = area_acres * 0.404686

    # Get the nutrient requirement for the specified month
    n_required = crop_npk['N'].get(month, 0)
    p_required = crop_npk['P'].get(month, 0)
    k_required = crop_npk['K'].get(month, 0)

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

    total_cost *= area_acres

    return fertilizer_recommendations, total_cost

# Example usage with input
crop = input("Enter crop name (e.g., 'Rice'): ")
soil_type = input("Enter soil type (e.g., 'Loamy_Soil'): ")
soil_n = float(input("Enter available Nitrogen (N) in kg/ha: "))
soil_p = float(input("Enter available Phosphorus (P) in kg/ha: "))
soil_k = float(input("Enter available Potassium (K) in kg/ha: "))
area_acres = float(input("Enter area in acres: "))
month = input("Enter the month (e.g., 'Month_6'): ")

# Call the function
fertilizers, cost = recommend_fertilizers(crop, soil_type, soil_n, soil_p, soil_k, area_acres, month)

# Output the fertilizer recommendations and cost
print(f"\nFertilizer recommendations for {crop} in {month} on {soil_type}:\n")
if fertilizers:
    for recommendation in fertilizers:
        print(recommendation)
    print(f"\nTotal cost for {area_acres} acres: ₹{cost:.2f}\n")
else:
    print(fertilizers)