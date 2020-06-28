const axios = require('axios');
const url = `api.openweathermap.org/data/2.5/weather?q=mumbai&appid=${process.env.WEATHER}`;
axios.get(url)
    .then(function(response){
        console.log(response)
    })
    .catch((error)=>{
        console.log('error: ', error)
    })