import pandas as pd
import requests

# Tomorrow.io API details
API_KEY = 'jiHcUKYSrkFxXEclxkxKQy0FkhuVHP1r'  # Replace with your valid API key

# Data for Monthly Irrigation Cycles of Various Crops
data = {
    "Crop": ["Rice", "Rice", "Rice", "Rice", "Rice", "Rice",
             "Maize", "Maize", "Maize", "Maize", "Maize", "Maize",
             "Groundnut", "Groundnut", "Groundnut", "Groundnut", "Groundnut", "Groundnut",
             "Red Gram", "Red Gram", "Red Gram", "Red Gram", "Red Gram", "Red Gram"],
    "Month": ["June", "July", "August", "September", "October", "November"] * 4,
    "Growth Stage": [
        "Land preparation, Sowing (Nursery)", "Transplanting, Early Vegetative", 
        "Vegetative (Tillering)", "Reproductive (Panicle initiation)", 
        "Flowering and Grain Filling", "Maturity and Harvest",
        "Sowing", "Vegetative Growth", "Tasseling", "Silking", 
        "Grain Filling", "Maturity",
        "Land Preparation and Sowing", "Vegetative Growth", 
        "Flowering", "Pod Development", "Seed Filling", "Maturity",
        "Sowing", "Vegetative Growth", "Branching", "Flowering", 
        "Pod Development", "Maturity"
    ],
    "Irrigation Depth per Application (mm)": [50, 50, 75, 80, 80, 50,
                                              40, 50, 60, 70, 70, 50,
                                              30, 40, 50, 55, 60, 40,
                                              30, 40, 50, 60, 60, 50],
    "Frequency (Days)": ["2-3", "3-4", "4-5", "5-6", "7", "As needed (if dry)"] * 4,
    "Water Requirement (mm/month)": [300, 250, 400, 500, 400, 100,
                                     150, 200, 300, 350, 300, 100,
                                     120, 180, 250, 300, 280, 80,
                                     100, 150, 220, 250, 300, 120]
}

df = pd.DataFrame(data)

# Function to get weather data and recommendations
def get_weather_and_recommendations(lat, lon, crop, crop_stage, soil_moisture):
    url = f"https://api.tomorrow.io/v4/timelines?location={lat},{lon}&fields=temperature,humidity,windSpeed,precipitationIntensity&timesteps=1d&timezone=auto&apikey={API_KEY}"

    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        intervals = data['data']['timelines'][0]['intervals']

        # Extract weather data
        rain_forecast = False
        rain_dates = []
        total_rainfall = 0

        # Check rainfall forecast for the next 4-5 days
        for i, day in enumerate(intervals[:5]):
            date = day['startTime'][:10]
            rain_amount = day['values'].get('precipitationIntensity', 0)
            total_rainfall += rain_amount

            if rain_amount > 0:
                rain_forecast = True
                rain_dates.append(date)

        # Weather output
        print("\n--- Current Weather ---")
        today = intervals[0]['values']
        print(f"Temperature: {today['temperature']}°C")
        print(f"Humidity: {today['humidity']}%")
        print(f"Wind Speed: {today['windSpeed']} m/s")

        # Irrigation timing recommendations
        if total_rainfall >= 10:
            print(f"\nIrrigation Timing: Rain is expected over the next few days ({', '.join(rain_dates)}).")
            print("Skip irrigation to avoid over-watering.")
        else:
            print("\nIrrigation Timing: Dry weather is expected over the next 4-5 days.")
            if soil_moisture < 40:
                print("Soil moisture is low, irrigation is needed within the next 24 hours.")
            else:
                print("Soil moisture is adequate; monitor for changes over the next few days.")

        # Water quantity recommendations
        water_quantity = get_water_quantity(crop_stage, soil_moisture)
        print(f"\nWater Quantity: For your current crop stage, apply {water_quantity} mm of water to the field.")

        # Frequency recommendations
        frequency = df.loc[(df['Crop'] == crop) & (df['Growth Stage'] == crop_stage), 'Frequency (Days)'].values[0]
        print(f"\nFrequency: Irrigate every {frequency} days to maintain optimal moisture.")

        # Irrigation efficiency tips
        print("\nIrrigation Efficiency Tips:")
        print("1. Use drip irrigation or furrow irrigation to minimize water loss.")
        print("2. Water early in the morning or late in the evening to reduce evaporation.")

    else:
        print(f"Error: {response.status_code}, {response.text}")

# Helper function to determine water quantity based on crop stage and soil moisture
def get_water_quantity(stage, soil_moisture):
    base_water = df.loc[df['Growth Stage'] == stage, 'Irrigation Depth per Application (mm)'].values[0]

    # Adjust water quantity based on soil moisture levels
    if soil_moisture < 30:
        return base_water + 10  # Increase by 10mm if soil is very dry
    elif 30 <= soil_moisture < 50:
        return base_water  # Standard water requirement
    else:
        return max(base_water - 10, 10)  # Reduce water if soil is sufficiently moist

# Function to display irrigation cycle for the selected crop
def display_irrigation_cycle(crop):
    print(f"\n--- Monthly Irrigation Cycle for {crop} ---")
    crop_data = df[df['Crop'] == crop]
    print(crop_data.to_string(index=False))

# Example usage
def main():
    lat = input("Enter Latitude: ")
    lon = input("Enter Longitude: ")
    crop = input("Enter Crop (Rice, Maize, Groundnut, Red Gram): ").capitalize()

    if crop not in df['Crop'].unique():
        print("Invalid crop selection.")
        return

    print("\nSelect the Current Growth Stage:")
    stages = df[df['Crop'] == crop]['Growth Stage'].unique()
    for i, stage in enumerate(stages):
        print(f"{i + 1}. {stage}")
    stage_index = int(input("Enter the stage number: ")) - 1
    crop_stage = stages[stage_index]

    soil_moisture = int(input("Enter current soil moisture level (0-100): "))

    display_irrigation_cycle(crop)
    get_weather_and_recommendations(lat, lon, crop, crop_stage, soil_moisture)

# Run the main function
main()