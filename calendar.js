const fullcalendar = document.querySelector(".fullcalendar .days"),
    dynamicCalendar = document.querySelector(".dynaminCalendar .days"),
    currentDate_full = document.querySelector(".fullcalendar .current-date"),
    currentDate_dynamic = document.querySelector(".dynaminCalendar .current-date");

let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();

const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

let array = [{
    "title": "Travel with boyfriend",
    "date": "2023-03-01"
},
{
    "title": "Comback home",
    "date": "2023-03-02"
},
{
    "title": "Present web pro",
    "date": "2023-03-03"
},
];


// --------------------- Get LocalStorage --------------------- //
function getLocalStorage() {
    const savelocalStorage = JSON.parse(localStorage.getItem("schedule"));

    if (savelocalStorage != null) {
        array = savelocalStorage;
    }

}
getLocalStorage();


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
        tdTag += `<td class="inactive" id="${currYear.toString() + "-" + (currMonth < 10 ? "0" : "") + (currMonth).toString() + "-" + ((lastDateofLastMonth - i + 1) < 10 ? "0" : "") + (lastDateofLastMonth - i + 1).toString()}" >${lastDateofLastMonth - i + 1}</td>`;
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
        numday++;
    }

    for (let i = 1; i <= lastDateofMonth; i++) { // create date of present month

        // add class in <td></td>
        let isToday = i == date.getDate() && currMonth == new Date().getMonth()
            && currYear == new Date().getFullYear() ? "active" : "";

        tdTag += `<td class="${isToday}" id="${currYear.toString() + "-" + ((currMonth + 1) < 10 ? "0" : "") + (currMonth + 1).toString() + "-" + ((i) < 10 ? "0" : "") + (i).toString()}" >${i}</td>`;
        liTag += `<li class="${isToday}">${i}</li>`;
        numday++;

        if (numday == 7) {
            tdTag += `</tr>`;
            numday = 0;
        }
    }

    for (let i = lastDayofMonth; i < 6; i++) { // create date of next month
        tdTag += `<td class="inactive" id="${currYear.toString() + "-" + ((currMonth + 2) < 10 ? "0" : "") + (currMonth + 2).toString() + "-" + ((i - lastDayofMonth + 1) < 10 ? "0" : "") + (i - lastDayofMonth + 1).toString()}" >${i - lastDayofMonth + 1}</td>`
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

    const prevNextIcon = document.querySelectorAll(".icons span");

    // checked btn prev & next
    prevNextIcon.forEach(icon => {

        icon.addEventListener("click", () => {
            // checked month
            currMonth = icon.id == "prev" ? currMonth - 1 : currMonth + 1;

            // checked year
            if (currMonth < 1 || currMonth > 11) {
                date = new Date(currYear, currMonth, new Date().getDate());
                currYear = date.getFullYear();
                currMonth = date.getMonth();
            }
            renderCalendar();
            getLocalStorage();
            showArray();
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
    let date = document.getElementById("date");

    let idDate = document.getElementById(date.value);
    let div = document.createElement("div");
    div.innerHTML = text.value;
    div.classList.add("boxtext");
    idDate.appendChild(div);

    if (text.value != "") {
        modal.classList.remove("is-active");
        console.log("create schedule");

        // push down array
        array.push({
            title: text.value,
            date: date.value
        });
        text.value = "";
        date.value = "";

        // save down localStorage
        window.localStorage.setItem("schedule", JSON.stringify(array));

    } else {
        alert("Please enter your title.");
    }
}



// --------------------- Show Array --------------------- //
function showArray() {

    array.forEach((item, index) => {

        let div = document.createElement("div");
        let schedule1 = document.getElementById("schedule1");
        let todayDate = new Date();
        let todaySchedule = item["date"];

        if (todaySchedule == todayDate.getFullYear() + '-' + ((todayDate.getMonth() + 1) < 10 ? '0' : '') + (todayDate.getMonth() + 1) + '-' + (todayDate.getDate() < 10 ? '0' : '') + todayDate.getDate()) {
            schedule1.innerHTML = item["title"];

            let date = item["date"];
            let text = item["title"];
            let idDate = document.getElementById(date);

            div.innerHTML = text;
            idDate.appendChild(div);
            div.classList.add("boxtext");
        } else {
            let date = item["date"];
            let text = item["title"];
            let idDate = document.getElementById(date);

            div.innerHTML = text;
            idDate.appendChild(div);
            div.classList.add("boxtext");
        }
    })
}
showArray();