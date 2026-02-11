// Array of places to show weather for (name and coordinates)
const places = [
  { name: "Lagos, Nigeria", lat: 6.45, lon: 3.39 },
  { name: "Paris, France", lat: 48.8566, lon: 2.3522 },
  { name: "London, UK", lat: 51.51, lon: -0.13 },
  { name: "Madrid, Spain", lat: 40.4168, lon: -3.7038 },
];

// Open-Meteo weather codes to descriptions
function getWeatherDescription(code) {
  if (code === 0) return "Clear sky";
  if ([1, 2, 3].includes(code)) return "Mainly clear";
  if (code >= 45 && code <= 48) return "Foggy";
  if (code >= 51 && code <= 57) return "Drizzle";
  if (code >= 61 && code <= 67) return "Rain";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 80 && code <= 82) return "Rain showers";
  if (code >= 85 && code <= 86) return "Snow showers";
  if (code === 95) return "Thunderstorm";
  if ([96, 99].includes(code)) return "Thunderstorm with hail";
  return "Unknown condition";
}

async function fetchWeather(place) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${place.lat}&longitude=${place.lon}&current=temperature_2m,weather_code&timezone=auto`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("API response failed");

    const data = await response.json();

    const today = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const temp = data.current.temperature_2m;
    const code = data.current.weather_code;
    const condition = getWeatherDescription(code);

    return `
            <div class="weather-card">
                <div class="city-name">${place.name}</div>
                <div class="date">${today}</div>
                <div class="temp">${temp}°C</div>
                <div class="condition">${condition}</div>
            </div>
        `;
  } catch (error) {
    return `
            <div class="weather-card error">
                <div class="city-name">${place.name}</div>
                <div>Error: ${error.message}</div>
            </div>
        `;
  }
}

async function loadWeather() {
  const container = document.getElementById("weather-container");
  container.innerHTML = "<p>Loading weather...</p>";

  const promises = places.map(fetchWeather);
  const cards = await Promise.all(promises);

  container.innerHTML = cards.join("");
}

window.addEventListener("load", loadWeather);
