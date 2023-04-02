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

    // const dropdrownProfile = document.querySelector(".tab-profile");

    // dropdrownProfile.classList.add("is-active");

    // const closeModal = function () {
    //     dropdrownProfile.classList.remove("is-active");
    // };
    // dropdrownProfile.addEventListener("click", closeModal);
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

    modelProfile.classList.add("is-active");

    const closeModal = function () {
        modelProfile.classList.remove("is-active");
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
