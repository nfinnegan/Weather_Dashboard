//var currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q="+inputCityValue+"&units=imperial&appid=fe69a8ae1bfba9fa932a4b4358617cbf'
var fiveDayForecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q={cityname}&units=imperial&appid=fe69a8ae1bfba9fa932a4b4358617cbf'
var searchBtn = document.getElementById("searchBtn")

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
               // console.log(data);
                //displayCurrentWeather(data.items)
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
        
        


}

function fiveDayForecastAPI() {
    //let inputCity = $("#cityName").val();
    let inputCity = "Chicago"
    var fiveDayForecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + inputCity + '&units=imperial&cnt=5&appid=fe69a8ae1bfba9fa932a4b4358617cbf'
    fetch(fiveDayForecastUrl)
                .then(function (response){
                return response.json();
            })
                .then(function (data){
                console.log(data);
              
                //var iconCode = `${data.weather[0].icon}`
               // var iconURL = "http://openweathermap.org/img/wn/" + iconCode + ".png"
                for (i=0;i < `${data.list[i].length}`; i++){
                    console.log(`${data.list}`)
                    var forecastCards = $(".mt-3") //added second class to pull by this instead of card-body again  
                    let cardTwoTitle= $("<h5 class='card-title'></h5>").appendTo(forecastCards).text("Date")
                   // $("<img id='weatherIcon' src='' alt='weather icon'>").appendTo(forecastCards).attr('src',iconURL)
                    $("<p class='card-text'></p>").appendTo(forecastCards).text("Temperature: ")
                    $("<p class='card-text'></p>").appendTo(forecastCards).text("Humidity: ")
                   
                }

            })
}



fiveDayForecastAPI()

searchBtn.addEventListener("click",currentWeatherAPI)


