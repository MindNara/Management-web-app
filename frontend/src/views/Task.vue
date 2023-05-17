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
                                    <span class="is-size-2-fullhd is-size-3-widescreen">{{ filteredTasksDone.length
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
                                    <span class="is-size-2-fullhd is-size-3-widescreen">{{ filteredTasksToDo.length
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
                                        <td>{{ index + 1 }}</td>
                                        <td>
                                            <label class="checkbox">
                                                <input type="checkbox" checked>
                                                {{ task.list_act }}
                                            </label>
                                        </td>
                                        <td>{{ task.list_create_date }}</td>
                                        <td>{{ task.list_date }}</td>
                                        <td>Done</td>
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
                                    v-model="task_todo.task_name" @input="v$_add.task_name.$touch()">
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
                                    @input="v$_add.due_date.$touch()">
                                <span class="icon is-small is-left">
                                    <i class="fas fa-calendar"></i>
                                </span>
                            </div>
                            <span v-if="v$_add.due_date.$error">
                                <p class="help is-danger" v-if="v$_add.due_date.required">This field is required</p>
                            </span>
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
                                    placeholder="Change Task name" v-model="task_todo.task_name_edit"
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
                                    v-model="task_todo.due_date_edit" @input="v$_edit.due_date_edit.$touch()">
                                <span class="icon is-small is-left">
                                    <i class="fas fa-calendar"></i>
                                </span>
                            </div>
                            <span v-if="v$_edit.due_date_edit.$error">
                                <p class="help is-danger" v-if="v$_edit.due_date_edit.required">This field is required</p>
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
import { reactive, ref, onMounted } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useUserStore } from '@/stores/counter'
// import { reactive, computed } from 'vue'
// import useVuelidate from '@vuelidate/core'
// import { required, email, minLength, maxLength, helpers } from '@vuelidate/validators'

export default {
    data() {
        return {
            list_id: '',
            list_act: '',
            // task_name: '',
            // due_date: '',
            user_id: '',
            show_modal: false,
            show_modal_edit: false,
            status1: false,
            status2: false,
            content_task: '',
            // task_name_edit: '',
            // due_date_edit: '',
        }
    },
    setup() {

        const user_id = ref(''); // สร้างมาเก็บตัวแปร user_id ที่ได้มาจากตอน userStore
        const tasks = ref(null);

        const task_todo = reactive({
            task_name: '',
            due_date: '',
            task_name_edit: '',
            due_date_edit: '',
        }) // พอมันอยู่ในนี้แล้วตัวแปรข้างในเป็น object task_todo เวลาจะใช้ตัวแปรข้างในก้ต้อง task_todo.task_name ยังงี้

        const rules_add = { // กำหนด validations ที่จะเช้ค
            task_name: {
                required: required,
            },
            due_date: {
                required: required,
            },
        }

        const rules_edit = { // กำหนด validations ที่จะเช้ค
            task_name_edit: {
                required: required,
            },
            due_date_edit: {
                required: required,
            },
        }

        const v$_add = useVuelidate(rules_add, task_todo);
        const v$_edit = useVuelidate(rules_edit, task_todo); // ส่งค่าไปเช้คใน useVuelidate ของ vue ที่ import มา

        // const getTask = async () => {
        //     await userStore.getUser();
        //     user_id.value = userStore.user.user_id; // เอาค่ามาใส่ใน user_id ที่ได้จาก userStore ใน conunter.js
        //     // console.log('user_id: ' + user_id.value)

        //     axios.get("/Task/" + user_id.value) // get ค่า task ที่ดึงมาจาก user_id ที่ได้มาอยู่ใน tasks ที่สร้างไว้ 
        //     .then((response) => {
        //         console.log(user_id.value)
        //         tasks.value = response.data;
        //         console.log(tasks.value)
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
        // };
        // onMounted(getTask); // มันจะทำทุกครั้งที่เข้าหน้า task มาอะไปทำฟังก์ชั่น getTask

        return { user_id, tasks, v$_add, v$_edit, task_todo }; // จะเอาค่าไปใช้ต่อก้ต้อง return ออกไป
    },
    components: {
        Navbar,
        Logo,
        Profile
    },
    async created() {

        const userStore = useUserStore();

        await userStore.getUser();
        this.user_id = userStore.user.user_id;
        console.log('User ID:', this.user_id);

        await axios.get("/Task/" + this.user_id)
            .then((response) => {
                this.tasks = response.data;
                console.log('Tasks:', this.tasks.task);
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
        openmodal(task_id) { // เปิด modal-edit get data มา
            this.content_task = [];
            axios.get("/Task/detail/" + task_id)
                .then((response) => {
                    this.content_task = response.data.content_task; //จะเข้าไปใน content_task เลย
                    this.task_todo.task_name_edit = this.content_task[0].list_act
                    this.task_todo.due_date_edit = this.content_task[0].list_date
                    console.log(this.content_task) // พอจะใช้ก้ this.content_task[0].list_act ได้เลย
                    console.log(task_id)
                })
                .catch((err) => {
                    console.log(err);
                });
            this.show_modal_edit = !this.show_modal_edit;
        },
        editTask(task_id) {
            console.log(task_id)
            const data = {
                list_act: this.task_todo.task_name_edit,
                list_date: this.task_todo.due_date_edit,
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
        },
        submitAddtask() {
            this.v$_add.$touch();

            console.log(this.v$_add.$invalid)
            if (!this.v$_add.$invalid) {
                console.log('Add Tasks')
                const data = {
                    list_act: this.task_todo.task_name,
                    list_date: this.task_todo.due_date,
                    user_id: this.user_id
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
        }
    },
    computed: {
        filteredTasksToDo() {
            if (this.tasks !== null || this.task !== undefined) {
                return this.tasks.task.filter(task => task.list_status === 0); // check ว่า list_status ไหน === 0
            }
            return [] // ถ้าไม่กำหนดเงื่อนไขมันจะ error ควรเช้คค่าก่อนว่า null หรือ undefined ไหม

        },
        filteredTasksDone() {
            if (this.tasks !== null || this.task !== undefined) {
                return this.tasks.task.filter(task => task.list_status === 1);
            }
            return []

        }
    },
}

</script>