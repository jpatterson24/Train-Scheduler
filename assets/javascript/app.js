
// Initialize Firebase
 var config = {
 apiKey: "AIzaSyBVEZgZc1uXamBbCM0c5rcxcGgycj4sj3M",
    authDomain: "train-schedule-e30c7.firebaseapp.com",
    databaseURL: "https://train-schedule-e30c7.firebaseio.com",
    projectId: "train-schedule-e30c7",
    storageBucket: "",
    messagingSenderId: "689307824027"
  };

//initialize firebase config
firebase.initializeApp(config);

var trainData = firebase.database();


// 3. Button for adding trains
$("#add-user-btn").on("click", function() {

  // Grabs user input
  var trainName = $("#name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTraintime = moment($("#firstTrain-input").val().trim(), "HH:mm").subtract(10, "years").format("X");
  var frequency = $("#frequency-input").val().trim();

  // Creates temporary object for holding train data
  var train = {

    name: trainName,
    destination: destination,
    firstTrain: firstTrainTime,
    frequency: frequency
  };

  // Uploads train data to the database
  trainData.ref().push(train);

  // Logs everything to console
  console.log(train.name);
  console.log(train.destination);
  console.log(firstTrainTime);
  console.log(train.frequency);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#name-input").val("");
  $("#destination-input").val("");
  $("#firstTrain-input").val("");
  $("#frequency-input").val("");
  
  return false;
});

//adding trains to the database and a row in the html when a user adds an entry
trainData.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var tName = childSnapshot.val().name;
  var tDestination = childSnapshot.val().destination;
  var tFrequency = childSnapshot.val().frequency;
  var tFirstTrain = childSnapshot.val().firstTrain;

  var differenceTimes = moment().diff(moment.unix(tFirstTrain), "minutes");
  var tRemainder = moment().diff(moment.unix(tFirstTrain), "minutes") % tFrequency;
  var tMinutes = tFrequency - tRemainder;

  
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

