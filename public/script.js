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


// --------------------- Show Model --------------------- //
function showModelSchedule() {
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

    let tdDate = document.getElementById(date.value);
    let div = document.createElement("div");
    div.innerHTML = text.value;
    div.classList.add("boxtext");

    if (text.value != "" || date.value != "") {
        tdDate.appendChild(div);
        modal.classList.remove("is-active");

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
// function showArray() {

//     array.forEach((item, index) => {

//         let div = document.createElement("div");
//         let schedule1 = document.getElementById("schedule1");
//         let todayDate = new Date();
//         let todaySchedule = item["date"];

//         if (todaySchedule == todayDate.getFullYear() + '-' + ((todayDate.getMonth() + 1) < 10 ? '0' : '') + (todayDate.getMonth() + 1) + '-' + (todayDate.getDate() < 10 ? '0' : '') + todayDate.getDate()) {
//             schedule1.innerHTML = item["title"];

//             let date = item["date"];
//             let title = item["title"];
//             let tdDate = document.getElementById(date);

//             div.innerHTML = title;
//             tdDate.appendChild(div);
//             div.classList.add("boxtext");
//         } else {
//             let date = item["date"];
//             let title = item["title"];
//             let idDate = document.getElementById(date);

//             div.innerHTML = title;
//             idDate.appendChild(div);
//             div.classList.add("boxtext");
//         }
//     })
// }
// showArray();