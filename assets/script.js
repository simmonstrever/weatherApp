var URL = "https://api.openweathermap.org/data/2.5/weather?q=";
var query = "&APPID=922170f09e7e847c60969243d491caad";

//use moment for displaying UV light count
var date = new Date();
console.log(date);
//create array that stores user inputs

// ('https://api.openweathermap.org/data/2.5/weather?q=Denver&APPID=922170f09e7e847c60969243d491caad')

$("#search").on("click", function(){
    var location = $("#search-text").val();
    // var location = $(this).attr("cityName");
    //if (location === "") use geo location
    // var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+location+"&units=imperial&appid=922170f09e7e847c60969243d491caad";
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q="+location+"&appid=922170f09e7e847c60969243d491caad"
    console.log(queryURL);

   

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
        $("#icon").text(response.weather.icon);
        //need to render the icon
        //console.log(response.weather.icon);
    
        var uvURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?"+query+"&lat=" + response.coord.lat+"&lon="+response.coord.lon+"&cnt=5";
        console.log(uvURL);

        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function(ultraviolet){
            console.log(JSON.stringify(ultraviolet));
            var index = ultraviolet[1].value;
            $("#uv").text(index);
            console.log(index);
            if (index < 10){
                $("#uv").attr("style", "background-color: green");
            } else if (index > 10 ){
                $("#uv").attr("style", "background-color: red");
            }
            // console.log(ultraviolet);
            // console.log(ultraviolet[1].value);
        });


    })
    
});