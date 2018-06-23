/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new Trains - then update the html + update the database
// 3. Create a way to retrieve Trains from the Train database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDKFfJF_faqFCviogn94go02fmSzJcSkTA",
    authDomain: "bootcamp2018-6b307.firebaseapp.com",
    databaseURL: "https://bootcamp2018-6b307.firebaseio.com",
    projectId: "bootcamp2018-6b307",
    storageBucket: "bootcamp2018-6b307.appspot.com",
    messagingSenderId: "895105643483"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

// 2. Button for adding Trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainTime = $("#trainTime-input").val().trim();
  //var trainTime = moment($("#trainTime-input").val().trim(), "HH:mm").subtract(1, "years");
  var trainFrequency = $("#frequency-input").val().trim();

  if ((trainName != '')&&(trainName != '')&&(trainName != '')&&(trainName != '')) {
    // Creates local "temporary" object for holding Train data
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      time: trainTime,
      frequency: trainFrequency
    };

    // Uploads Train data to the database
    database.ref("project1").push(newTrain);

    // Logs everything to console
    log(newTrain.name);
    log(newTrain.destination);
    log(newTrain.time);
    log(newTrain.frequency);

    // Alert
    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#trainTime-input").val("");
    $("#frequency-input").val("");
  } else {
    alert("Unable to Submit - Empty Field");
  }
});

// 3. Create Firebase event for adding Train to the database and a row in the html when a user adds an entry
database.ref("project1").on("child_added", function(childSnapshot, prevChildKey) {

  log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().time;
  var trainFrequency = childSnapshot.val().frequency;

  // Train Info
  log(trainName);
  log(trainDestination);
  log(trainTime);
  log(trainFrequency);

  // Prettify the train start
    // Assumptions
    //var tFrequency = 3;
    var tFrequency = trainFrequency;

    // Time is 3:30 AM
    //var firstTime = "03:30";
    var firstTime = trainTime;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var trainMinutes = moment().add(tMinutesTillTrain, "minutes");
    var trainMinutesFormat = moment(trainMinutes).format("hh:mm a");
    log("ARRIVAL TIME: " + trainMinutesFormat);

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainFrequency + "</td><td>" + trainMinutesFormat + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});

function log(i) {
  console.log(i);
}

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Train start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case
