//add document ready
var searchBtn = document.getElementById("searchBtn")
var citiesArray=[];
let today = moment().format("l");


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
                if(inputCity){
                    
                    var todayCard = $(".card-body")
                    var iconCode = `${data.weather[0].icon}`
                    var iconURL = "http://openweathermap.org/img/wn/" + iconCode + ".png" 
                    let tempRounded = Math.round(data.main.temp)
                    //console.log(tempRounded)
                    let cardOneTitle = $("<h2 class='card-title'></h2>").appendTo(todayCard).text(inputCity + " " + "("+today+")")
                    $("<img id='weatherIcon' src='' alt='weather icon'>").appendTo(cardOneTitle).attr('src',iconURL)
                    $("<p class='card-text'></p>").appendTo(todayCard).text("Temperature: " + tempRounded +"F")
                    $("<p class='card-text'></p>").appendTo(todayCard).text(`Humidity: ${data.main.humidity}%`)
                    $("<p class='card-text'></p>").appendTo(todayCard).text(`Wind Speed: ${data.wind.speed}`)
                    $("<p class='card-text'></p>").appendTo(todayCard).text("UV Index: ")


                }
            })
        }
        
    convertCityLatLong(inputCity);    


}

function convertCityLatLong(inputCity){
   // let inputCity = $("#cityName").val();
    //let inputCity = "Austin"
    let directGeocodingAPI = 'http://api.openweathermap.org/geo/1.0/direct?q=' + inputCity + '&limit=5&appid=fe69a8ae1bfba9fa932a4b4358617cbf'
    fetch(directGeocodingAPI)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data)
            var lat = data[0].lat
            var long = data[0].lon
            console.log(lat,long)
            fiveDayForecastAPI(lat,long)
        })
        
        
}



    
    function fiveDayForecastAPI(lat, long) {
     console.log(lat,long)   
    let fiveDayForecastUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + long + '&exclude=minutely,hourly,alerts&cnt=5&units=imperial&appid=fe69a8ae1bfba9fa932a4b4358617cbf'

    fetch(fiveDayForecastUrl)
                .then(function(response){
                return response.json();
                })
                .then(function (dataItems){
                console.log(dataItems);
                    if(!dataItems.daily.length){
                        console.log("no results")
                        }
                    else{
                    for (i=0; i <= 4 ; i++){
                        var item = dataItems.daily[i]
                        var unixDate = dataItems.daily[i].dt
                        console.log(unixDate)
                        var date = moment.unix(unixDate)
                        console.log(date)
                      
                        var iconCode = item.weather[0].icon
                       // console.log(iconCode)
                        var iconURL = "http://openweathermap.org/img/wn/" + iconCode + ".png"
                       let roundedTemp = Math.round(item.temp.day)
                        var forecastCards = $(".mt-5") //added second class to pull by this instead of card-body again  
                        let cardTwo = $("<div class='card text-white bg-primary mb-3 cardCSS'</div>").appendTo(forecastCards)
                        $("<h5 class='card-title'></h5>").appendTo(cardTwo).text(item.dt_txt)
                        $("<img id='weatherIcon' src='' alt='weather icon'>").appendTo(cardTwo).attr('src',iconURL)
                        $("<p class='card-text'></p>").appendTo(cardTwo).text("Temperature: " + roundedTemp +"F")
                        $("<p class='card-text'></p>").appendTo(cardTwo).text("Humidity: " + item.humidity)
                       
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


function displayStorage() {

}