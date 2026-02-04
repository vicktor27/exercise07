<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>OpenStreetMap + Leaflet (Local Page)</title>

    <!-- Leaflet CSS -->
    <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
      crossorigin=""
    />

    <style>
      /* Required: map container must have a height */
      #map {
        height: 520px;
        width: 100%;
        border-radius: 12px;
      }

      body {
        margin: 16px;
        font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
      }
    </style>

  </head>
  <body>
    <h1>My OpenStreetMap</h1>
    <div id="map"></div>

    <!-- Leaflet JS -->
    <script
      src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
      integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
      crossorigin=""
    ></script>

    <script>
      // 1) Choose a default center (Monterrey example). Change to your location.
      const center = [25.6866, -100.3161];
      const zoom = 13;

      // 2) Create the map
      const map = L.map("map").setView(center, zoom);

      // 3) Add the OpenStreetMap tiles
      // Note: respect OSM tile usage policy for production/high traffic.
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // 4) Add a marker + popup
      L.marker(center)
        .addTo(map)
        .bindPopup("<b>Hello!</b><br>This is my marker.")
        .openPopup();

      // 5) Click handler (drops a marker where you click)
      let clickMarker = null;
      map.on("click", (e) => {
        const { lat, lng } = e.latlng;

        if (clickMarker) map.removeLayer(clickMarker);

        clickMarker = L.marker([lat, lng]).addTo(map).bindPopup(
          `Lat: ${lat.toFixed(6)}<br>Lng: ${lng.toFixed(6)}`
        );

        clickMarker.openPopup();
      });
    </script>

  </body>
</html>
