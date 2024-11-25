const API_KEY = 'jiHcUKYSrkFxXEclxkxKQy0FkhuVHP1r';  // Replace with your Tomorrow.io API key

// Function to get weather data from Tomorrow.io
async function getWeather(lat, lon) {
    const url = `https://api.tomorrow.io/v4/timelines?location=${lat},${lon}&fields=temperature,humidity,windSpeed&timesteps=current&apikey=${API_KEY}`;

    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            const weather = data.data.timelines[0].intervals[0].values;

            const temperature = weather.temperature;
            const humidity = weather.humidity;

            // Auto-fill the temperature and humidity fields in the form
            document.getElementById('temperature').value = temperature;
            document.getElementById('humidity').value = humidity;
        } else {
            console.error(`Error: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        console.error(`Error fetching weather data: ${error}`);
    }
}

// Function to trigger weather fetching when latitude and longitude are entered
function handleLatLongInput() {
    const lat = document.getElementById('latitude').value;
    const lon = document.getElementById('longitude').value;

    if (lat && lon) {
        getWeather(lat, lon);
    }
}

// Add event listeners to latitude and longitude input fields
document.getElementById('latitude').addEventListener('change', handleLatLongInput);
document.getElementById('longitude').addEventListener('change', handleLatLongInput);

// Function to handle form submission (e.g., for crop prediction)
function submitForm() {
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;
    const temperature = document.getElementById('temperature').value;
    const humidity = document.getElementById('humidity').value;
    const soilType = document.getElementById('soilType').value;

    // Populate the modal content with the result
    const outputText = `
        Crop: Paddy <br>
        Predicted Yeild: 25 bags/acre <br>
    `;

    document.getElementById('suggestionsContent').innerHTML = outputText;

    // Show the modal
    const popup = document.getElementById('popupBox');
    popup.style.display = 'block';
}

// Function to close the popup
function closePopup() {
    const popup = document.getElementById('popupBox');
    popup.style.display = 'none';
}

