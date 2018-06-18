  // Initial array of movies
var apiArray = ["Deadpool", "Clowns", "Happy", "Oops", "No", "Love"];

$(document).ready(function () {


      // Generic function for capturing the movie name from the data-attribute
      function displayName() {

        var currentId = $(this).attr('data-name');
        var ratingVal = '';
        ratingVal = $('#dropdownMenuButton').val().toLowerCase();
        log(currentId+" "+ratingVal);

            var queryAPIkey = 'I2bort2WWvVkD0krbSN0VyGLg3czgAAh';
            var queryLimit = '10';
            var queryURL = encodeURI("https://api.giphy.com/v1/gifs/search?api_key="+queryAPIkey+"&q="+currentId+"&limit="+queryLimit+"&rating="+ratingVal+"&lang=en");
            log(queryURL);

            // USE ajax to call api variable
            $.ajax({
                url: queryURL,
                method: "GET"
            })

            //When JSON is returned is will be identified by response
            .then(function(response) { //
                log(queryURL);
                log(response);
                // storing the data from the AJAX request in the results variable
                var results = response.data;

                // Looping through each result item
                for (var i = 0; i < results.length; i++) {

                  // Creating and storing a div tag
                  var giftasticDiv = $("<div>");
                  giftasticDiv.addClass('txtIvory width320');

                  // Creating a paragraph tag with the result item's rating
                  var p = $("<p>").text("Rating: " + results[i].rating);

                  // Creating and storing an image tag
                  var giftasticImage = $("<img>");
                  // Setting the src attribute of the image to a property pulled off the result item
                  giftasticImage.attr("src", results[i].images.fixed_height.url);

                  // Appending the paragraph and image tag to the giftasticDiv
                  giftasticDiv.append(giftasticImage);
                  giftasticDiv.append(p);
                  // Prependng the giftasticDiv to the HTML page in the "#gifs-appear-here" div
                  $("#gifs-appear-here").prepend(giftasticDiv);
                }
            });
      }

      // Function for displaying movie data
      function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise we will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < apiArray.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class
          a.addClass("movie");
          // Added a data-attribute
          a.attr("data-name", apiArray[i]);
          // Provided the initial button text
          a.text(apiArray[i]);
          // Added the button to the HTML
          $("#buttons-view").append(a);
        }
      }

      function log(i) {
          console.log(i);
      }

      // This function handles events where one button is clicked
      $("#add-gif").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var movie = $("#gif-input").val().trim();

        if (movie != '') {
        // The movie from the textbox is then added to our array
        apiArray.push(movie);
        $('#gif-input').val(' ');
        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
        
        } else {
          alert('You cannot add an empty button!');
        }
      });
      // This function handles events where one button is clicked
      $("#clear-movie").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        $('#gifs-appear-here').empty();
      });

      $(".dropdown-menu").on('click', 'a', function(){
          $(".btn:first-child").text($(this).text());
          $(".btn:first-child").val($(this).text());
      });
      

      // Function for displaying the movie info
      // We're adding a click event listener to all elements with the class "movie"
      // We're adding the event listener to the document itself because it will
      // work for dynamically generated elements
      // $(".movies").on("click") will only add listeners to elements that are on the page at that time
      $(document).on("click", ".movie", displayName);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();

});