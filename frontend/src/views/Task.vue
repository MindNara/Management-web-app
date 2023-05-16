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
                                    <span class="is-size-2-fullhd is-size-3-widescreen">{{ filteredTasksDone.length }}</span>
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
                                    <span class="is-size-2-fullhd is-size-3-widescreen">{{ filteredTasksToDo.length }}</span>
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
                            <span>To-Do List ( {{ filteredTasksToDo.length }} )</span>
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
                                        <th>Create Date</th>
                                        <th>Due Date</th>
                                        <th>Status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(task, index) in filteredTasksToDo" :key="index">
                                        <td>{{ index + 1 }}</td>
                                        <td>
                                            <label class="checkbox">
                                                <input type="checkbox">
                                                {{ task.list_act }}
                                            </label>
                                        </td>
                                        <td>{{ task.list_create_date }}</td>
                                        <td>{{ task.list_date }}</td>
                                        <td>To-Do</td>
                                        <td>
                                            <a class="edit-delete mr-2" style="float: left;">
                                                <span class="icon has-text-dark" @click="show_modal_edit = !show_modal_edit">
                                                    <i class="fas fa-pen"></i>
                                                </span>
                                            </a>
                                            <a class="edit-delete">
                                                <span class="icon"  @click="deleteTask(task.list_id, task.list_act)">
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
                            <span>Done ( {{ filteredTasksDone.length }} )</span>
                        </a>
                    </div>

                    <div class="tabs-content">
                        <li class="task-done is-active">
                            <table class="table pt-5">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Task Name</th>
                                        <th>Create Date</th>
                                        <th>Due Date</th>
                                        <th>Status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(task, index) in filteredTasksDone" :key="index">
                                        <td>{{index + 1}}</td>
                                        <td>
                                            <label class="checkbox">
                                                <input type="checkbox" checked>
                                                {{ task.list_act }}
                                            </label>
                                        </td>
                                        <td>{{task.list_create_date }}</td>
                                        <td>{{task.list_date}}</td>
                                        <td>Done</td>
                                        <td>
                                            <a class="edit-delete mr-2" style="float: left;">
                                                <span class="icon has-text-dark" @click="show_modal_edit = !show_modal_edit">
                                                    <i class="fas fa-pen"></i>
                                                </span>
                                            </a>
                                            <a class="edit-delete">
                                                <span class="icon"  @click="deleteTask(task.list_id, task.list_act)">
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
        <div class="modal" v-bind:class="{ 'is-active': show_modal }">
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
                    <button class="button is-black" @click="submitAddtask()">Create</button>
                    <button class="button btn-cancle" @click="show_modal = !show_modal">Cancel</button>
                </footer>
            </div>
        </div>
        <!-- modal-add-task -->

        <!-- modal-edit-task -->
        <div class="modal" v-bind:class="{ 'is-active': show_modal_edit }">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title has-text-weight-semibold">EDIT TASKS</p>
                    <button class="delete btn-close" aria-label="close" @click="show_modal_edit = !show_modal_edit"></button>
                </header>
                <section class="modal-card-body">
                    <!-- Content ... -->
                    <form id="form-edit">
                        <div class="field">
                            <label class="label">NAME TASKS :</label>
                            <div class="control has-icons-left has-icons-right">
                                <input class="input" type="text" id="name-task-edit" name="name-task-edit" placeholder="Change Task name"
                                    v-model="task_name">
                                <span class="icon is-small is-left">
                                    <i class="fas fa-book"></i>
                                </span>
                            </div>
                        </div>
                        <div class="field">
                            <label for="due-date" class="label">DUE DATE :</label>
                            <div class="control has-icons-left has-icons-right">
                                <input type="date" id="due-date-edit" name="due-date-edit" class="input" v-model="due_date">
                                <span class="icon is-small is-left">
                                    <i class="fas fa-calendar"></i>
                                </span>
                            </div>
                        </div>
                    </form>
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-black">Create</button>
                    <button class="button btn-cancle" @click="show_modal_edit = !show_modal_edit">Cancel</button>
                </footer>
            </div>
        </div>
        <!-- modal-edit-task -->
    </div>
</template>

<script>
import Logo from '../components/Logo.vue'
import Navbar from '../components/Navbar.vue'
import Profile from '../components/Profile.vue'
import axios from '@/plugins/axios'
import { useUserStore } from '@/stores/counter'
import { watchEffect, ref } from 'vue'
// import { reactive, computed } from 'vue'
// import useVuelidate from '@vuelidate/core'
// import { required, email, minLength, maxLength, helpers } from '@vuelidate/validators'

export default {
    data() {
        return {
            list_id: '',
            list_act: '',
            task_name: '',
            due_date: '',
            user_id: '',
            show_modal: false,
            show_modal_edit: false,
            status1: false,
            status2: false,
        }
    },
    setup() {
        const userStore = useUserStore();
        const user = ref(null);
        // const schedulesToday = ref(null);
        const tasks = ref(null);
        // const notes = ref(null);

        // ถ้ามีการเปลี่ยนแปลงค่าจะเข้ามาทำในนี้
        watchEffect(async () => {
            await userStore.getUser();

            // user.value like this.user => vue3
            user.value = userStore.user;

            // ถ้าใช้ข้างใน setup => user.value.fname
            // console.log('user:', user.value.fname);

            axios.get("/Task/" + user.value.user_id)
            .then((response) => {
                console.log(user.value.user_id)
                tasks.value = response.data;
                console.log(tasks.value)
            })
            .catch((err) => {
                console.log(err);
            });
        });

        return { user, tasks };
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
        submitAddtask(){
            const data = {
                list_act: this.task_name,
                list_date: this.due_date,
                user_id: this.user.user_id
            }
            console.log(this.user.user_id)
            axios.post("/Task/add", data)
            .then((response) => {
                this.$router.push({path: "/Task"})
                document.location.reload();
            })
            .catch((error) => {
                this.error = error.response.data.message;
            });
        },
        deleteTask(task_id, task_act){
            this.list_act = task_act
            this.list_id = task_id
            const result = confirm(`Are you sure you want to delete \'${this.list_act}\'`);

            if(result){
                axios.delete("/Task/delete/" + this.list_id)
                .then((response) => {
                    this.$router.push({path: "/Task"})
                    document.location.reload();
    
                })
                .catch((error) => {
                    this.error = error.response.data.message;
                });
            }
        }
    },
    computed: {
        filteredTasksToDo() {
            if (this.tasks !== null || this.task !== undefined){
                return this.tasks.task.filter(task => task.list_status === 0); // check ว่า list_status ไหน === 0
            }
            return [] // ถ้าไม่กำหนดเงื่อนไขมันจะ error ควรเช้คค่าก่อนว่า null หรือ undefined ไหม
            
        },
        filteredTasksDone() {
            if (this.tasks !== null || this.task !== undefined){
                return this.tasks.task.filter(task => task.list_status === 1);
            }
            return []
            
        }
    },
}

</script>