const fullcalendar = document.querySelector(".fullcalendar .days"),
    dynamicCalendar = document.querySelector(".dynaminCalendar .days"),
    currentDate_full = document.querySelector(".fullcalendar .current-date"),
    currentDate_dynamic = document.querySelector(".dynaminCalendar .current-date"),
    prevNextIcon = document.querySelectorAll(".icons span");

// getting new date, current year and month
let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();

// storing full name of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
        lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
        lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month

    let numday = 0;
    let tdTag = "";
    let liTag = "";

    tdTag += `<tr>`;
    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        tdTag += `<td onclick="showModel()" class="inactive" id="${(lastDateofLastMonth - i + 1).toString() + currMonth.toString() + currYear.toString()}" >${lastDateofLastMonth - i + 1}</td>`;
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
        numday++;
    }

    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        let isToday = i == date.getDate() && currMonth == new Date().getMonth()
            && currYear == new Date().getFullYear() ? "active" : "daymonth";

        tdTag += `<td onclick="showModel()" class="${isToday}" id="${i.toString() + (currMonth + 1).toString() + currYear.toString()}" >${i}</td>`;
        liTag += `<li class="${isToday}">${i}</li>`;
        numday++;

        if (numday == 7) {
            tdTag += `</tr>`;
            numday = 0;
        }
    }

    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        tdTag += `<td onclick="showModel()" class="inactive" id="${(i - lastDayofMonth + 1).toString() + (currMonth + 2).toString() + currYear.toString()}" >${i - lastDayofMonth + 1}</td>`
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
        numday++;
    }

    currentDate_dynamic.innerText = `${months[currMonth]} ${currYear}`;
    dynamicCalendar.innerHTML = liTag;

    currentDate_full.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
    fullcalendar.innerHTML = tdTag;
}
renderCalendar();

prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id == "prev" ? currMonth - 1 : currMonth + 1;
        if (currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }
        renderCalendar(); // calling renderCalendar function
    });
});

function showModel() {
    console.log("Yak sus");

    const modal = document.querySelector(".modal");
    const closeModalBtn = document.querySelector(".btn-close");
    const cancleModalBtn = document.querySelector(".btn-cancle");

    modal.classList.add("is-active");

    const closeModal = function () {
        modal.classList.remove("is-active");
    };
    closeModalBtn.addEventListener("click", closeModal);
    cancleModalBtn.addEventListener("click", closeModal);
}

function addSchedule() {
    console.log("add schedule");

    const modal = document.querySelector(".modal");
    let text = document.getElementById("title").value;
    console.log("Title : " + text);

    // const table = document.getElementById();
    // table.innerText = text;



    if (text != "") {
        modal.classList.remove("is-active");
    } else {
        alert("Please enter your title.");
    }
}