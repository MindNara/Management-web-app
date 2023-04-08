<template>
    <div class="container.is-fullhd" id="app">

        <!----------------------------------------------- header column ----------------------------------------------->
        <div class="columns" style="height: 12vh;">

            <!---------------------------- logo ---------------------------->
            <div class="column is-2">
                <Logo />
            </div>

            <!---------------------------- title ---------------------------->
            <div class="column is-6">
                <div class="pt-5">
                    <span class="is-size-2-fullhd is-size-3-widescreen has-text-weight-medium has-text-black">My
                        Tasks</span>
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

            <!----------------------------------------------- todo-list ----------------------------------------------->
            <div class="content column pr-5" style="overflow-x: hidden; overflow-y: scroll;">
                <!-- card task-done -->
                <div class="columns is-multiline columns is-variable is-2">
                    <div class="column is-half">
                        <div class="card" style="background: #F6F6F8; box-shadow: none;">
                            <div
                                class="card-content is-flex is-justify-content-center is-align-items-center has-text-black">
                                <i class='bx bx-task'></i>
                                <div class="text">
                                    <span class="is-size-2-fullhd is-size-3-widescreen"></span>
                                    <p class="is-size-5-fullhd is-size-6-widescreen">Task Done</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="card" style="background: #F6F6F8; box-shadow: none;">
                            <div
                                class="card-content is-flex is-justify-content-center is-align-items-center has-text-black">
                                <i class='bx bx-task-x'></i>
                                <div class="text">
                                    <span class="is-size-2-fullhd is-size-3-widescreen"></span>
                                    <p class="is-size-5-fullhd is-size-6-widescreen">Task Not Started</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- table to-do list -->
                <div class="tabs-wrapper">
                    <div class="tabs has-background-black is-normal has-text-weight-medium has-text-white is-size-5 mb-0">
                        <a class="has-text-white is-size-5" @click="showTaskToDo()">
                            <span class="icon icon-todo is-medium" @click="status1 = !status1">
                                <i class="fas fa-angle-down"></i>
                            </span>
                            <span>To-Do List ( {{ }} )</span>
                        </a>
                        <a class="has-text-white is-size-5">
                            <span class="icon" style="float: right;" @click="show_modal = !show_modal">
                                <i class="fas fa-solid fa-plus"></i>
                            </span>
                        </a>
                    </div>

                    <div class="tabs-content">
                        <li class="task-to-do is-active">
                            <table class="table pt-5">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Task Name</th>
                                        <th>Due Date</th>
                                        <th>Create Date</th>
                                        <th>Status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                        <tr v-for="task in filteredTasksToDo" :key="task.id">
                                            <td>{{ task.list_id }}</td>
                                            <td>
                                                <label class="checkbox">
                                                    <input type="checkbox">
                                                    {{ task.list_act }}
                                                </label>
                                            </td>
                                            <td>{{ task.list_date }}</td>
                                            <td>{{ task.list_create_date }}</td>
                                            <td>To-Do</td>
                                            <td>
                                                <a class="edit-delete mr-2" style="float: left;">
                                                    <span class="icon has-text-dark">
                                                        <i class="fas fa-pen"></i>
                                                    </span>
                                                </a>
                                                <a class="edit-delete">
                                                    <span class="icon">
                                                        <i class="fas fa-trash" style="color: rgb(105, 16, 16);"></i>
                                                    </span>
                                                </a>
                                            </td>
                                    </tr>
                                </tbody>
                            </table>
                        </li>
                    </div>
                </div>
                <!-- table to-do list -->

                <!-- table done -->
                <div class="tabs-wrapper mt-5">
                    <div class="tabs has-background-black is-normal has-text-weight-medium has-text-white is-size-5 mb-0">
                        <a class="has-text-white is-size-5" @click="showTaskDone()">
                            <span class="icon icon-done is-medium" @click="status2 = !status2">
                                <i class="fas fa-angle-down"></i>
                            </span>
                            <span>Done ( {{}} )</span>
                        </a>
                    </div>

                    <div class="tabs-content">
                        <li class="task-done is-active">
                            <table class="table pt-5">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Task Name</th>
                                        <th>Due Date</th>
                                        <th>Create Date</th>
                                        <th>Status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{{}}</td>
                                        <td>
                                            <label class="checkbox">
                                                <input type="checkbox" checked>

                                            </label>
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td>Done</td>
                                        <td>
                                            <a class="edit-delete mr-2" style="float: left;">
                                                <span class="icon has-text-dark">
                                                    <i class="fas fa-pen"></i>
                                                </span>
                                            </a>
                                            <a class="edit-delete">
                                                <span class="icon">
                                                    <i class="fas fa-trash" style="color: rgb(105, 16, 16);"></i>
                                                </span>
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </li>
                    </div>
                </div>
                <!-- table done -->
            </div>
        </div>

        <!-- modal-add-task -->
        <div class="modal model-task" v-bind:class="{ 'is-active': show_modal }">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title has-text-weight-semibold">ADD TASKS</p>
                    <button class="delete btn-close" aria-label="close" @click="show_modal = !show_modal"></button>
                </header>
                <section class="modal-card-body">
                    <!-- Content ... -->
                    <form id="form">
                        <div class="field">
                            <label class="label">NAME TASKS :</label>
                            <div class="control has-icons-left has-icons-right">
                                <input class="input" type="text" id="name-task" name="name-task" placeholder="Your task"
                                    v-model="task_name">
                                <span class="icon is-small is-left">
                                    <i class="fas fa-book"></i>
                                </span>
                            </div>
                        </div>
                        <div class="field">
                            <label for="due-date" class="label">DUE DATE :</label>
                            <div class="control has-icons-left has-icons-right">
                                <input type="date" id="due-date" name="due-date" class="input" v-model="due_date">
                                <span class="icon is-small is-left">
                                    <i class="fas fa-calendar"></i>
                                </span>
                            </div>
                        </div>
                    </form>
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-black">Create</button>
                    <button class="button btn-cancle" @click="show_modal = !show_modal">Cancel</button>
                </footer>
            </div>
        </div>
        <!-- modal-add-task -->
    </div>
</template>

<script>
import Logo from '../components/Logo.vue'
import Navbar from '../components/Navbar.vue'
import Profile from '../components/Profile.vue'
import axios from "axios";

export default {
    data() {
        return {
            tasks: null,
            task_name: '',
            due_date: '',
            show_modal: false,
            status1: false,
            status2: false,
        }
    },
    created() { // run ตอนหน้า load ใช้ axios ยิง method get ไปที่ backend server ข้อมูลที่ได้จะเป็น json มา
        axios.get("http://localhost:3000/Task")
            .then((response) => {
                this.tasks = response.data;
                console.log(this.tasks.task)
            })
            .catch((err) => {
                console.log(err);
            });
    },
    components: {
        Navbar,
        Logo,
        Profile
    },
    methods: {
        showTaskToDo() {
            const modal_to_do = document.querySelector(".task-to-do");
            modal_to_do.classList.remove("is-active");

            if (this.status1 == false) {
                modal_to_do.classList.add("is-active");
            }
        },
        showTaskDone() {
            const modal_done = document.querySelector(".task-done");
            modal_done.classList.remove("is-active");

            if (this.status2 == false) {
                modal_done.classList.add("is-active");
            }
        },
    },
    computed: {
        filteredTasksToDo() {
            return this.tasks.task.filter(task => task.list_status === 0);
        }
    },
}

</script>