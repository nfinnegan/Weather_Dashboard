$(document).ready(function(){
var searchBtn = document.getElementById("searchBtn")
var citiesArray=[];
let today = moment().format("l");
let inputCity = $("#cityName").val();
console.log(inputCity);

//runs current weather API (separate from One call)
function currentWeatherAPI(inputCity){
    if($(".card-body")){
        $(".card-body").empty()
    }
   //let inputCity = $("#cityName").val();
   
   //API call
    var currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + inputCity + '&units=imperial&appid=fe69a8ae1bfba9fa932a4b4358617cbf'
        fetch(currentWeatherUrl)
                .then(function (response){
                return response.json();
            })
            //creates elements of top card dynamically
            .then(function (data){
                if(inputCity){
                    var todayCard = $(".card-body")
                    var iconCode = `${data.weather[0].icon}`
                    var iconURL = "http://openweathermap.org/img/wn/" + iconCode + ".png" 
                    let tempRounded = Math.round(data.main.temp)
                    let cardOneTitle = $("<h2 class='card-title'></h2>").appendTo(todayCard).text(inputCity + " " + "("+today+")")
                    $("<img id='weatherIcon' src='' alt='weather icon'>").appendTo(cardOneTitle).attr('src',iconURL)
                    $("<p class='card-text'></p>").appendTo(todayCard).text("Temperature: " + tempRounded +"F")
                    $("<p class='card-text'></p>").appendTo(todayCard).text(`Humidity: ${data.main.humidity}%`)
                    $("<p class='card-text'></p>").appendTo(todayCard).text(`Wind Speed: ${data.wind.speed}`)
                    $("<p class='card-text'></p>").appendTo(todayCard).text("UV Index: ")
                   

                }
               
            })
        
        
    convertCityLatLong(inputCity);    


}

//one call API for 5 day forecast only allows latitude and longitude, had to convert city name to lat/long to pass to 5 day forecast API
function convertCityLatLong(inputCity){
    let directGeocodingAPI = 'http://api.openweathermap.org/geo/1.0/direct?q=' + inputCity + '&limit=5&appid=fe69a8ae1bfba9fa932a4b4358617cbf'
    fetch(directGeocodingAPI)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            var lat = data[0].lat
            var long = data[0].lon
            fiveDayForecastAPI(lat,long)
        })
        
        
}



    //gets 5 day forecast
    function fiveDayForecastAPI(lat, long) {  
    let fiveDayForecastUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + long + '&exclude=minutely,hourly,alerts&cnt=5&units=imperial&appid=fe69a8ae1bfba9fa932a4b4358617cbf'
    
    //API CALL
    fetch(fiveDayForecastUrl)
                .then(function(response){
                return response.json();
                })
                //dynamically added elements for 5 day forecast
                .then(function (dataItems){
                    if(!dataItems.daily.length){
                        console.log("no results")
                        }
                    else{
                    for (i=0; i <= 4 ; i++){
                        var item = dataItems.daily[i]
                        var unixDate = dataItems.daily[i].dt
                        var date = moment.unix(unixDate).format("l")
                        var iconCode = item.weather[0].icon
                        var iconURL = "http://openweathermap.org/img/wn/" + iconCode + ".png"
                        let roundedTemp = Math.round(item.temp.day)
                        var forecastCards = $(".mt-5") //added second class to pull by this instead of card-body again  
                        let cardTwo = $("<div class='card text-white bg-primary mb-3 cardCSS'</div>").appendTo(forecastCards)
                        $("<h5 class='card-title'></h5>").appendTo(cardTwo).text(date)
                        $("<img id='weatherIcon' src='' alt='weather icon'>").appendTo(cardTwo).attr('src',iconURL)
                        $("<p class='card-text'></p>").appendTo(cardTwo).text("Temperature: " + roundedTemp +"F")
                        $("<p class='card-text'></p>").appendTo(cardTwo).text("Humidity: " + item.humidity +"%")
                       
                        }
                    }  

            })
}





searchBtn.addEventListener("click",function(event){
    event.preventDefault();
    currentWeatherAPI();
    let oldCities = JSON.parse(window.localStorage.getItem("City")) || [];
    oldCities.push(citiesArray)
    let cityValue = $("#cityName").val()
    citiesArray.push(cityValue)
    //for (i=0; i < cityValue.length; i++)
    window.localStorage.setItem("City", JSON.stringify(citiesArray));
    $(".mt-5").empty();
    

})

if(!JSON.parse(window.localStorage.getItem("City"))){
    console.log("no history")
}
else{
    displayStorage();
}

function displayStorage() {
    let inputHistory = JSON.parse(window.localStorage.getItem("City"))
    for (i=0; i < inputHistory.length; i++){
        let uoList = $(".searchHistory")
        $("<li class= list-group-item ></li>").addClass("data-city").appendTo(uoList).text(inputHistory[i])
        }
}

$(document).on("click", ".data-city",function(event){
    let clickedCity = event.target.getAttribute('.data-city')
    var cityName = $(".data-city").html()
    console.log(cityName)
    if(cityName){
        currentWeatherAPI(cityName)
    }


})


})