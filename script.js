// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  const schedules = getSchedules();
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  $(".saveBtn").on("click", function () {
    // check
    // console.log(this);

    // get values from ui
    const description = $(this).siblings(".description").val();
    const hourBlockId = $(this).parent().attr("id");

    // console.log(description, hourBlockId);

    // hold temp data
    const tmp = {
      hour: hourBlockId,
      description: description,
    };

    // store schedule
    const schedulesTmp = getSchedules();
    const schedules = schedulesTmp.filter((e) => e.hour !== hourBlockId);
    schedules.push(tmp);

    // save to local storage
    setSchedules(schedules);
  });

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  function getTimeOfTheDay() {
    // get current number of hours.
    const hourOfTheDay = dayjs().hour();

    // check each time
    $(".time-block").each(function () {
      const timeBlockTmp = parseInt($(this).attr("id").split("hour")[1]);

      // check
      // console.log(timeBlockTmp, hourOfTheDay);

      // add or remove dynamic class base on time
      if (timeBlockTmp === hourOfTheDay) {
        $(this).addClass("present");
      } else if (timeBlockTmp < hourOfTheDay) {
        $(this).addClass("past");
      } else {
        $(this).addClass("future");
      }
    });
  }
  getTimeOfTheDay();

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  // local storage
  for (let schedule of schedules) {
    // check if getting schedules from ls
    // console.log(schedule.hour, schedule.description);
    const targetHourBlock = `#${schedule.hour} .description`;
    // console.log(targetHourBlock);

    // add schedules to target hour block
    $(targetHourBlock).val(schedule.description);
  }

  function setSchedules(schedules) {
    localStorage.setItem("workDaySchedules", JSON.stringify(schedules));
  }

  function getSchedules() {
    const schedules = JSON.parse(localStorage.getItem("workDaySchedules"));
    return schedules !== null ? schedules : [];
  }
  
  // TODO: Add code to display the current date in the header of the page.
  $("#currentDay").text(dayjs(new Date()).toString());
});
