$(document).ready(function () {
  // Initialize Firebase
var config = {
    apiKey: "AIzaSyAuWgW1JaMUC2vD90QMDG-Z_imqIROu36A",
    authDomain: "train-hw-98f1d.firebaseapp.com",
    databaseURL: "https://train-hw-98f1d.firebaseio.com",
    projectId: "train-hw-98f1d",
    storageBucket: "",
    messagingSenderId: "850969235166"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  $("#submit").on("click", function(event) {
    event.preventDefault();

  var trainName = $("#trainname").val().trim();
  var destination = $("#destination").val().trim();
  var firstTrain = moment($("#firsttrain").val().trim(), "HH:mm").format("X");
  var frequency = $("#frequency").val().trim();

  var newTrain = {
    name: trainName,
    destination: destination,
    time: firstTrain,
    frequency: frequency
  }

  database.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);

  $("#trainname").val("");
  $("#destination").val("");
  $("#firsttrain").val("");
  $("#frequency").val("");

  });

 
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

 
  var tname = childSnapshot.val().name;
  var tdest = childSnapshot.val().destination;
  var ttime = childSnapshot.val().time;
  var tfreq = childSnapshot.val().frequency;


  console.log(tname);
  console.log(tdest);
  console.log(tdest);
  console.log(tfreq);

  $(".list-group-item").append("<tr><td>" + tname + "</td><td>" + tdest + "</td><td>" +
  ttime + "</td><td>" + tfreq + "</td></tr>");
  

});

});