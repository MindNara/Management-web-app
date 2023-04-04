const fullcalendar = document.querySelector(".fullcalendar .days"),
    currentDate_full = document.querySelector(".fullcalendar .current-date");

let date = new Date(),
    currYearFull = date.getFullYear(),
    currMonthFull = date.getMonth();

const monthsFull = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

let array = [
    {
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
    {
        "title": "Eng Midterm",
        "date": "2023-03-07"
    },
    {
        "title": "DSC Midterm",
        "date": "2023-03-08"
    },
    {
        "title": "Prob Midterm",
        "date": "2023-03-09"
    },
    {
        "title": "ISAD Midterm",
        "date": "2023-03-11"
    },
    {
        "title": "SE Midterm",
        "date": "2023-03-13"
    }
];


// --------------------- Get LocalStorage --------------------- //
function getLocalStorage() {
    const savelocalStorage = JSON.parse(localStorage.getItem("schedule"));

    if (savelocalStorage != null) {
        array = savelocalStorage;
    }

}
getLocalStorage();



// --------------------- Render Calendar --------------------- //
function renderFullCalendar() {
    let firstDayofMonth = new Date(currYearFull, currMonthFull, 1).getDay(), // first day of current month = 3
        lastDateofMonth = new Date(currYearFull, currMonthFull + 1, 0).getDate(), // last date of current month = 31
        lastDayofMonth = new Date(currYearFull, currMonthFull, lastDateofMonth).getDay(), // last day of current month = 5
        lastDateofLastMonth = new Date(currYearFull, currMonthFull, 0).getDate(); // last date of last month = 28

    let numday = 0;
    let tdTag = "";

    tdTag += `<tr>`;
    for (let i = (firstDayofMonth - 1); i >= 0; i--) { // create date of last month
        let dateofLastMonth = lastDateofLastMonth - i;
        tdTag += `<td class="inactive" id="${currYearFull + "-" + (currMonthFull < 10 ? "0" : "") + (currMonthFull) + "-" + ((dateofLastMonth) < 10 ? "0" : "") + (dateofLastMonth)}" >${dateofLastMonth}</td>`;
        numday++;
    }

    for (let i = 1; i <= lastDateofMonth; i++) { // create date of current month

        // add class in <td></td>
        let isToday = i == date.getDate() && currMonthFull == new Date().getMonth() && currYearFull == new Date().getFullYear() ? "active" : "";

        tdTag += `<td class="${isToday}" id="${currYearFull + "-" + ((currMonthFull + 1) < 10 ? "0" : "") + (currMonthFull + 1) + "-" + ((i) < 10 ? "0" : "") + (i)}" >${i}</td>`;
        numday++;

        if (numday > 6) {
            tdTag += `</tr>`;
            numday = 0;
        }
    }

    for (let i = (lastDayofMonth + 1); i < 7; i++) { // create date of next month
        let dateofNextMonth = i - lastDayofMonth;
        tdTag += `<td class="inactive" id="${currYearFull + "-" + ((currMonthFull + 2) < 10 ? "0" : "") + (currMonthFull + 2) + "-" + ((dateofNextMonth) < 10 ? "0" : "") + (dateofNextMonth)}" >${dateofNextMonth}</td>`
        numday++;
    }

    currentDate_full.innerText = `${monthsFull[currMonthFull]} ${currYearFull}`;
    fullcalendar.innerHTML = tdTag;

}
renderFullCalendar();


// --------------------- Change Month --------------------- //
function prevNextIcon() {

    const prevNextIcon = document.querySelectorAll(".icons-full span");

    // checked btn prev & next
    prevNextIcon.forEach(icon => {

        icon.addEventListener("click", () => {

            // checked month
            currMonthFull = icon.id == "prev" ? currMonthFull - 1 : currMonthFull + 1;

            // checked year
            if (currMonthFull < 1 || currMonthFull > 11) {
                date = new Date(currYearFull, currMonthFull, new Date().getDate());
                currYearFull = date.getFullYear();
                currMonthFull = date.getMonth();
            }
            renderFullCalendar();
        });
    });

}
prevNextIcon();



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
            let title = item["title"];
            let tdDate = document.getElementById(date);

            div.innerHTML = title;
            tdDate.appendChild(div);
            div.classList.add("boxtext");
        } else {
            let date = item["date"];
            let title = item["title"];
            let idDate = document.getElementById(date);

            div.innerHTML = title;
            idDate.appendChild(div);
            div.classList.add("boxtext");
        }
    })
}
showArray();