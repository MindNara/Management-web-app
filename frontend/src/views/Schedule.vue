<template>
    <div class="container.is-fullhd" id="app">

        <!----------------------------------------------- header column ----------------------------------------------->
        <div class="container-header columns" style="height: 12vh;">

            <!---------------------------- logo ---------------------------->
            <div class="column is-2">
                <Logo />
            </div>

            <!---------------------------- title ---------------------------->
            <div class="column is-7">

                <!----------------- title ----------------->
                <div class="level">
                    <div class="level-left pt-5">
                        <span class="is-size-2-fullhd is-size-3-widescreen has-text-weight-medium has-text-black">My
                            Schedule</span>
                    </div>

                    <div class="level-right pt-5 btn-open">
                        <button type="submit" class="create-s button is-black" @click="showModel = !showModel">
                            <i class="fas fa-solid fa-plus mr-3"></i>
                            <span>Create Schedule</span>
                        </button>
                    </div>
                </div>

            </div>

            <!---------------------------- profile member ---------------------------->
            <div class="profile level column">
                <div class="level-right pt-4" style="width: 100%;">
                    <profile />
                </div>
            </div>
        </div>

        <div class="container-content columns" style="height: 88vh;">

            <!----------------------------------------------- navbar column ----------------------------------------------->
            <div class="content-navbar column is-2">
                <!---------------------------- navbar ---------------------------->
                <Navbar />
            </div>

            <!----------------------------------------------- calendar column ----------------------------------------------->
            <div class="content-calendar column is-7">

                <!---------------------------- FullCalendar ---------------------------->
                <div id="calendar" class="calendar" style="width: 100%;">
                    <div class="fullcalendar calendar">
                        <header class="level m-0">
                            <div class="level-left">
                                <p class="current-date has-text-black is-size-4"></p>
                            </div>
                            <div class="level-right">
                                <span id="today today-btn" class="todaybtn todayFull-btn" @click="goToToday">Today</span>
                                <div class="icons icons-full">
                                    <span @click="goToPreviousMonth"><i class='bx bxs-chevron-left is-size-4'></i></span>
                                    <span @click="goToNextMonth"><i class='bx bxs-chevron-right is-size-4'></i></span>
                                </div>
                            </div>

                        </header>
                        <table class="table is-bordered" style="width: 100%;">
                            <thead class="p-3">
                                <tr class="weeks">
                                    <th>Sun</th>
                                    <th>Mon</th>
                                    <th>Tue</th>
                                    <th>Wed</th>
                                    <th>Thu</th>
                                    <th>Fri</th>
                                    <th>Sat</th>
                                </tr>
                            </thead>
                            <tbody class="days"></tbody>
                        </table>
                    </div>
                </div>

            </div>

            <!----------------------------------------------- schedule column ----------------------------------------------->
            <div class="content-schedule column is-3">

                <!---------------------------- Dynamic Calendar ---------------------------->
                <div class="content-c columns mr-1 mb-5" style="height: auto;">
                    <div class="calendar-box mr-5 ml-3 mt-3" style="width: 100%; height: 100%;">
                        <div class="dynaminCalendar calendar" style="width: 100%; height: auto;">
                            <header class="level m-0">
                                <div class="level-left">
                                    <p class="current-date has-text-black ml-4"></p>
                                </div>
                                <div class="level-right">
                                    <span class="todaybtn todayDy-btn" @click="goToToday">Today</span>
                                    <div class="icons icons-dynamic mr-2">
                                        <span @click="goToPreviousMonth"><i
                                                class='bx bxs-chevron-left has-text-black'></i></span>
                                        <span @click="goToNextMonth"><i
                                                class='bx bxs-chevron-right has-text-black'></i></span>
                                    </div>
                                </div>
                            </header>
                            <!-- Dynamic Calendar -->
                            <div class="dinamiccalendar pb-1">
                                <ul class="weeks">
                                    <li>Sun</li>
                                    <li>Mon</li>
                                    <li>Tue</li>
                                    <li>Wed</li>
                                    <li>Thu</li>
                                    <li>Fri</li>
                                    <li>Sat</li>
                                </ul>
                                <ul class="days"></ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!---------------------------- schedule row ---------------------------->
                <div class="content-tt columns" style="height: 38vh;">
                    <div class="today-schedule today-tasks column">

                        <div class="level columns" style="height: 5vh;">
                            <div class="level-left">
                                <div class="column">
                                    <span
                                        class="has-text-black is-size-4-fullhd has-text-weight-medium is-size-5-widescreen">
                                        Today Schedule
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="columns" style="height: 32vh; overflow-y: auto; overflow-x: hidden;">
                            <div class="column mr-5">
                                <div class="schedulesToday" v-if="schedulesToday.length === 0">
                                    <span>Today is schedule-free</span>
                                </div>
                                <div v-else>
                                    <div v-for="schedule in schedulesToday" :key="schedule.id">
                                        <div class="level schedule-box px-5 mb-4">
                                            <div class="level-left">
                                                <span id="schedule2" class="has-text-black">{{ schedule.schedule_act
                                                }}</span>
                                            </div>
                                            <div class="level-right" style="opacity: 80%;">
                                                <a class="mr-4 icon has-text-dark"
                                                    @click="editSchedule(schedule.schedule_id)"><i
                                                        class="fas fa-pen"></i></a>
                                                <a class="icon" style="color: rgb(105, 16, 16);"
                                                    @click="deleteSchedule(schedule.schedule_id, schedule.schedule_act)"><i
                                                        class="fas fa-trash"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <!-- modal-add-schedule -->
        <div class="modal model-addSchedule" :class="{ 'is-active': showModel }">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title has-text-weight-semibold">ADD SCHEDULE</p>
                    <a class="delete btn-close" aria-label="close" @click="showModel = !showModel; closeEditingInput()"></a>
                </header>
                <!-- Content ... -->
                <section class="modal-card-body">
                    <div class="field">
                        <label class="label">TITLE :</label>
                        <div class="control has-icons-left has-icons-right">
                            <input class="input" type="text" name="schedule_act" id="schedule_act" placeholder="your title"
                                v-model="schedule.schedule_act" :class="{ 'is-danger': v$.schedule_act.$error }"
                                @input="v$.schedule_act.$touch()">
                            <span class="icon is-small is-left">
                                <i class="fas fa-book"></i>
                            </span>
                        </div>
                        <span v-if="v$.schedule_act.$error">
                            <p class="help is-danger">{{ v$.schedule_act.$errors[0].$message }}</p>
                        </span>
                    </div>
                    <div class="field">
                        <label for="date" class="label">DATE :</label>
                        <div class="control has-icons-left has-icons-right">
                            <input type="date" id="schedule_date" name="schedule_date" class="input"
                                v-model="schedule.schedule_date" :class="{ 'is-danger': v$.schedule_date.$error }"
                                @input="v$.schedule_date.$touch()">
                            <span class="icon is-small is-left">
                                <i class="fas fa-calendar"></i>
                            </span>
                        </div>
                        <span v-if="v$.schedule_date.$error">
                            <p class="help is-danger">{{ v$.schedule_date.$errors[0].$message }}</p>
                        </span>
                    </div>
                </section>
                <footer class="modal-card-foot level">
                    <a class="btn-create button is-black" type="button" @click="createSchedule()">Create</a>
                    <a class="button btn-cancle" @click="showModel = !showModel; closeAddSchedule()">Cancel</a>
                </footer>
            </div>
        </div>

        <!-- modal-edit-schedule -->
        <div class="modal model-addSchedule" :class="{ 'is-active': showModelEdit }">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title has-text-weight-semibold">EDIT SCHEDULE</p>
                    <a class="delete btn-close" aria-label="close" @click="showModelEdit = !showModelEdit;"></a>
                </header>
                <!-- Content ... -->
                <section class="modal-card-body">
                    <div class="field">
                        <label class="label">TITLE :</label>
                        <div class="control has-icons-left has-icons-right">
                            <input class="input" type="text" placeholder="your title"
                                v-model="schedule_edit.schedule_act_edit"
                                :class="{ 'is-danger': vEdit$.schedule_act_edit.$error }"
                                @input="vEdit$.schedule_act_edit.$touch()">
                            <span class="icon is-small is-left">
                                <i class="fas fa-book"></i>
                            </span>
                        </div>
                        <span v-if="vEdit$.schedule_act_edit.$error">
                            <p class="help is-danger">{{ vEdit$.schedule_act_edit.$errors[0].$message }}</p>
                        </span>
                    </div>
                    <div class="field">
                        <label for="date" class="label">DATE :</label>
                        <div class="control has-icons-left has-icons-right">
                            <input type="date" class="input" v-model="schedule_edit.schedule_date_edit"
                                :class="{ 'is-danger': vEdit$.schedule_date_edit.$error }"
                                @input="vEdit$.schedule_date_edit.$touch()">
                            <span class="icon is-small is-left">
                                <i class="fas fa-calendar"></i>
                            </span>
                        </div>
                        <span v-if="vEdit$.schedule_date_edit.$error">
                            <p class="help is-danger">{{ vEdit$.schedule_date_edit.$errors[0].$message }}</p>
                        </span>
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <div class="level" style="width: 100%;">
                        <div class="level-left">
                            <a class="btn-create button is-black" type="button"
                                @click="updateSchedule(schedule_edit.schedule_id_edit)">Update</a>
                            <a class="button btn-cancle" @click="showModelEdit = !showModelEdit;">Cancel</a>
                        </div>
                        <div class="level-right">
                            <a class="btn-create button has-text-white" type="button" style="background: rgb(138, 22, 22);"
                                @click="deleteSchedule(schedule_edit.schedule_id_edit, schedule_edit.schedule_act_edit)">Delete</a>
                        </div>
                    </div>

                </footer>
            </div>
        </div>

    </div>
</template>

<script>
import Logo from '../components/Logo.vue'
import Navbar from '../components/Navbar.vue'
import Profile from '../components/Profile.vue'
import { reactive, ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import axios from '@/plugins/axios'


export default {
    data() {
        const date = new Date();
        return {
            showModel: false,
            showModelEdit: false,
            date: date,
            currYear: date.getFullYear(),
            currMonth: date.getMonth(),
            months: [
                "January", "February", "March", "April", "May", "June", "July",
                "August", "September", "October", "November", "December"
            ],
        }
    },
    setup() {
        const schedulesToday = ref(null);
        const schedulesAll = ref(null);

        const schedule = reactive({
            schedule_act: '',
            schedule_date: '',
        })

        const schedule_edit = reactive({
            schedule_act_edit: '',
            schedule_date_edit: '',
            schedule_id_edit: '',
        })

        const rules = {
            schedule_act: {
                required: required,
            },
            schedule_date: {
                required: required,
            },
        }

        const rules_edit = {
            schedule_act_edit: {
                required: required,
            },
            schedule_date_edit: {
                required: required,
            },
        }

        const v$ = useVuelidate(rules, schedule);
        const vEdit$ = useVuelidate(rules_edit, schedule_edit);

        return { schedule, schedulesToday, schedulesAll, v$, schedule_edit, vEdit$ };
    },
    components: {
        Navbar,
        Logo,
        Profile
    },
    async created() {

        await axios.get("/Schedule")
            .then((response) => {
                this.schedulesToday = response.data.scheduleToday;
                this.schedulesAll = response.data.scheduleAll;
                console.log('SchedulesToday:', this.schedulesToday);
                console.log('SchedulesAll:', this.schedulesAll);
            })
            .catch((err) => {
                console.log(err);
            });

    },
    mounted() {
        this.renderFullCalendar();
        this.showSchedule();
    },
    methods: {
        closeAddSchedule() {

            this.schedule.schedule_act = '';
            this.schedule.schedule_date = '';

            // reset สถานะของ vuelidate
            this.v$.$reset();

        },

        createSchedule() {
            this.v$.$touch();

            console.log(this.v$.$invalid)
            if (!this.v$.$invalid) {
                let formData = {
                    schedule_act: this.schedule.schedule_act,
                    schedule_date: this.schedule.schedule_date,
                }

                axios.post("/Schedule", formData)
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((err) => {
                        if (err.response && err.response.data && err.response.data.details && err.response.data.details.message) {
                            alert(err.response.data.details.message);
                        } else {
                            alert("Create schedule failed");
                        }
                    })
                document.location.reload();
            }
        },

        editSchedule(schedule_id) {

            this.showModelEdit = true;
            console.log('Edit Schedule: ' + schedule_id)

            axios.get("/Schedule/Detail/" + schedule_id)
                .then((response) => {
                    this.schedule_edit.schedule_act_edit = response.data.scheduleEdit[0].schedule_act;
                    this.schedule_edit.schedule_date_edit = response.data.scheduleEdit[0].schedule_date;
                    this.schedule_edit.schedule_id_edit = schedule_id;
                })
                .catch((err) => {
                    console.log(err);
                });

        },

        updateSchedule(schedule_id) {
            this.vEdit$.$touch();

            if (!this.vEdit$.$invalid) {
                let formData = {
                    schedule_act: this.schedule_edit.schedule_act_edit,
                    schedule_date: this.schedule_edit.schedule_date_edit,
                }

                axios.put("/Schedule/Update/" + schedule_id, formData)
                    .then((response) => {
                        console.log(response);
                        document.location.reload();
                    }).catch((error) => {
                        console.log(error.message);
                    });
            }

        },

        deleteSchedule(schedule_id, schedule_act) {
            let scheduleId = schedule_id;
            let scheduleAct = schedule_act;
            const result = confirm(`Are you sure you want to delete \'${scheduleAct}\'`);

            if (result) {
                console.log('Delete Schedule')
                axios.delete("/Schedule/Delete/" + scheduleId)
                    .then((response) => {
                        document.location.reload();
                    }).catch((error) => {
                        console.log(error.message);
                    });
            }
        },

        renderFullCalendar() {

            const fullcalendar = document.querySelector(".fullcalendar .days"),
                currentDate_full = document.querySelector(".fullcalendar .current-date"),
                dynamicCalendar = document.querySelector(".dynaminCalendar .days"),
                currentDate_dynamic = document.querySelector(".dynaminCalendar .current-date");

            let firstDayofMonth = new Date(this.currYear, this.currMonth, 1).getDay(),
                lastDateofMonth = new Date(this.currYear, this.currMonth + 1, 0).getDate(),
                lastDayofMonth = new Date(this.currYear, this.currMonth, lastDateofMonth).getDay(),
                lastDateofLastMonth = new Date(this.currYear, this.currMonth, 0).getDate();

            let numday = 0;
            let tdTag = "";
            let liTag = "";

            tdTag += `<tr>`;
            for (let i = (firstDayofMonth - 1); i >= 0; i--) { // create date of last month
                let dateofLastMonth = lastDateofLastMonth - i;
                tdTag += `<td class="inactive" id="${this.currYear + "-" + (this.currMonth < 10 ? "0" : "") + (this.currMonth) + "-" + ((dateofLastMonth) < 10 ? "0" : "") + (dateofLastMonth)}" >${dateofLastMonth}</td>`;
                numday++;
                liTag += `<li class="inactive">${dateofLastMonth}</li>`;
            }

            for (let i = 1; i <= lastDateofMonth; i++) { // create date of current month

                // add class in <td></td>
                let isToday = i == this.date.getDate() && this.currMonth == new Date().getMonth() && this.currYear == new Date().getFullYear() ? "active" : "";

                tdTag += `<td class="${isToday}" id="${this.currYear + "-" + ((this.currMonth + 1) < 10 ? "0" : "") + (this.currMonth + 1) + "-" + ((i) < 10 ? "0" : "") + (i)}" >${i}</td>`;
                numday++;

                if (numday > 6) {
                    tdTag += `</tr>`;
                    numday = 0;
                }

                liTag += `<li class="${isToday}">${i}</li>`;
            }

            for (let i = (lastDayofMonth + 1); i < 7; i++) { // create date of next month
                let dateofNextMonth = i - lastDayofMonth;
                tdTag += `<td class="inactive" id="${this.currYear + "-" + ((this.currMonth + 2) < 10 ? "0" : "") + (this.currMonth + 2) + "-" + ((dateofNextMonth) < 10 ? "0" : "") + (dateofNextMonth)}" >${dateofNextMonth}</td>`
                numday++;
                liTag += `<li class="inactive">${dateofNextMonth}</li>`
            }

            currentDate_full.innerText = `${this.months[this.currMonth]} ${this.currYear}`;
            fullcalendar.innerHTML = tdTag;

            currentDate_dynamic.innerText = `${this.months[this.currMonth]} ${this.currYear}`;
            dynamicCalendar.innerHTML = liTag;

        },

        showSchedule() {

            const firstDayOfMonth = new Date(this.currYear, this.currMonth, 1); // วันที่แรกของเดือน
            const lastDayOfMonth = new Date(this.currYear, this.currMonth + 1, 0); // วันสุดท้ายของเดือน

            // แปลงเป็นรูปแบบ "YYYY-MM-DD"
            const formattedFirstDay = `${firstDayOfMonth.getFullYear()}-${(firstDayOfMonth.getMonth() + 1 < 10 ? '0' : '') + (firstDayOfMonth.getMonth() + 1)}-${(firstDayOfMonth.getDate() < 10 ? '0' : '') + firstDayOfMonth.getDate()}`;
            const formattedLastDay = `${lastDayOfMonth.getFullYear()}-${(lastDayOfMonth.getMonth() + 1 < 10 ? '0' : '') + (lastDayOfMonth.getMonth() + 1)}-${(lastDayOfMonth.getDate() < 10 ? '0' : '') + lastDayOfMonth.getDate()}`;

            this.schedulesAll.forEach((item, index) => {

                if (item.schedule_date >= formattedFirstDay && item.schedule_date <= formattedLastDay) {
                    // console.log('item date ' + index + ' : ' + item.schedule_date);

                    const div = document.createElement("div");
                    const date = item.schedule_date;
                    const title = item.schedule_act;
                    const tdDate = document.getElementById(date);
                    div.innerHTML = title;
                    tdDate.appendChild(div);
                    div.classList.add("boxtext");
                    div.onclick = () => {
                        this.editSchedule(item.schedule_id);
                    };
                }
            })

        },

        goToToday() {
            const today = new Date();
            this.currYear = today.getFullYear();
            this.currMonth = today.getMonth();
            this.renderFullCalendar();
            this.showSchedule();
        },

        goToPreviousMonth() {
            this.currMonth--;
            if (this.currMonth < 0) {
                this.currYear--;
                this.currMonth = 11;
            }
            this.renderFullCalendar();
            this.showSchedule();
        },

        goToNextMonth() {
            this.currMonth += 1;
            if (this.currMonth > 11) {
                this.currMonth = 0;
                this.currYear += 1;
            }
            this.renderFullCalendar();
            this.showSchedule();
        },

    }
}
</script>