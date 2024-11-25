// Function to fetch weather data based on latitude and longitude
function fetchWeather() {
    const lat = document.getElementById('latitude').value;
    const lon = document.getElementById('longitude').value;

    if (!lat || !lon) {
        alert('Please enter both latitude and longitude');
        return;
    }

    // Call the Flask backend API to get weather data
    fetch(`/get_weather?lat=${lat}&lon=${lon}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert('Error fetching weather data: ' + data.error);
                return;
            }

            // Auto-fill temperature and humidity values
            document.getElementById('temperature').value = data.temperature;
            document.getElementById('humidity').value = data.humidity;
        })
        .catch(error => {
            alert('Error: ' + error);
        });
}

// Open popup
function openPopup() {
    document.getElementById('popupBox').style.display = 'block';
    document.querySelector('.wrapper').classList.add('blurred'); // Blur the background
}

// Close popup
function closePopup() {
    document.getElementById('popupBox').style.display = 'none';
    document.querySelector('.wrapper').classList.remove('blurred'); // Remove the blur
}

// Handle form submission and show popup with crop suggestions
function submitForm() {
    // Your form submission logic here
}
