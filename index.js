require('dotenv').config()
var express = require('express');
const axios = require('axios');
// var fetch = require('node-fetch');

var path = require('path');
var app = express();

var hbs = require('express-handlebars');

global.jQuery = require('jquery');

var homeRouter = require('./routes/home');
var airRouter = require('./routes/air');
var cropRouter = require('./routes/crop');
var weatherRouter = require('./routes/weather');
var aboutRouter = require('./routes/about');

app.engine('hbs', hbs({extname: 'hbs', defualtLayout : 'default' , layoutDir: __dirname + '/views/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

//home route
app.use('/', homeRouter);
const key = process.env.KEY
//air route
app.use('/air', airRouter);

//crop route
app.use('/crop', cropRouter);

//weather route
app.use('/weather', weatherRouter);

//about route
app.use('/about', aboutRouter);

//fetch air data 
app.get('/air_data',async (request,response)=>{
    const url = `https://api.data.gov.in/resource/3b01bcb8-0b14-4abf-b6f2-c1bfd384ba69?api-key=${key}&format=json&offset=0&limit=1000`;
    const re = await axios.get(url);
    console.log(re.data.records)
    response.json(re.data.records);
});

app.get('/get_crop_data', async (request, response)=>{
    try {
    const url = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${key}&format=json&offset=0&limit=1000`;
    const re = await axios.get(url);
    
    console.log(re);
    response.json(re.data.records);
    }
    catch{
        console.log('eror');
    }

});

// 

console.log(key)
app.listen(process.env.PORT || 5000, ()=>console.log("listening on port 5000"));
module.exports = app;
