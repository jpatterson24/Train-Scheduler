$(document).ready(function() {

  // Initialize Firebase

  var config = {
 apiKey: "AIzaSyBVEZgZc1uXamBbCM0c5rcxcGgycj4sj3M",
    authDomain: "train-schedule-e30c7.firebaseapp.com",
    databaseURL: "https://train-schedule-e30c7.firebaseio.com",
    projectId: "train-schedule-e30c7",
    storageBucket: "",
    messagingSenderId: "689307824027"
  };

  firebase.initializeApp(config);

  // Create a variable to reference the database

  var database = firebase.database();

  $("#newTrainForm").on('submit', function(event) {
    event.preventDefault();
    // Grabs user input from text boxes
   var trainName = $("#name-input").val().trim();
   var destination = $("#destination-input").val().trim();
   var firstTrain = moment($("#firstTrain-input").val().trim(), "HH:mm").subtract(10, "years").format("X");
   var frequency = $("#frequency-input").val().trim();

    //Object to hold the train data
    var train = {
      name: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency
    };



        database.ref().push(train);
       //trainName: train name,
       // destination: destination,
        //firstTrain: first train,
        //frequency: frequency,
        //dateAdded: firebase.database.ServerValue.TIMESTAMP
        console.log(train.name);
        console.log(train.destination);
        console.log(train.fistTrain);
        console.log(train.frequency);

        //Alert train successfully added
        alert("Train successfully added");
      // Grabbed values from text boxes
      $("#name-input").val("");
      $("#destination-input").val("");
      $("#firstTrain-input").val("");
      $("#frequency-input").val("");

      // trainName = "";
      // destination = "";
      // firstTrain = "";
      // frequency = "";

      return false;
    }

  });

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var tName = childSnapshot.val().name;
  var tDestination = childSnapshot.val().destination;
  var tFrequency = childSnapshot.val().frequency;
  var tFirstTrain = childSnapshot.val().firstTrain;

  // Calculate the minutes until arrival using hardcore math
  // To calculate the minutes till arrival, take the current time in unix subtract the FirstTrain time
  // and find the modulus between the difference and the frequency.
  var differenceTimes = moment().diff(moment.unix(tFirstTrain), "minutes");
  var tRemainder = moment().diff(moment.unix(tFirstTrain), "minutes") % tFrequency;
  var tMinutes = tFrequency - tRemainder;

  // To calculate the arrival time, add the tMinutes to the currrent time
  var tArrival = moment().add(tMinutes, "m").format("hh:mm A");

  console.log(tMinutes);
  console.log(tArrival);
  console.log(moment().format("hh:mm A"));
  console.log(tArrival);
  console.log(moment().format("X"));

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>"
  + tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");
});
//   database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {
//     if (trainList.length > 0) {
//       console.log("New train added: " + snapshot.val());
//     };

//   }, function(err) {
//     console.log(err);
//   });


//   database.ref().once('value', function(snapshot) {
//     trainData = snapshot.val();
//     $.each(trainData, function( index,value) {
//       trainList.push(trainData[index]);
//       var train = trainData[index];
//       //var monthsWorked = moment().diff(moment(employee.startDate), 'months');
//     //  var totalBilled = monthsWorked * employee.monthlyRate;
//       var newRow = $(
//         "<tr><td>" + 
//         train.name + 
//         "</td><td>" +
//         train.destination +
//         "</td><td>" +
//         train.frequency +
//         "</td><td>" +
//         nextArrival +
//         "</td><td>" +
//         minutesAway +
//         "</td><td>" +
//         totalBilled +
//         "</td></tr>");
//       $("#employeeTbl").append(newRow);
//     });
//   }, function(err) {
//     console.log(err);
//   });

// });