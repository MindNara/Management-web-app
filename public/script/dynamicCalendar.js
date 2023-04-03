const dynamicCalendar = document.querySelector(".dynaminCalendar .days"),
    currentDate_dynamic = document.querySelector(".dynaminCalendar .current-date");

let dateDy = new Date(),
    currYearDynamic = dateDy.getFullYear(),
    currMonthDynamic = dateDy.getMonth();

const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];


// --------------------- Render Calendar --------------------- //
function renderDynamicCalendar() {
    let firstDayofMonth = new Date(currYearDynamic, currMonthDynamic, 1).getDay(), // first day of current month = 3
        lastDateofMonth = new Date(currYearDynamic, currMonthDynamic + 1, 0).getDate(), // last date of current month = 31
        lastDayofMonth = new Date(currYearDynamic, currMonthDynamic, lastDateofMonth).getDay(), // last day of current month = 5
        lastDateofLastMonth = new Date(currYearDynamic, currMonthDynamic, 0).getDate(); // last date of last month = 28

    let liTag = "";

    for (let i = (firstDayofMonth - 1); i >= 0; i--) { // create date of last month
        let dateofLastMonth = lastDateofLastMonth - i;
        liTag += `<li class="inactive">${dateofLastMonth}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) { // create date of current month
        let isToday = i == dateDy.getDate() && currMonthDynamic == new Date().getMonth() && currYearDynamic == new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = (lastDayofMonth + 1); i < 7; i++) { // create date of next month
        let dateofNextMonth = i - lastDayofMonth;
        liTag += `<li class="inactive">${dateofNextMonth}</li>`
    }

    currentDate_dynamic.innerText = `${months[currMonthDynamic]} ${currYearDynamic}`;
    dynamicCalendar.innerHTML = liTag;

}
renderDynamicCalendar();



// --------------------- Change Month --------------------- //
function prevNextIcon() {

    const prevNextIcon = document.querySelectorAll(".icons-dynamic span");

    // checked btn prev & next
    prevNextIcon.forEach(icon => {

        icon.addEventListener("click", () => {
            // checked month
            currMonthDynamic = icon.id == "prev" ? currMonthDynamic - 1 : currMonthDynamic + 1;

            // checked year
            if (currMonthDynamic < 1 || currMonthDynamic > 11) {
                date = new Date(currYearDynamic, currMonthDynamic, new Date().getDate());
                currYearDynamic = dateDy.getFullYear();
                currMonthDynamic = dateDy.getMonth();
            }
            renderDynamicCalendar();
        });
    });

}
prevNextIcon();