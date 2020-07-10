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
        
        $("#city-name").text(location);
        $("#temperature").text("Temperature: " + response.list[0].main.temp);
        $("#humidity").text("Humidity: " + response.list[0].main.humidity + "%");
        $("#wind-speed").text("Wind-Speed: "+ response.list[0].wind.speed);
        // var tesT = $("<img>").attr("src", iconURL);
        
        //if response is empty use geo location
        // console.log(JSON.stringify(response));
        // console.log(response.list[0].main.temp);
 
        // console.log(response.list[0].weather[0]);
        // $("#city-name").append(response.list[0].weather[0].icon);
        
        
        for (var i = 0; i<6; i++){
            console.log(days);
            
            $(`#temp${i}`).text("Temp " + response.list[i+7].main.temp);
            // $(`#icon${i}`).attr("src", "http://openweathermap.org/img/w/" + response.list[i*7].weather.icon+ ".png");
            console.log(response.list[i].main.temp);

        }
        
       


          
       days = response.list.filter(function (forecast) {
        return forecast.dt_txt.includes("12:00:00")
    })

    var iconID = days[1].weather[0].icon;
    var iconURL = "http://openweathermap.org/img/w/" + iconID + ".png";
    console.log(iconURL);
    
 
        
  
        
       




        

        //********GENERATE NEW CARDS FOR EACH day in the forecast */

  
    

    // console.log(response.weather.icon);

    var uvURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?" + query + "&lat=" + response.city.coord.lat + "&lon=" + response.city.coord.lon + "&cnt=5";
    // console.log(uvURL);
    // console.log(response.city.coord.lat);
    // console.log(response.city.coord.lon);

    // $.ajax({
    //     url: uvURL,
    //     method: "GET"
    // }).then(function (ultraviolet) {
        
    //     // console.log(JSON.stringify(ultraviolet));
    //     console.log(ultraviolet);
    //     //var index = uvRay.value();
    //     $("#uv").text(ultraviolet.value);
    //     console.log(ultraviolet);
    //     // if (index < 10) {
    //     //     $("#uv").attr("style", "background-color: green");
    //     // } else if (index > 10) {
    //     //     $("#uv").attr("style", "background-color: red");
    //     // }
    //     // console.log(ultraviolet);
    //     // console.log(ultraviolet[1].value);
    // });



});



});