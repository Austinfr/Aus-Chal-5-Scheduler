//I am hoping no one has a keyboard shorcut for this character
let seperator = "\u0482";
let todaysPlans = [];

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  function storePlan(time, plan){
    todaysPlans.push(time + "" + seperator + "" + plan);
    localStorage.setItem("localPlans", JSON.stringify(todaysPlans));
  }

  // Done: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  let currentHour = dayjs().hour();
  $(".time-block").each(function(){
    //this chunk sets the classes for where its at
    let hour = $(this).attr("id").slice($(this).attr("id").indexOf("-") + 1);
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
      if($(event.target).hasClass("saveBtn")){
        storePlan($(this).attr("id"), $(this).children("textarea").val());
      }
    });
  });

  // Done: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  //Will use an array to store the value with the current hour
  //it will be formatted as ["hourid(seperator)text"] with (seperator) = \u0482
  //for example: localPlans[0] could return "hour-4҂go to doctors office"
  let updatePlans = function(){
    for(let plan of todaysPlans){
      let textSplit = plan.split(seperator);
      $("#" + textSplit[0]).children("textarea").text(textSplit[1]);
    }
  }

  let localPlans = JSON.parse(localStorage.getItem("localPlans"));
  if(localPlans !== null){
    todaysPlans = localPlans;
    updatePlans();
  }



  // Done: Add code to display the current date in the header of the page.
  let currentDate = dayjs().format("dddd, MMMM D");
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
  $("#currentDay").text(currentDate);

});
