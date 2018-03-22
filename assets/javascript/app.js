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

  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var empName = childSnapshot.val().name;
  var empRole = childSnapshot.val().role;
  var empStart = childSnapshot.val().start;
  var empRate = childSnapshot.val().rate;

  // Employee Info
  console.log(empName);
  console.log(empRole);
  console.log(empStart);
  console.log(empRate);

  // Prettify the employee start
  var empStartPretty = moment.unix(empStart).format("MM/DD/YY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
  console.log(empMonths);

  // Calculate the total billed rate
  var empBilled = empMonths * empRate;
  console.log(empBilled);

  // Add each train's data into the table
  $("#employee-table > tbody").append("<tr><td>" + empName + "</td><td>" + empRole + "</td><td>" +
  empStartPretty + "</td><td>" + empMonths + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>");
});

});