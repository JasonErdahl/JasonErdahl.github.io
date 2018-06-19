  // Initial array of gifs
var topics = ["Deadpool", "Clowns", "Happy", "Oops", "No", "Love", "Beer"];

$(document).ready(function () {


      // Generic function for capturing the gif name from the data-attribute
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
              giftasticImage.attr("src", results[i].images.fixed_height_still.url);
              giftasticImage.attr("data-still", results[i].images.fixed_height_still.url);
              giftasticImage.attr("data-animate", results[i].images.fixed_height.url);
              giftasticImage.attr("alt", results[i].title)
              giftasticImage.attr("data-state", "still");
              giftasticImage.attr("class", "gif");

              // Appending the paragraph and image tag to the giftasticDiv
              giftasticDiv.append(giftasticImage);
              giftasticDiv.append(p);
              // Prependng the giftasticDiv to the HTML page in the "#gifs-appear-here" div
              $("#gifs-appear-here").prepend(giftasticDiv);
            }
        });
      }

      // Function for displaying gif data
      function renderButtons() {

        // Deleting the gifs prior to adding new gifs
        // (this is necessary otherwise we will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of gifs
        for (var i = 0; i < topics.length; i++) {

          // Then dynamicaly generating buttons for each gif in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class
          a.addClass("displayGif");
          // Added a data-attribute
          a.attr("data-name", topics[i]);
          // Provided the initial button text
          a.text(topics[i]);
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
        var gifInput = $("#gif-input").val().trim();

        if (gifInput != '') {
        // The gif Input from the textbox is then added to the array
        topics.push(gifInput);
        $('#gif-input').val(' ');
        // Calling renderButtons which handles the processing of the gif array
        renderButtons();
        
        } else {
          alert('You cannot add an empty button!');
        }
      });
      
      // This function handles events where one button is clicked
      $("#clear-gif").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        $('#gifs-appear-here').empty();
      });

      $(".dropdown-menu").on('click', 'a', function(){
          $(".btn:first-child").text($(this).text());
          $(".btn:first-child").val($(this).text());
      });
      
      $("#gifs-appear-here").on("click", ".gif", function() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        log("state: "+state)
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });

      // Function for displaying the gif info
      // We're adding a click event listener to all elements with the class "displayGif"
      // We're adding the event listener to the document itself because it will
      // work for dynamically generated elements
      // $(".displayGif").on("click") will only add listeners to elements that are on the page at that time
      $(document).on("click", ".displayGif", displayName);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();

});