

var x = document.getElementById("demo");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position)=>{
                var lat =  position.coords.latitude;
            var long =  position.coords.longitude;
            x.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
            console.log("lat", lat, " long", long);
            const api_url = `/weather_data/lat/${lat}/lon/${long}`
            console.log(api_url);
            const as = await fetch(api_url);
            console.log(as.json());
            const res = await fetch(api_url);
            const json = await res.json(); 
            console.log("json ", json);
            
        });
    
        console.log("supported");

    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
        console.log("not seported")
    }
}

        
let geolocation =  getLocation();
console.log(geolocation);