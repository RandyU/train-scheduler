// Initialize Firebase
var config = {
    apiKey: "AIzaSyA2pbCh1jHsfUtqAOBvBrJeSrEDHgOLuWY",
    authDomain: "train-scheduler-a786f.firebaseapp.com",
    databaseURL: "https://train-scheduler-a786f.firebaseio.com",
    projectId: "train-scheduler-a786f",
    storageBucket: "train-scheduler-a786f.appspot.com",
    messagingSenderId: "916434006424"
};

firebase.initializeApp(config);
var database = firebase.database();


//Button for add train
$("#addTrainBtn").on("click", function() {

    // Grabs user input
    var trainName = $("#trainNameInput").val().trim();
    var trainDestination = $("#destinationInput").val().trim();
    var trainFirstArrival = $("#firstArrivalInput").val().trim();
    var trainFrequency = $("#frequencyInput").val().trim();

    // Creates local "temporary" object for holding train data
    var newTrain = {
        name: trainName,
        destination: traindestination,
        time: trainFirstArrival,
        freq: trainfrequency
    }

    // Uploads train data to the database
    database.ref().push(newTrain);

    // console logs
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.freq);

    // alert
    alert("Train schedule successfully added");

    // Clears text boxes
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstArrivalInput").val("");
    $("#frequencyInput").val("");

    
    return false;
});


//Creates Firebase event for adding train to the DB
function refreshTable() {
    $("#trainData").html('');
    database.ref().on("child_added", function(childSnapshot, prevChildKey) {

        console.log(childSnapshot.val());

        // Stores info into a variablea.
        var trainName = childSnapshot.val().name;
        var traindestination = childSnapshot.val().destination;
        var trainFirstArrival = childSnapshot.val().time;
        var trainfrequency = childSnapshot.val().freq;

        // console.logs train Info
        console.log(trainName);
        console.log(traindestination);
        console.log(trainFirstArrival);
        console.log(trainfrequency);

        $("#trainTable > #trainData").append("<tr><td>" + trainName + "</td><td>" + traindestination + "</td><td>" + trainfrequency + "</td><td>" + nextTrainDeparture + "</td><td>" + tMinutesTillTrain + "</td><td>");

    });
}
var refreshTime = setInterval(currentTime, 1000);

function currentTime() {
    var timeCurrent = moment().format("hh:mm:ss A");
    var currentDate = moment().format('MM/ DD/ YYYY'); 
    $("#currentTime").append("Current Time: " + timeCurrent);
    $("#currentDate").append("Today's Date: " + currentDate);

    
    var secondsCurrent = moment().format("ss");

    if (secondsCurrent == "00") {
        refreshTable();
    }

}