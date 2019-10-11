var list_state = document.getElementById("list_state");

var list_district = document.getElementById("list_district");

var list_market = document.getElementById("list_market");

var submit = document.getElementById("submit");

const url = "/get_crop_data";
// load state list
async function state_list() {
  const response = await fetch(url);
  const json = await response.json();
  var st = [];
  for (var i = 0; i <4235; i++) {
    st[i] = json[i].state;
  }
  var state = Array.from(new Set(st));
  var select = list_state,
    state;

  for (var i = 0; i <= state.length - 1; i++) {
    var option = document.createElement("option"),
      txt = document.createTextNode(state[i]);
    option.appendChild(txt);
    select.insertBefore(option, select.lastChild);
  }
  return;
}

list_state.onchange = async function() {
  $("#list_district").empty();
  $("#list_market").empty();
  
  const response = await fetch("/get_crop_data");
  const json = await response.json();
  var dt = [];
  
  for (var i = 0; i < 4235; i++) {
    if ($("#list_state").val() == json[i].state){ 
      dt[i] = json[i].district;    // console.log(ct[i]);
    }
  }
  
  var district = Array.from(new Set(dt));
// debugger;
  var select = list_district,
    district;

  $("#list_district").empty();
  
  for (var i = 0; i < district.length; i++) {
    if (district[i] != undefined) {
      var option = document.createElement("option");
      var txt = document.createTextNode(district[i]);
      option.appendChild(txt);
      select.insertBefore(option, select.lastChild);
    }
  }

  return;
};

list_district.onchange = async function() {
  // debugger;
  $("#list_market").empty();
  const response = await fetch("/get_crop_data");
  const json = await response.json();
  var mar = [];
  $("#list_market").empty();
  for (var i = 0; i < 4235; i++) {
    if ($("#list_district").val() == json[i].district){
     mar[i] = json[i].market;
    }
  }
  var market = Array.from(new Set(mar));

  var select = list_market;// station;

  $("#list_market").empty();
  for (var i = 0; i < market.length; i++) {
    if (market[i] != undefined) {
      var option = document.createElement("option");
      var txt = document.createTextNode(market[i]);
      option.appendChild(txt);
      select.insertBefore(option, select.lastChild);
    }
  }
 
  return;
}
list_district.onclick =  async function() {
  // debugger;
  $("#list_market").empty();
  const response = await fetch(url);
  const json = await response.json();
  var mar = [];
  $("#list_market").empty();
  for (var i = 0; i < 4235; i++) {
    if ($("#list_district").val() == json[i].district){
     mar[i] = json[i].market;
    }
  }
  var market = Array.from(new Set(mar));

  var select = list_market;// market;

  $("#list_market").empty();
  for (var i = 0; i < market.length ; i++) {
    if (market[i] != undefined) {
      var option = document.createElement("option");
      var txt = document.createTextNode(market[i]);
      option.appendChild(txt);
      select.insertBefore(option, select.lastChild);
    }
  }
 
  return;
}
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
  state_list();
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

submit.onclick = async function plot() {

    $('#chart').empty();
    $('#chart').append('<canvas id="myChart"><canvas>');

    modal.style.display = "none";
    datas = await getdata();
    console.log(datas[0])
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: datas[0],
        datasets: [
          {
            label: "Price of commodity",
            data: datas[1],
            backgroundColor: ["rgba(255, 0, 0, 0.2)"],
            borderColor: ["rgba(255, 99, 132, 1)"],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
      
    });

    var div_table = document.getElementById('table2');
    
    console.log(datas[0].length);
    var table1 = document.createElement("TABLE");
    table1.setAttribute("id", "table1");
    var th1 = document.createElement('th');
    th1.innerHTML = "commodities";
    var th2 = document.createElement('th');
    th2.innerHTML ="price";
    tr = table1.insertRow(-1);
    tr.appendChild(th1)
    tr.appendChild(th2)

    for(var i = 0;i < datas[0].length;i++){
      var row1 = table1.insertRow(-1);
      var td1 = document.createElement('td');
      td1.innerHTML = datas[0][i];
      row1.appendChild(td1);
      var td2 = document.createElement('td');
      td2.innerHTML = datas[1][i];
      row1.appendChild(td2)
    }
  
    $("#table2").append(table1);
}

async function getdata(){
  // debugger;
  var list_district = $("#list_district").val();
  var list_state = $("#list_state").val();
  var list_market = $("#list_market").val();
  $("#temp").remove();
  $('#table1').remove();
  $("#chart").before(`<div id="temp" style="text-align: center;"> State : ${list_state} &nbsp; District : ${list_district} &nbsp; Market : ${list_market}</div>`);
  document.getElementById("chart").style.textAlign = 'center';
  const response = await fetch(url);
  const json = await response.json();
  var y = [];
  var x = [];
  for (var i = 0; i < 4235; i++) {
    if ($("#list_market").val() == json[i].market) {

      x.push(json[i].commodity);
      y.push(json[i].modal_price);
    }   
  }

    var xx = Array.from(new Set(x));
    var yy = Array.from(new Set(y));
    return [x,y];
}

