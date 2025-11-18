console.log("✅ Frontend loaded");

let map;

function initMap() {
  console.log("✅ Initializing map...");

  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 39.8, lng: -89.4 },
    zoom: 6,
    mapTypeId: "hybrid",
  });

  map.data.loadGeoJson("us-states.json", {}, () => {
    console.log("✅ US states GeoJSON loaded");
  });
}

document.getElementById("submit-btn").addEventListener("click", handlePrompt);

async function handlePrompt() {
  const prompt = document.getElementById("prompt-input").value;
  console.log("🧠 Sending prompt:", prompt);

  try {
    const response = await fetch("http://localhost:3000/api/generate-map-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) throw new Error("Server error " + response.status);

    const instructions = await response.json();
    console.log("📦 Instructions received:", instructions);

    applyInstructions(instructions);
  } catch (err) {
    console.error("❌ Failed:", err);
  }
}

function applyInstructions(instructions) {
  // Reset
  map.data.revertStyle();

  // Highlight requested states
  if (instructions.highlightStates) {
    map.data.forEach((feature) => {
      const stateName = feature.getProperty("NAME"); // GeoJSON uses NAME
      if (instructions.highlightStates.includes(stateName)) {
        console.log("✅ Highlighting:", stateName);
        map.data.overrideStyle(feature, {
          fillColor: "#cc0000",
          fillOpacity: 0.6,
          strokeColor: "black",
          strokeWeight: 2,
        });
      }
    });
  }

  // Labels
  if (instructions.labels) {
    instructions.labels.forEach((label) => {
      const feature = findStateFeature(label.name);
      if (feature) {
        const bounds = new google.maps.LatLngBounds();
        feature.getGeometry().forEachLatLng((latlng) => bounds.extend(latlng));
        const center = bounds.getCenter();

        new google.maps.InfoWindow({
          content: `<div style="color:black;font-weight:bold;">${label.name}</div>`,
          position: center,
        }).open(map);
        console.log("✅ Label added:", label.name);
      }
    });
  }

  // Markers
  if (instructions.markers) {
    instructions.markers.forEach((m) => {
      new google.maps.Marker({
        map,
        position: { lat: m.lat, lng: m.lng },
        title: m.name,
      });
      console.log("✅ Marker added:", m.name);
    });
  }
}

function findStateFeature(name) {
  let found = null;
  map.data.forEach((feature) => {
    if (feature.getProperty("NAME") === name) found = feature;
  });
  return found;
}
