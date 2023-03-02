const fullcalendar = document.querySelector(".fullcalendar .days"),
    dynamicCalendar = document.querySelector(".dynaminCalendar .days"),
    currentDate_full = document.querySelector(".fullcalendar .current-date"),
    currentDate_dynamic = document.querySelector(".dynaminCalendar .current-date");

let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();
console.log("Month : " + currMonth);

const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];


// --------------------- Calendar --------------------- //
function renderCalendar() {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // first day of month
        lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // last date of month
        lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // last day of month
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // last date of last month

    let numday = 0;
    let tdTag = "";
    let liTag = "";

    tdTag += `<tr id="show">`;
    for (let i = firstDayofMonth; i > 0; i--) { // create date of last month
        tdTag += `<td onclick="showModel()" class="inactive" id="${(lastDateofLastMonth - i + 1).toString() + currMonth.toString() + currYear.toString()}" >${lastDateofLastMonth - i + 1}</td>`;
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
        numday++;
    }

    for (let i = 1; i <= lastDateofMonth; i++) { // create date of present month

        // add class in <td></td>
        let isToday = i == date.getDate() && currMonth == new Date().getMonth()
            && currYear == new Date().getFullYear() ? "active" : "";

        tdTag += `<td onclick="showModel()" class="${isToday}" id="${i.toString() + (currMonth + 1).toString() + currYear.toString()}" >${i}</td>`;
        liTag += `<li class="${isToday}">${i}</li>`;
        numday++;

        if (numday == 7) {
            tdTag += `</tr>`;
            numday = 0;
        }
    }

    for (let i = lastDayofMonth; i < 6; i++) { // create date of next month
        tdTag += `<td onclick="showModel()" class="inactive" id="${(i - lastDayofMonth + 1).toString() + (currMonth + 2).toString() + currYear.toString()}" >${i - lastDayofMonth + 1}</td>`
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
        numday++;
    }

    currentDate_dynamic.innerText = `${months[currMonth]} ${currYear}`;
    dynamicCalendar.innerHTML = liTag;

    currentDate_full.innerText = `${months[currMonth]} ${currYear}`;
    fullcalendar.innerHTML = tdTag;
}
renderCalendar();


// --------------------- Change Month --------------------- //
function prevNextIcon() {

    const prevNextIcon = document.querySelectorAll(".icons span"); // span icon have 2 btn
    prevNextIcon.forEach(icon => { // use to forEach -> get prav & next icons

        icon.addEventListener("click", () => {
            // checked month
            currMonth = icon.id == "prev" ? currMonth - 1 : currMonth + 1;

            // checked year
            if (currMonth < 1 || currMonth > 11) {
                date = new Date(currYear, currMonth, new Date().getDate());
                currYear = date.getFullYear();
                currMonth = date.getMonth();
            } else {
                date = new Date();
            }
            renderCalendar();

        });

    });
}
prevNextIcon();


// --------------------- Show Model --------------------- //
function showModel() {
    console.log("add schedule");

    const modal = document.querySelector(".modal");
    const closeModalBtn = document.querySelector(".btn-close");
    const cancleModalBtn = document.querySelector(".btn-cancle");

    // show model
    modal.classList.add("is-active");

    // close model
    const closeModal = function () {
        modal.classList.remove("is-active");
    };
    closeModalBtn.addEventListener("click", closeModal);
    cancleModalBtn.addEventListener("click", closeModal);
}


// --------------------- Add Schedule --------------------- //
function addSchedule() {
    const modal = document.querySelector(".modal");
    let text = document.getElementById("title");
    console.log("Title : " + text.value);

    let statusDate = document.getElementsByClassName("inactive");
    console.log("StatusDate : " + statusDate.id);


    // let tdId = "";
    // for (let i = firstDayofMonth; i > 0; i--) {
    //     for (let j = 1; j <= lastDateofMonth; j++) {
    //         for (let k = lastDayofMonth; k < 6; k++) {

    //             tdId = (lastDateofLastMonth - i + 1).toString() + currMonth.toString() + currYear.toString();
    //             console.log(tdId);

    //             // if (document.getElementById(tdId)) {
    //             //     // table.innerText = text;
    //             //     console.log("Suscess")
    //             // }

    //         }
    //     }
    // }



    if (text.value != "") {
        modal.classList.remove("is-active");
        console.log("create schedule");
        text.value = "";
    } else {
        alert("Please enter your title.");
    }
}