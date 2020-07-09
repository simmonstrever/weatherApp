var URL = "https://api.openweathermap.org/data/2.5/weather?q=";
var query = "&APPID=922170f09e7e847c60969243d491caad";
var days;

//use moment for displaying UV light count
var date = new Date();
console.log(date);
//create array that stores user inputs

// ('https://api.openweathermap.org/data/2.5/weather?q=Denver&APPID=922170f09e7e847c60969243d491caad')

$("#search").on("click", function () {
    var location = $("#search-text").val();
    // var location = $(this).attr("cityName");
    //if (location === "") use geo location
    // var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+location+"&units=imperial&appid=922170f09e7e847c60969243d491caad";
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + location + "&units=imperial&appid=922170f09e7e847c60969243d491caad"
    console.log(queryURL);



    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function (response) {
        //if response is empty use geo location
        // console.log(JSON.stringify(response));
        // console.log(response.list[0].main.temp);
        $("#city-name").text(location);
        $("#temperature").text(response.list[0].main.temp);
        $("#humidity").text(response.list[0].main.humidity);
        $("#wind-speed").text(response.list[0].wind.speed);
        // console.log(response.list[0].weather[0]);
        // $("#city-name").append(response.list[0].weather[0].icon);
        var iconicTest  = response.list[0].weather[0].icon;
        
        var iconID = response.list[0].weather[0].id;
        var iconURL = "http://openweathermap.org/img/w/" + iconicTest + ".png";
        console.log(iconURL)
        $("#wicon").attr("src", iconURL)
        $("city-name").prepend("#wicon");

        
       

        for (var i = 0; i < 5; i++) {
            // var iconicTest = days[i].weather[i].icon
            var forecastCard = $("<div>").attr("class", "card");
            var forecastBody = $("<div>").attr("class", "card-body");
            var forecastTemp = $("<p>").attr("class", "card-text").append("Temp: ",response.list[i].main.temp);
            var forecastDate = $("<p>").attr("class", "card-title").prepend(response.list[i].dt_txt)
            // var forecastIcon = $("<img>").attr("src", "http://openweathermap.org/img/w/" + days.weather.icon + ".png");
            // console.log(days);

            
            // .append("Temp: ", response.list[i].main.temp);
            console.log(response.list)
            // console.log(forecastTemp)
            forecastBody.append( forecastTemp);
            forecastCard.append(forecastDate,forecastBody);
            $("#forecastDiv").append(forecastCard);

            // if(i==1){
            //     var forecastTemp = $("<p>").attr("class", "card-text").append("Temp: ",response.list[i].main.temp);

            // }
        }




        // console.log(response.list[0].weather[0].icon+".png");
       var days = response.list.filter(function (forecast) {
            return forecast.dt_txt.includes("12:00:00")
        })
        // console.log(days);
        console.log(response.list[1].main.temp);
        console.log(days[0].weather[0].icon);

        //********GENERATE NEW CARDS FOR EACH day in the forecast */

  
    

        // console.log(response.weather.icon);

        var uvURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?" + query + "&lat=" + response.city.coord.lat + "&lon=" + response.city.coord.lon + "&cnt=5";
    // console.log(uvURL);
    // console.log(response.city.coord.lat);
    // console.log(response.city.coord.lon);

    $.ajax({
        url: uvURL,
        method: "GET"
    }).then(function (ultraviolet) {
        console.log(JSON.stringify(ultraviolet));
        var index = ultraviolet[1].value;
        $("#uv").text(index);
        console.log(index);
        if (index < 10) {
            $("#uv").attr("style", "background-color: green");
        } else if (index > 10) {
            $("#uv").attr("style", "background-color: red");
        }
        // console.log(ultraviolet);
        // console.log(ultraviolet[1].value);
    });



});



});