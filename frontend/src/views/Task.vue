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
                                    <span class="is-size-2-fullhd is-size-3-widescreen">{{ tasksDone.length
                                    }}</span>
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
                                    <span class="is-size-2-fullhd is-size-3-widescreen">{{ tasksTodo.length
                                    }}</span>
                                    <p class="is-size-5-fullhd is-size-6-widescreen">Task Not Started</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- table to-do list -->
                <div class="tabs-wrapper">
                    <div class="tabs has-background-black is-normal has-text-weight-medium has-text-white is-size-5 mb-0">
                        <a class="has-text-white is-size-5">
                            <span class="icon icon-todo is-medium" @click="status1 = !status1; showTaskToDo()">
                                <i class="fas fa-angle-down"></i>
                            </span>
                            <span>To-Do List ( {{ tasksTodo.length }} )</span>
                        </a>
                        <a class="has-text-white is-size-5">
                            <span class="icon icon-add" style="float: right;" @click="show_modal = !show_modal">
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
                                    <tr v-for="(task, index) in tasksTodo" :key="index">
                                        <td>{{ index + 1 }}</td>
                                        <td class="td-checkbox">
                                            <label class="checkbox">
                                                <input type="checkbox" @click="addCheck(task.list_id, task.list_status)">
                                                {{ task.list_act }}
                                            </label>
                                        </td>
                                        <td>{{ task.list_create_date }}</td>
                                        <td>{{ task.list_date }}</td>
                                        <td>To-Do</td>
                                        <td>
                                            <a class="edit-delete mr-2" style="float: left;">
                                                <span class="icon has-text-dark" @click="openmodal(task.list_id)">
                                                    <i class="fas fa-pen"></i>
                                                </span>
                                            </a>
                                            <a class="edit-delete">
                                                <span class="icon" @click="deleteTask(task.list_id, task.list_act)">
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
                        <a class="has-text-white is-size-5">
                            <span class="icon icon-done is-medium" @click="status2 = !status2; showTaskDone()">
                                <i class="fas fa-angle-down"></i>
                            </span>
                            <span>Done ( {{ tasksDone.length }} )</span>
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
                                    <tr v-for="(task, index) in tasksDone" :key="index">
                                        <td>{{ index + 1 }}</td>
                                        <td class="td-checkbox">
                                            <label class="checkbox">
                                                <input type="checkbox"
                                                    @click="addCheck(task.list_id, task.list_status)" checked>
                                                {{ task.list_act }}
                                            </label>
                                        </td>
                                        <td>{{ task.list_create_date }}</td>
                                        <td>{{ task.list_date }}</td>
                                        <td>Done</td>
                                        <td>
                                            <a class="edit-delete">
                                                <span class="icon" @click="deleteTask(task.list_id, task.list_act)">
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
                    <button class="delete btn-close" aria-label="close"
                        @click="show_modal = !show_modal; closeAddTask()"></button>
                </header>
                <section class="modal-card-body">
                    <!-- Content ... -->
                    <form id="form">
                        <div class="field">
                            <label class="label">NAME TASKS :</label>
                            <div class="control has-icons-left has-icons-right">
                                <input class="input" type="text" id="name-task" name="name-task" placeholder="Your task"
                                    v-model="task_todo.task_name" @input="v$_add.task_name.$touch()"
                                    :class="{ 'is-danger': v$_add.task_name.$error }">
                                <span class="icon is-small is-left">
                                    <i class="fas fa-book"></i>
                                </span>
                            </div>
                            <span v-if="v$_add.task_name.$error">
                                <p class="help is-danger" v-if="v$_add.task_name.required">This field is required</p>
                            </span>
                        </div>
                        <div class="field">
                            <label for="due-date" class="label">DUE DATE :</label>
                            <div class="control has-icons-left has-icons-right">
                                <input type="date" id="due-date" name="due-date" class="input" v-model="task_todo.due_date"
                                    @input="v$_add.due_date.$touch()" :class="{ 'is-danger': v$_add.due_date.$error }">
                                <span class="icon is-small is-left">
                                    <i class="fas fa-calendar"></i>
                                </span>
                            </div>
                            <span v-if="v$_add.due_date.$error">
                                <p class="help is-danger">{{ v$_add.due_date.$errors[0].$message }}</p>
                            </span>
                        </div>
                    </form>
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-black" @click="submitAddtask()">Create</button>
                    <button class="button btn-cancle" @click="show_modal = !show_modal; closeAddTask()">Cancel</button>
                </footer>
            </div>
        </div>
        <!-- modal-add-task -->

        <!-- modal-edit-task -->
        <div class="modal" v-bind:class="{ 'is-active': show_modal_edit }">
            <div class="modal-background"></div>
            <div class="modal-card" v-for="(content, index) in content_task" :key="index">
                <header class="modal-card-head">
                    <p class="modal-card-title has-text-weight-semibold">EDIT TASKS</p>
                    <button class="delete btn-close" aria-label="close"
                        @click="show_modal_edit = !show_modal_edit"></button>
                </header>
                <section class="modal-card-body">
                    <!-- Content ... -->
                    <form id="form-edit">
                        <div class="field">
                            <label class="label">NAME TASKS : </label>
                            <div class="control has-icons-left has-icons-right">
                                <input class="input" type="text" id="name-task-edit" name="name-task-edit"
                                    placeholder="Change Task name" v-model="task_todo_edit.task_name_edit"
                                    @input="v$_edit.task_name_edit.$touch()">
                                <span class="icon is-small is-left">
                                    <i class="fas fa-book"></i>
                                </span>
                            </div>
                            <span v-if="v$_edit.task_name_edit.$error">
                                <p class="help is-danger" v-if="v$_edit.task_name_edit.required">This field is required</p>
                            </span>
                        </div>
                        <div class="field">
                            <label for="due-date" class="label">DUE DATE :</label>
                            <div class="control has-icons-left has-icons-right">
                                <input type="date" id="due-date-edit" name="due-date-edit" class="input"
                                    v-model="task_todo_edit.due_date_edit" @input="v$_edit.due_date_edit.$touch()">
                                <span class="icon is-small is-left">
                                    <i class="fas fa-calendar"></i>
                                </span>
                            </div>
                            <span v-if="v$_edit.due_date_edit.$error">
                                <p class="help is-danger">{{ v$_edit.due_date_edit.$errors[0].$message }}</p>
                            </span>
                        </div>
                    </form>
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-black" @click="editTask(content.list_id)">SAVE</button>
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
import { reactive } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

function checkDate(value) {
    const currentDate = new Date().toISOString().split('T')[0];
    const inputDate = new Date(value).toISOString().split('T')[0];
    return inputDate >= currentDate;
}

export default {
    data() {
        return {
            list_id: '',
            list_act: '',
            user_id: '',
            show_modal: false,
            show_modal_edit: false,
            status1: false,
            status2: false,
            content_task: '',
            tasksTodo: '',
            tasksDone: ''
        }
    },
    setup() {

        const task_todo = reactive({
            task_name: '',
            due_date: '',
        }) // พอมันอยู่ในนี้แล้วตัวแปรข้างในเป็น object task_todo เวลาจะใช้ตัวแปรข้างในก้ต้อง task_todo.task_name ยังงี้

        const task_todo_edit = reactive({
            task_name_edit: '',
            due_date_edit: '',
        })

        const rules_add = { // กำหนด validations ที่จะเช้ค
            task_name: {
                required: required,
            },
            due_date: {
                required: required,
                minValue: helpers.withMessage('Due Date should be greater than current date', checkDate)
            },
        }

        const rules_edit = { // กำหนด validations ที่จะเช้ค สร้างแยกกันระหว่าง add และ edit
            task_name_edit: {
                required: required,
            },
            due_date_edit: {
                required: required,
                minValue: helpers.withMessage('Due Date should be greater than current date', checkDate)
            },
        }

        const v$_add = useVuelidate(rules_add, task_todo);
        const v$_edit = useVuelidate(rules_edit, task_todo_edit); // ส่งค่าไปเช้คใน useVuelidate ของ vue ที่ import มา

        return { v$_add, v$_edit, task_todo, task_todo_edit }; // จะเอาค่าไปใช้ต่อก้ต้อง return ออกไป
    },
    components: {
        Navbar,
        Logo,
        Profile
    },
    created() {
        axios.get("/Task")
            .then((response) => {
                this.tasksTodo = response.data.taskTodo;
                this.tasksDone = response.data.taskDone;
                console.log('TaskTodo:', this.tasksTodo);
                console.log("taskDone", this.tasksDone);
                // this.task_todo.task_name_edit = this.tasks.task[0].list_act
                // this.task_todo.due_date_edit = this.tasks.task[0].list_date
                // console.log('Tasks:', this.tasks.task[0].list_act);
                // console.log('Tasks:', this.tasks.task[0].list_date);
            })
            .catch((err) => {
                console.log(err);
            });

    },
    methods: {
        showTaskToDo() {
            const modal_to_do = document.querySelector(".task-to-do");
            modal_to_do.classList.remove("is-active");

            const icon_todo = document.querySelector(".icon-todo");
            icon_todo.classList.add("is-active");

            if (this.status1 == false) {
                modal_to_do.classList.add("is-active");
                icon_todo.classList.remove("is-active");
            }
        },
        showTaskDone() {
            const modal_done = document.querySelector(".task-done");
            modal_done.classList.remove("is-active");

            const icon_done = document.querySelector(".icon-done");
            icon_done.classList.add("is-active");

            if (this.status2 == false) {
                modal_done.classList.add("is-active");
                icon_done.classList.remove("is-active");
            }
        },
        openmodal(task_id) { // เปิด modal-edit get data มา
            this.content_task = [];
            axios.get("/Task/detail/" + task_id)
                .then((response) => {
                    this.content_task = response.data.content_task; //จะเข้าไปใน content_task เลย
                    this.task_todo_edit.task_name_edit = this.content_task[0].list_act
                    this.task_todo_edit.due_date_edit = this.content_task[0].list_date
                    console.log(this.content_task) // พอจะใช้ก้ this.content_task[0].list_act ได้เลย
                    console.log(task_id)
                })
                .catch((err) => {
                    console.log(err);
                });
            this.show_modal_edit = !this.show_modal_edit;
        },
        closeAddTask() {
            this.task_todo.task_name = '';
            this.task_todo.due_date = '';

            // reset สถานะของ vuelidate
            this.v$_add.$reset();
        },
        editTask(task_id) {
            this.v$_edit.$touch(); // ไปเอามาเช้คอีกทีใน usevalidate
            console.log(task_id)
            if (!this.v$_edit.$invalid) { // เช้คก่อนส่งไป backend เพราะไม่อยากให้ error
                const data = {
                    list_act: this.task_todo_edit.task_name_edit,
                    list_date: this.task_todo_edit.due_date_edit,
                }
                console.log(data)
                axios.put("/Task/edit/" + task_id, data)
                    .then((response) => {
                        this.$router.push({ path: "/Task" })
                        document.location.reload();
                    })
                    .catch((error) => {
                        this.error = error.response.data.message;
                    });
            }
        },
        submitAddtask() {
            this.v$_add.$touch();

            console.log(this.v$_add.$invalid)
            if (!this.v$_add.$invalid) { // เช้คก่อนส่งไป backend อีกรอบว่าใน rule ที่ตั้งไว้ผ่านไหม
                console.log('Add Tasks')
                const data = {
                    list_act: this.task_todo.task_name,
                    list_date: this.task_todo.due_date,
                }
                // console.log(this.user_id)
                axios.post("/Task/add", data)
                    .then((response) => {
                        this.$router.push({ path: "/Task" })
                        document.location.reload();
                    })
                    .catch((error) => {
                        this.error = error.response.data.message;
                    });
            }
        },
        deleteTask(task_id, task_act) {
            this.list_act = task_act
            this.list_id = task_id
            const result = confirm(`Are you sure you want to delete \'${this.list_act}\'`);

            if (result) {
                axios.delete("/Task/delete/" + this.list_id)
                    .then((response) => {
                        this.$router.push({ path: "/Task" })
                        document.location.reload();

                    })
                    .catch((error) => {
                        this.error = error.response.data.message;
                    });
            }
        },
        addCheck(task_id, task_status) {
            console.log(task_id, task_status)
            const data = {
                list_id: task_id,
                list_status: task_status,
            }
            axios.put("/Task/addCheck", data)
                .then((response) => {
                    this.$router.push({ path: "/Task" })
                    document.location.reload();
                })
                .catch((error) => {
                    this.error = error.response.data.message;
                });
        }
    },
}

</script>