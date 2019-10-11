

var x = document.getElementById("demo");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    console.log("supported");
} else {
    x.innerHTML = "Geolocation is not supported by this browser.";
    console.log("not seported")
}
}

function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;
    return [position.coords.latitude, position.coords.longitude];
}
let geolocation =  getLocation();
console.log(geolocation);