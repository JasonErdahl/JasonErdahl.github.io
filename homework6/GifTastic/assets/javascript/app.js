  // Initial array of movies
var apiArray = ["The Game Of Thrones", "The Notebook", "Mr. Nobody", "The Lion King"];

$(document).ready(function () {


      // Generic function for capturing the movie name from the data-attribute
      function displayName() {

        var currentId = $(this).attr('data-name');
        log(currentId);

            // set variable for API: https://api.giphy.com/v1/gifs/search?api_key=I2bort2WWvVkD0krbSN0VyGLg3czgAAh&q=Drunk&limit=10&offset=0&rating=R&lang=en
            var queryAPIkey = 'I2bort2WWvVkD0krbSN0VyGLg3czgAAh';
            var queryLimit = '10';
            var queryURL = encodeURI("https://api.giphy.com/v1/gifs/search?api_key="+queryAPIkey+"&q="+currentId+"&limit="+queryLimit+"&rating=&lang=en");
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
                  var animalDiv = $("<div>");
                  animalDiv.addClass('txtIvory width320');

                  // Creating a paragraph tag with the result item's rating
                  var p = $("<p>").text("Rating: " + results[i].rating);

                  // Creating and storing an image tag
                  var animalImage = $("<img>");
                  // Setting the src attribute of the image to a property pulled off the result item
                  animalImage.attr("src", results[i].images.fixed_height.url);

                  // Appending the paragraph and image tag to the animalDiv
                  animalDiv.append(p);
                  animalDiv.append(animalImage);

                  // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                  $("#gifs-appear-here").prepend(animalDiv);
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
      $("#add-movie").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var movie = $("#movie-input").val().trim();

        if (movie != '') {
        // The movie from the textbox is then added to our array
        apiArray.push(movie);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
        } else {
          alert('You cannot enter an empty button!');
        }
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