<template>
    <div style="height: 100vh; width: 100%;">

        <div class="container.is-fullhd">

            <!----------------------------------------------- header column ----------------------------------------------->
            <div class="columns" style="height: 12vh;">

                <!---------------------------- logo ---------------------------->
                <div class="column is-2">
                    <Logo />
                </div>

                <!---------------------------- title ---------------------------->
                <div class="column is-6">
                    <div class="pt-5">
                        <span
                            class="is-size-2-fullhd is-size-3-widescreen has-text-weight-medium has-text-black">Dashboard</span>
                    </div>
                </div>

                <!---------------------------- profile member ---------------------------->
                <div class="profile level column">
                    <div class="level-right pt-4" style="width: 100%;">
                        <Profile />
                    </div>
                </div>
            </div>

            <div class="container-content columns" style="height: 88vh;">

                <!----------------------------------------------- navbar column ----------------------------------------------->
                <div class="column is-2">

                    <!---------------------------- navbar ---------------------------->
                    <Navbar />

                </div>

                <!----------------------------------------------- taday-tasks & notes column ----------------------------------------------->
                <div class="column is-6">

                    <!---------------------------- status tasks row ---------------------------->
                    <div class="content-ts columns" style="height: 16vh;">
                        <div class="task-status column">
                            <div class="columns" style="height: 18vh">

                                <!----------------- task done ----------------->
                                <div class="column">
                                    <div class="card">
                                        <div class="card-content is-flex is-justify-content-center is-align-items-center">
                                            <i class='bx bx-task'></i>
                                            <div class="text">
                                                <span class="is-size-2-fullhd is-size-3-widescreen">{{ tasksDone.length
                                                }}</span>
                                                <p class="is-size-5-fullhd is-size-6-widescreen">Task Done</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!----------------- task not start ----------------->
                                <div class="column">
                                    <div class="card">
                                        <div class="card-content is-flex is-justify-content-center is-align-items-center">
                                            <i class='bx bx-task-x'></i>
                                            <div class="text">
                                                <span class="is-size-2-fullhd is-size-3-widescreen">{{
                                                    tasksTodo.length
                                                }}</span>
                                                <p class="is-size-5-fullhd is-size-6-widescreen">Task Not Started</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!----------------- notes ----------------->
                                <div class="column">
                                    <div class="card">
                                        <div class="card-content is-flex is-justify-content-center is-align-items-center">
                                            <i class='bx bx-note'></i>
                                            <div class="text">
                                                <span class="is-size-2-fullhd is-size-3-widescreen">{{ notes.length ?
                                                    notes.length : '0' }}</span>
                                                <p class="is-size-5-fullhd is-size-6-widescreen">Notes</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <!---------------------------- today tasks row ---------------------------->
                    <div class="content-tt columns" style="height: 35vh;">
                        <div class="today-tasks column">

                            <!----------------- title ----------------->
                            <div class="level columns" style="height: 5vh;">
                                <div class="level-left">
                                    <div class="column">
                                        <span
                                            class="has-text-black is-size-4-fullhd has-text-weight-medium is-size-5-widescreen">
                                            Today Tasks
                                        </span>
                                    </div>
                                </div>

                                <div class="level-right">
                                    <div class="column">
                                        <a href="/Task" class="button is-size-7 has-text-weight-medium">View
                                            All</a>
                                    </div>
                                </div>
                            </div>

                            <!----------------- today tasks card ----------------->
                            <div class="columns" style="height: 30vh;">
                                <div class="clumns" style="width: 100%;" v-if="filteredTasksToday.length === 0">
                                    <div class="tasksToday">
                                        <span>Today is task-free</span>
                                    </div>
                                </div>
                                <div v-else style="width: 100%;">
                                    <div class="clumns" v-for="task in filteredTasksToday" :key="task.task_id">
                                        <div class="column">
                                            <div class="level task-box p-3">
                                                <div class="level-left">
                                                    <div class="level-item">
                                                        <i class='bx bx-check-circle mx-4 is-size-3 has-text-black'></i>
                                                        <span class="is-size-5 has-text-weight-medium">
                                                            {{ task.list_act }}</span>
                                                    </div>
                                                </div>
                                                <div class="level-right">
                                                    <div class="level-item">
                                                        <span class="date mr-6">{{ task.list_date }}</span>
                                                        <span
                                                            class="btn-status has-background-black has-text-white has-text-weight-light mx-4">
                                                            In Progress</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!---------------------------- notes row ---------------------------->
                    <div class="content-note columns" style="height: 36vh;">
                        <div class="notes column">

                            <!----------------- title ----------------->
                            <div class="level columns" style="height: 5vh;">
                                <div class="level-left">
                                    <div class="column">
                                        <span
                                            class="has-text-black is-size-4-fullhd has-text-weight-medium is-size-5-widescreen">
                                            Today Notes
                                        </span>
                                    </div>
                                </div>

                                <div class="level-right">
                                    <div class="column">
                                        <a href="/NoteDiary" class="button is-size-7 has-text-weight-medium">View
                                            All</a>
                                    </div>
                                </div>
                            </div>

                            <!----------------- notes card ----------------->
                            <div class="columns is-multiline" style="height: 33vh;" v-if="filteredNotesToday.length === 0">
                                <div class="notesToday mt-3">
                                    <span>Today is notes-free</span>
                                </div>
                            </div>
                            <div class="columns is-multiline" style="height: 33vh;" v-else>
                                <div class="column is-one-third" v-for="note in filteredNotesToday" :key="note.noted_id">
                                    <div class="card">
                                        <div class="card-image" @click="openModalDetail(note.noted_id)">
                                            <figure class="image is-2by1">
                                                <img :src="'http://localhost:3000/' + note.noted_image"
                                                    alt="Placeholder image">
                                            </figure>
                                        </div>
                                        <div class="card-content" @click="openModalDetail(note.noted_id)">
                                            <div class="media">
                                                <div class="media-content" style="width: 100%;">
                                                    <p class="title title-note is-4">{{ note.noted_title }}</p>
                                                    <p class="subtitle is-6">{{ shortContent(note.noted_content) }}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!----------------------------------------------- calendar column ----------------------------------------------->
                <div class="column">

                    <!---------------------------- calendar row ---------------------------->
                    <div class="content-ts columns mr-5" style="height: 51vh;">
                        <div class="calendar-box ml-3 mt-3" style="width: 100%; height: auto;">
                            <div class="dynaminCalendar calendar">
                                <header class="level m-0">
                                    <div class="level-left">
                                        <p class="current-date has-text-black ml-5"></p>
                                    </div>
                                    <div class="level-right mr-2">
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

                    <!---------------------------- today schedule row ---------------------------->
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

                                <div class="level-right">
                                    <div class="column">
                                        <a href="/Schedule" class="button is-size-7 has-text-weight-medium mr-5">View
                                            All</a>
                                    </div>
                                </div>
                            </div>

                            <div class="columns" style="height: 33vh;">
                                <div class="column mr-5">
                                    <div class="schedulesToday" v-if="filteredSchedulesToday.length === 0">
                                        <span>Today is schedule-free</span>
                                    </div>
                                    <div v-else>
                                        <div v-for="schedule in filteredSchedulesToday" :key="schedule.id">
                                            <a href="/Schedule" class="level schedule-box-dashboard px-5 mb-4">
                                                <div class="level-left">
                                                    <span id="schedule2">{{ schedule.schedule_act
                                                    }}</span>
                                                </div>
                                                <div class="level-right">
                                                    <span class="scheduleDate">{{ schedule.schedule_date }}</span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <!-- modal-open-card -->
            <div class="modal" v-bind:class="{ 'is-active': show_modal_card }" v-for="(content, index) in content_note"
                :key="index">
                <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">MY DIARY</p>
                        <button class="delete" aria-label="close" @click="show_modal_card = !show_modal_card"></button>
                    </header>
                    <section class="modal-card-body">
                        <!-- Content ... -->
                        <figure class="image is-5by3">
                            <img :src="'http://localhost:3000/' + content.noted_image" alt="Placeholder image">
                        </figure>
                        <p class="title">{{ content.noted_title }}</p>
                        <p class="content">{{ content.noted_content }}</p>
                        <p class="content">{{ content.noted_date }} #mydiary</p>
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button is-black" @click="show_modal_card = !show_modal_card">OK</button>
                    </footer>
                </div>
            </div>
            <!-- modal-open-card -->

        </div>
    </div>
</template>

<script>
import Logo from '../components/Logo.vue'
import Navbar from '../components/Navbar.vue'
import Profile from '../components/Profile.vue'
import axios from '@/plugins/axios'

export default {
    data() {
        const date = new Date();
        return {
            date: date,
            currYear: date.getFullYear(),
            currMonth: date.getMonth(),
            months: [
                "January", "February", "March", "April", "May", "June", "July",
                "August", "September", "October", "November", "December"
            ],
            content_note: [],
            show_modal_card: false,
            schedulesToday: '',
            tasksTodo: '',
            tasksDone: '',
            notes: '',
        }
    },
    components: {
        Navbar,
        Logo,
        Profile,
    },
    created() {

        axios.get(`/Dashboard`)
            .then((response) => {
                this.schedulesToday = response.data.scheduleToday;
                this.tasksTodo = response.data.taskTodo;
                this.tasksDone = response.data.taskDone;
                this.notes = response.data.note;
                console.log('SchedulesToday:', this.schedulesToday);
                console.log('TaskTodo:', this.tasksTodo);
                console.log("taskDone", this.tasksDone);
                // console.log("taskToday", this.tasksToday);
                console.log('Notes:', this.notes);
                console.log('TaskToday: ', this.filteredTasksToday.length)
                console.log('ScheduleToday: ', this.filteredSchedulesToday.length)
                console.log('NoteToday: ', this.filteredNotesToday.length)
            })
            .catch((err) => {
                console.log(err);
            });
    },
    mounted() {
        const today = new Date();
        this.currentYear = today.getFullYear();
        this.currentMonth = today.getMonth();
        this.renderCalendar();
    },
    methods: {
        renderCalendar() {

            const dynamicCalendar = document.querySelector(".dynaminCalendar .days"),
                currentDate_dynamic = document.querySelector(".dynaminCalendar .current-date");

            let firstDayofMonth = new Date(this.currYear, this.currMonth, 1).getDay(),
                lastDateofMonth = new Date(this.currYear, this.currMonth + 1, 0).getDate(),
                lastDayofMonth = new Date(this.currYear, this.currMonth, lastDateofMonth).getDay(),
                lastDateofLastMonth = new Date(this.currYear, this.currMonth, 0).getDate();

            let liTag = "";

            for (let i = (firstDayofMonth - 1); i >= 0; i--) { // create date of last month
                let dateofLastMonth = lastDateofLastMonth - i;
                liTag += `<li class="inactive">${dateofLastMonth}</li>`;
            }

            for (let i = 1; i <= lastDateofMonth; i++) { // create date of current month

                // add class in <td></td>
                let isToday = i == this.date.getDate() && this.currMonth == new Date().getMonth() && this.currYear == new Date().getFullYear() ? "active" : "";
                liTag += `<li class="${isToday}">${i}</li>`;
            }

            for (let i = (lastDayofMonth + 1); i < 7; i++) { // create date of next month
                let dateofNextMonth = i - lastDayofMonth;
                liTag += `<li class="inactive">${dateofNextMonth}</li>`
            }

            currentDate_dynamic.innerText = `${this.months[this.currMonth]} ${this.currYear}`;
            dynamicCalendar.innerHTML = liTag;

        },

        goToToday() {
            const today = new Date();
            this.currYear = today.getFullYear();
            this.currMonth = today.getMonth();
            this.renderCalendar();
        },

        goToPreviousMonth() {
            this.currMonth--;
            if (this.currMonth < 0) {
                this.currYear--;
                this.currMonth = 11;
            }
            this.renderCalendar();
        },

        goToNextMonth() {
            this.currMonth += 1;
            if (this.currMonth > 11) {
                this.currMonth = 0;
                this.currYear += 1;
            }
            this.renderCalendar();
        },
        shortContent(content) {
            if (content.length > 10) {
                return content.substring(0, 10) + "...";
            }
            return content;
        },
        openModalDetail(note_id) {
            // console.log(note_id)
            // console.log(this.notes[0].noted_id)
            for (let i = 0; i < this.notes.length; i++) {
                if (this.notes[i].noted_id === note_id) {
                    this.content_note.push(this.notes[i])
                }
            }
            this.show_modal_card = !this.show_modal_card;
        },
    },
    computed: {
        filteredTasksToday() {
            let ts = Date.now();
            let date_ob = new Date(ts);
            let date = date_ob.getDate();
            let month = date_ob.getMonth() + 1;
            let year = date_ob.getFullYear();
            let todayDate = year + "-" + (month < 10 ? '0' : '') + month + "-" + (date < 10 ? '0' : '') + date;
            return this.tasksTodo.filter(task => task.list_status === 0 && task.list_date === todayDate);
        },
        filteredNotesToday() {
            let ts = Date.now();
            let date_ob = new Date(ts);
            let date = date_ob.getDate();
            let month = date_ob.getMonth() + 1;
            let year = date_ob.getFullYear();
            let todayDate = year + "-" + (month < 10 ? '0' : '') + month + "-" + (date < 10 ? '0' : '') + date;
            return this.notes.filter(note => note.noted_date === todayDate);
        },
        filteredSchedulesToday() {
            return this.schedulesToday.slice(0, 3);
        },
    },
}
</script>