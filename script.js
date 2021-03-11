//var currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q="+inputCityValue+"&units=imperial&appid=fe69a8ae1bfba9fa932a4b4358617cbf'
var fiveDayForecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q={cityname}&units=imperial&appid=fe69a8ae1bfba9fa932a4b4358617cbf'
var searchBtn = document.getElementById("searchBtn")
let today = moment().format("dddd, MMMM Do YYYY");
//let inputCityValue = $("#cityName").val();
//console.log(inputCityValue);

function currentWeatherAPI(){
   let inputCity = $("#cityName").val();
    var currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + inputCity + '&units=imperial&appid=fe69a8ae1bfba9fa932a4b4358617cbf'
        if(inputCity === ''){
            alert("Please enter a valid city")
        }
        else {
            fetch(currentWeatherUrl)
                .then(function (response){
                return response.json();
            })
            .then(function (data){
                console.log(data);
                //displayCurrentWeather(data.items)
            })
        }
        if(inputCity){
            let topRow = $("<div></div>").addClass("row").appendTo(".container");
            let topColumn = $("<h2</h2>").addClass("col-sm-12 col-md-12 col-lg-12 topColumn").appendTo(topRow).text("city name " + today)
            let weatherTemp = $("<p></p>").addClass("h5").appendTo(topColumn).text("temp: data ")
            let weatherHumidity = $("<p></p>").addClass("h5").appendTo(topColumn).text("humidity: ")
            let weatherWindSpeed = $("<p></p>").addClass("h5").appendTo(topColumn).text("wind speed: ")
            let weatherUvIndex = $("<p></p>").addClass("h5").appendTo(topColumn).text("UV Index: ")
        }
        



}

searchBtn.addEventListener("click",currentWeatherAPI)


//function displayCurrentWeather(data.items)

// function displayCurrentWeather(){
//     if(inputCity){
//     let topRow = $("<div></div>").addClass("row").appendTo(".container");
//     let topColumn = $("<h2</h2>").addClass("col-sm-12 col-md-12 col-lg-12 topColumn").appendTo(topRow).text("city name " + today)
//     let weatherTemp = $("<p></p>").addClass("h5").appendTo(topColumn).text("temp: data ")
//     let weatherHumidity = $("<p></p>").addClass("h5").appendTo(topColumn).text("humidity: ")
//     let weatherWindSpeed = $("<p></p>").addClass("h5").appendTo(topColumn).text("wind speed: ")
//     let weatherUvIndex = $("<p></p>").addClass("h5").appendTo(topColumn).text("UV Index: ")
//     }
// }