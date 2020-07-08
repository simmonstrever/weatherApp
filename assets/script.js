var URL = "https://api.openweathermap.org/data/2.5/weather?q=";
var query = "&APPID=922170f09e7e847c60969243d491caad";

//use moment for displaying UV light count
var date = new Date();
//create array that stores user inputs

// ('https://api.openweathermap.org/data/2.5/weather?q=Denver&APPID=922170f09e7e847c60969243d491caad')

$("#search").on("click", function(){
    var location = $("#search-text").val();
    // var location = $(this).attr("cityName");
    //if (location === "") use geo location
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+location+"&units=imperial&APPID=922170f09e7e847c60969243d491caad";

   

    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function(response){
        //if response is empty use geo location
        console.log(JSON.stringify(response));
        console.log(response.name);
        $("#city-name").text(response.name);
        $("#temperature").text(response.main.temp);
        $("#humidity").text(response.main.humidity);
        $("#wind-speed").text(response.wind.speed);
        //for later
        // $("#uv").text()

        var uvURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?"+query+"&lat=" + response.coord.lat+"&lon="+response.coord.lon+"&cnt=1";
        console.log(uvURL);

        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function(ultraviolet){
            // Math.floor(ultraviolet.value);
            //if uv index < 2
            // attr green
        })
    })
    
});