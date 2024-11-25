// Replace this with your actual ThingSpeak channel and API key
const API_KEY = 'C8XKVN23FOTJMVHL';
const CHANNEL_ID = '2710873';
const FIELD_NITROGEN = 'field1';  // Example field name for Nitrogen
const FIELD_PHOSPHORUS = 'field2';  // Example field name for Phosphorus
const FIELD_POTASSIUM = 'field3';  // Example field name for Potassium
const FIELD_MOISTURE = 'field4';  // Example field name for Soil Moisture

async function fetchSoilData() {
    try {
        const url = `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json?api_key=${API_KEY}&results=1`;

        const response = await fetch(url);
        const data = await response.json();

        const latestEntry = data.feeds[0];
        if (latestEntry) {
            const nitrogen = latestEntry[FIELD_NITROGEN];
            const phosphorus = latestEntry[FIELD_PHOSPHORUS];
            const potassium = latestEntry[FIELD_POTASSIUM];
            const moisture = latestEntry[FIELD_MOISTURE];

            document.getElementById('nitrogen').value = nitrogen || 'N/A';
            document.getElementById('phosphorus').value = phosphorus || 'N/A';
            document.getElementById('potassium').value = potassium || 'N/A';
            document.getElementById('moisture').value = moisture || 'N/A';
        } else {
            alert('No data available.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Error fetching data. Please try again.');
    }
}
