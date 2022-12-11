//I am hoping no one has a keyboard shorcut for this character
let seperator = "\u0482";
let todaysPlans = [];

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  //function for storing the values 
  function storePlan(time, plan){
    //adds the stored values to the array and then pushes it to storage
    //it will be formatted as "hourid(seperator)text" with (seperator) = \u0482
    //for example it could be stored as: "hour-4҂go to doctors office"
    todaysPlans.push(time + "" + seperator + "" + plan);
    localStorage.setItem("localPlans", JSON.stringify(todaysPlans));
  }

  //gets the current hour in 24-hour time using Day.js
  let currentHour = dayjs().hour();
  //sets the class and adds a click listener at the same time
  $(".time-block").each(function(){
    //this chunk sets the classes for where its at
    let hour = $(this).attr("id").slice($(this).attr("id").indexOf("-") + 1);
    //I wanted to use switch case but this will work
    if(hour == currentHour){
      $(this).addClass("present");
    }else if(hour > currentHour){
      $(this).addClass("future");
    }else{
      $(this).addClass("past");
    }
    //end of first chunk

    //this chunk adds a click event listener for each save button
    $(this).click(function(event){
      //if the save button part is clicked it will store what the user has been input
      if($(event.target).hasClass("saveBtn")){
        storePlan($(this).attr("id"), $(this).children("textarea").val());
      }
    });
  });

  //Will use an array to store the value with the current hour
  //it will be formatted as ["hourid(seperator)text"] with (seperator) = \u0482
  //for example: localPlans[0] could return "hour-4҂go to doctors office"
  let updatePlans = function(){
    //for each stored plan it writes it to the appropriate section
    for(let plan of todaysPlans){
      //splits the element because of how I have it stored
      let textSplit = plan.split(seperator);
      //gets the correct element and applies whats saved for it
      $("#" + textSplit[0]).children("textarea").val(textSplit[1]);
    }
  }

  //checks if there's any plans the user has already saved
  let localPlans = JSON.parse(localStorage.getItem("localPlans"));
  if(localPlans !== null){
    todaysPlans = localPlans;
    updatePlans();
  }

  //formats the date to how it's wanted and displays at the top of the page
  let currentDate = dayjs().format("dddd, MMMM D");
  //depending on what day it is it will add the appropriate suffix
  switch(currentDate.slice(currentDate.length - 2).trim()){
    case '1':
      currentDate += "st";
      break;
    case '2':
      currentDate += "nd";
      break;
    case '3':
      currentDate += "rd";
      break;
    default :
      currentDate += "th";
      break;
  }
  //sets the text at the top
  $("#currentDay").text(currentDate);

});
