// --------------------- Show Model --------------------- //
function showModel() {
    const modalSchedule = document.querySelector(".model-addSchedule");
    const closeModalBtn = document.querySelector(".btn-close");
    const cancleModalBtn = document.querySelector(".btn-cancle");

    // show model
    modalSchedule.classList.add("is-active");

    // close model
    const closeModal = function () {
        modalSchedule.classList.remove("is-active");
    };
    closeModalBtn.addEventListener("click", closeModal);
    cancleModalBtn.addEventListener("click", closeModal);
}



function showDropdown() {

    document.getElementById("profileDropdown").classList.toggle("is-active");

    window.onclick = function (event) {
        if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("tab-profile");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('is-active')) {
                    openDropdown.classList.remove('is-active');
                }
            }
        }
    }
}


function showProfile() {
    const modelProfile = document.querySelector(".model-profile");
    const closeModalBtn = document.querySelector(".btnDelete");
    const cancleModalBtn = document.querySelector(".btnCancel");
    const input = document.querySelectorAll(".user-card");

    modelProfile.classList.add("is-active");

    const closeModal = function () {
        modelProfile.classList.remove("is-active");

        for (let i = 0; i < input.length; i++) {
            input[i].style.pointerEvents = "none";
        }

    };
    closeModalBtn.addEventListener("click", closeModal);
    cancleModalBtn.addEventListener("click", closeModal);
}



function todayIcon() {

    window.onclick = function (event) {
        if (event.target.matches('.todayFull-btn')) {
            // console.log("todayIcon")
            date = new Date();
            currYearFull = date.getFullYear();
            currMonthFull = date.getMonth();
            renderFullCalendar();
            showSchedule();
        } else if (event.target.matches('.todayDy-btn')) {
            date = new Date();
            currYearDynamic = date.getFullYear();
            currMonthDynamic = date.getMonth();
            renderDynamicCalendar();
        }
    }

}



function navbar() {
    const currPageUrl = location.href;
    const menuItem = document.querySelectorAll("a");

    for (let i = 0; i < menuItem.length; i++) {
        if (menuItem[i].href === currPageUrl) {
            menuItem[i].className = "nav-item pl-5 pr-5 py-3 mb-5 navbar-active is-active";
        }
    }
}
navbar()



function updateDataUser() {

    const iconUsername = document.getElementById("iconUsername");
    const iconFname = document.getElementById("iconFname");
    const iconLname = document.getElementById("iconLname");
    const iconEmail = document.getElementById("iconEmail");
    const iconPwd = document.getElementById("iconPwd");

    iconUsername.addEventListener("click", () => {
        const username = document.getElementById("username");
        username.style.pointerEvents = "all";
        username.focus();
    })

    iconFname.addEventListener("click", () => {
        const fname = document.getElementById("fname");
        fname.style.pointerEvents = "all";
        fname.focus();
    })

    iconLname.addEventListener("click", () => {
        const lname = document.getElementById("lname");
        lname.style.pointerEvents = "all";
        lname.focus();
    })

    iconEmail.addEventListener("click", () => {
        const email = document.getElementById("email");
        email.style.pointerEvents = "all";
        email.focus();
    })

    iconPwd.addEventListener("click", () => {
        const password = document.getElementById("password");
        password.style.pointerEvents = "all";
        password.focus();
    })

}

function showModel_task() {
    const modalTask = document.querySelector(".model-task");
    const closeModalBtn = document.querySelector(".btn-close");
    const cancleModalBtn = document.querySelector(".btn-cancle");

    // show model
    modalTask.classList.add("is-active");

    // close model
    const closeModal = function () {
        modalTask.classList.remove("is-active");
    };
    closeModalBtn.addEventListener("click", closeModal);
    cancleModalBtn.addEventListener("click", closeModal);
}


// function showTaskToDo() {
//     const modal_to_do = document.querySelector(".task-to-do");
//     modal_to_do.classList.remove("is-active");

//     const iconTodo = document.querySelector(".tabs-wrapper .icon-todo");
//     iconTodo.style.transform = "rotate(180deg)";

//     const openModal = function () {
//         modal_to_do.classList.add("is-active");
//     };
//     modal_to_do.addEventListener("click", openModal);
// }


// function showTaskDone() {
//     const modal_done = document.querySelector(".task-done");
//     modal_done.classList.remove("is-active");

//     const iconDone = document.querySelector(".tabs-wrapper .icon-done");
//     iconDone.style.transform = "rotate(180deg)";

//     if (this.status2 == false) {
//       modal_done.classList.add("is-active");
//       iconDone.style.transform = "";
//     }
// }


// --------------------- Show Schedule --------------------- //
function showSchedule() {

    const scheduleAll = JSON.parse(document.getElementById('schedule').dataset.scheduleAll);
    console.log(scheduleAll)

    scheduleAll.forEach((item, index) => {

        console.log('item date ' + index + ' : ' + item.schedule_date);

        const div = document.createElement("div");
        const date = item.schedule_date;
        const title = item.schedule_act;
        const tdDate = document.getElementById(date);
        console.log('tdDate ' + index + ' : ' + tdDate)
        div.innerHTML = title;
        tdDate.appendChild(div);
        div.classList.add("boxtext");

    })

}
showSchedule();


