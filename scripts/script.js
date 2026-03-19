// 1) Choose a default center (Monterrey example). Change to your location.
const center = [26.50124, -103.55115];
const zoom = 10;

const popup = document.querySelector(".popup");
const inputLatitude = document.querySelector(".Latitude");
const inputLongitude = document.querySelector(".longitude");
const buttonCancel = document.querySelector(".cancel");
const buttonSave = document.querySelector(".cancel");

//EL e.preventDefault EVITA QUE SE ACTUALIZE LA PAGINA
//por que las formas hacen eso
//por default con los botones

buttonCancel.addEventListener("click", (e) => {
  e.preventDefault();
  popup.close();
});

buttonSave.addEventListener("click", (e) => {
  e.preventDefault();
  popup.close();
});

buttonCancel.addEventListener("click", (e) => {
  e.preventDefault();
  popup.close();
});
/*    <dialog class="popup" id="emiliano">
      <form class="form" action="">
        <p>Place Name</p>
        <input type="text" />
      </form>
    </dialog>*/

//const emiliano = document.querySelector("#emiliano");

const supaBaseUrl = "https://zlgrbrvsnrtqogqbtrza.supabase.co";
const supaBaseKey = "sb_publishable_Rx7zCbB91rQpBnNju_lSzA_Uo6ggRYu";

const map = L.map("map").setView(center, zoom);
supabase = window.supabase.createClient(supaBaseUrl, supaBaseKey); // crear una conexion a la base de datos

var myCustomIcon = L.icon({
  iconUrl: "../images/icons/pig.ico", // Relative or absolute path
  shadowUrl: "",
  iconSize: [48, 48], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  iconAnchor: [30, 30], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

async function loadSavedIcons() {
  const { data, error } = await supabase.from("cordinates").select("*");

  if (error) {
    console.error("Error from Supabase", error);
    return;
  }

  data.forEach((element) => {
    clickMarker = L.marker([element.lat, element.lng], {
      icon: myCustomIcon,
    }).addTo(map);
  });
}

loadSavedIcons();

//variable1.textContent = "HOLA COMPAÑEROS!!!";

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

//L.marker(center).addTo(map).bindPopup(v1.textContent).openPopup();

let clickMarker = null; //PARA CREAR MARCADORES

map.on("click", async (e) => {
  const { lat, lng } = e.latlng; //e.latlng ES TOMAR LA LAT Y LONG DE DONDE CLICK

  inputLatitude.value = lat;
  inputLongitude.value = lng;
  popup.showModal();
  clickMarker = L.marker([lat, lng], { icon: myCustomIcon })
    .addTo(map)
    .bindPopup(`Lat: ${lat.toFixed(6)}<br>Lng: ${lng.toFixed(6)}`);

  const { error } = await supabase.from("cordinates").insert([
    {
      lat: lat,
      lng: lng,
    },
  ]);

  //AQUI MOVIMOS EL CODIGO QUE GUARDA EN LA SUPABASE AL LISTNER DEL buttonSave
  clickMarker.openPopup();
});
