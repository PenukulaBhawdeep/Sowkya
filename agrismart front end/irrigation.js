// Crop Data for Monthly Irrigation Cycles
const cropData = [
    { crop: "Rice", month: "June", stage: "Land preparation, Sowing (Nursery)", depth: 50, frequency: "2-3", waterRequirement: 300 },
    { crop: "Rice", month: "July", stage: "Transplanting, Early Vegetative", depth: 50, frequency: "3-4", waterRequirement: 250 },
    { crop: "Rice", month: "August", stage: "Vegetative (Tillering)", depth: 75, frequency: "4-5", waterRequirement: 400 },
    { crop: "Maize", month: "July", stage: "Vegetative Growth", depth: 50, frequency: "3-4", waterRequirement: 200 },
    { crop: "Maize", month: "August", stage: "Tasseling", depth: 60, frequency: "4-5", waterRequirement: 300 },
    { crop: "Groundnut", month: "June", stage: "Land Preparation and Sowing", depth: 30, frequency: "2-3", waterRequirement: 120 },
    { crop: "Red Gram", month: "August", stage: "Branching", depth: 50, frequency: "4-5", waterRequirement: 220 }
];

// Tomorrow.io API details
const API_KEY = 'PtOfldhuA5hMqeeoHH9OpZ9fuGje0vsm'; // Replace with your valid API key

// Function to fetch weather data
async function getWeatherData(lat, lon) {
    const url = `https://api.tomorrow.io/v4/timelines?location=${lat},${lon}&fields=temperature,humidity,windSpeed,precipitationIntensity&timesteps=1d&timezone=auto&apikey=${API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.status}, ${response.statusText}`);
        const data = await response.json();
        return data.data.timelines[0].intervals;
    } catch (error) {
        console.error("Weather API error:", error);
    }
}

// Function to get water quantity based on soil moisture
function getWaterQuantity(stage, soilMoisture) {
    const baseWater = cropData.find(item => item.stage === stage)?.depth || 50;

    if (soilMoisture < 30) return baseWater + 10; // Increase by 10mm if soil is very dry
    if (soilMoisture >= 30 && soilMoisture < 50) return baseWater; // Standard water requirement
    return Math.max(baseWater - 10, 10); // Reduce water if soil is sufficiently moist
}

// Function to display irrigation results
function displayResults(waterQuantity, frequency, rainDates) {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `
        <h2>Irrigation Recommendations</h2>
        <p>Water Quantity: Apply <strong>${waterQuantity} mm</strong> of water.</p>
        <p>Frequency: Irrigate every <strong>${frequency} days</strong>.</p>
        ${rainDates.length > 0 ? `<p>Rain expected on: ${rainDates.join(", ")}</p>` : '<p>No rain expected in the next few days.</p>'}
        <h3>Irrigation Efficiency Tips:</h3>
        <ul>
            <li>Use drip or furrow irrigation to minimize water loss.</li>
            <li>Water early in the morning or late in the evening to reduce evaporation.</li>
        </ul>
    `;
}

// Function to provide weather and irrigation recommendations
async function getWeatherAndRecommendations(lat, lon, crop, cropStage, soilMoisture) {
    const intervals = await getWeatherData(lat, lon);

    if (!intervals) return;

    let totalRainfall = 0;
    const rainDates = [];

    // Check the rainfall forecast for the next 5 days
    intervals.slice(0, 5).forEach(day => {
        const date = day.startTime.slice(0, 10);
        const rainAmount = day.values.precipitationIntensity || 0;
        totalRainfall += rainAmount;
        if (rainAmount > 0) rainDates.push(date);
    });

    // Irrigation timing recommendations
    if (totalRainfall >= 10) {
        console.log(`Rain expected on ${rainDates.join(", ")}. Skip irrigation to avoid over-watering.`);
    } else {
        console.log("Dry weather expected for the next 4-5 days.");
        if (soilMoisture < 40) {
            console.log("Soil moisture is low, irrigation needed within the next 24 hours.");
        } else {
            console.log("Soil moisture is adequate; monitor for changes.");
        }
    }

    // Water quantity recommendations
    const waterQuantity = getWaterQuantity(cropStage, soilMoisture);
    console.log(`Water Quantity: Apply ${waterQuantity} mm of water.`);

    // Frequency recommendations
    const frequency = cropData.find(item => item.crop === crop && item.stage === cropStage)?.frequency;
    console.log(`Frequency: Irrigate every ${frequency} days.`);

    // Display results
    displayResults(waterQuantity, frequency, rainDates);
}

// Form submission handler
document.getElementById("irrigationForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const lat = parseFloat(document.getElementById("latitude").value);
    const lon = parseFloat(document.getElementById("longitude").value);
    const crop = document.getElementById("cropType").value;
    const soilMoisture = parseFloat(document.getElementById("soilMoisture").value);
    const cropStage = document.getElementById("growthStage").value;

    await getWeatherAndRecommendations(lat, lon, crop, cropStage, soilMoisture);
});
