// 1) Choose a default center (Monterrey example). Change to your location.
const center = [25.50124, -103.55115];
const zoom = 15;

const supaBaseUrl = "https://zlgrbrvsnrtqogqbtrza.supabase.co";
const supaBaseKey = "sb_publishable_Rx7zCbB91rQpBnNju_lSzA_Uo6ggRYu";
supabase = window.supabase.createClient(supaBaseUrl, supaBaseKey); // crear una conexion a la base de datos

//a la variable v1 relacionala al id title del documento
const v1 = document.querySelector("#title");

v1.textContent = "Universidad Tecnologica de la Laguna Durango";

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
L.marker(center).addTo(map).bindPopup(v1.textContent).openPopup();

// 5) Click handler (drops a marker where you click)
let clickMarker = null; //PARA CREAR MARCADORES

map.on("click", async (e) => {
  const { lat, lng } = e.latlng; //e.latlng ES TOMAR LA LAT Y LONG DE DONDE CLICK

  //  if (clickMarker) map.removeLayer(clickMarker); //ES BORRAR EL MARCADOR ANTERIOR

  clickMarker = L.marker([lat, lng])
    .addTo(map)
    .bindPopup(`Lat: ${lat.toFixed(6)}<br>Lng: ${lng.toFixed(6)}`);
  //supabase en tu tabla coordiantes haz un insert de
  const { error } = await supabase.from("cordinates").insert([
    {
      lat: lat,
      lng: lng,
    },
  ]);
  clickMarker.openPopup();
});
