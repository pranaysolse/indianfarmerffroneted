var query = document.getElementById("query");

var visualizer = document.getElementById("container");

const url = "/get_crop_data"

async function get_crop_data(){
    const response = await fetch(url);
    const json = await response.json();
    return json;
}


const data = get_crop_data();

var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
    // state_list();
};
span.onclick = function() {
    modal.style.display = "none";
};
    
