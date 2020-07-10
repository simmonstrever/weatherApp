var URL = "https://api.openweathermap.org/data/2.5/weather?q=";
var query = "&APPID=922170f09e7e847c60969243d491caad";
var days;



var date = new Date();
console.log(date);


$("#search").on("click", function () {
    var location = $("#search-text").val();
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
        var pic = $("#wicon").attr("src", "http://openweathermap.org/img/w/" + response.list[0].weather[0].icon + ".png");
        $(pic).append("#current");

        console.log(response.list[0].weather[0].icon);

        
        for (var i = 0; i<8; ++i ){

            var days = response.list.filter(function (forecast) {
                return forecast.dt_txt.includes("12:00:00")
            })
            
            var result = response;
            $(`#temp${i}`).text("Temp " + result.list[i].main.temp);
            var iconTest= $(`#icon${i}`).attr("src", "http://openweathermap.org/img/w/" + result.list[i].weather[0].icon+ ".png");
            $(`#footer${i}`).text("Humidity " + result.list[i].main.humidity + "%")

            $("#card-text").text(iconTest);

           



        }   
    var uvURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?" + query + "&lat=" + response.city.coord.lat + "&lon=" + response.city.coord.lon ;

    $.ajax({
        url: uvURL,
        method: "GET"
    }).then(function (ultraviolet) {
        
        // console.log(JSON.stringify(ultraviolet));
        console.log(ultraviolet[0].value);
        var index= ultraviolet[0].value
        $("#uv").text("UV index" + index);
        // console.log(ultraviolet);
        if (index < 5) {
            $("#uv").attr("style", "background-color: green");
        } else if (index > 5 && index <10 ) {
            $("#uv").attr("style", "background-color: yellow");
        } else if (index >10){
            $("#uv").attr("style", "background-color: red")
        }
    
    });



});



});