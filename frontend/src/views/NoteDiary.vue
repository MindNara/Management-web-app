<template>
  <div class="container.is-fullhd" id="app">

      <div class="columns" style="height: 12vh;">
        <div class="column is-2">
          <Logo />
        </div>

        <div class="column is-6">
          <div class="pt-5">
            <span class="is-size-2-fullhd is-size-3-widescreen has-text-weight-medium has-text-black">My Notes</span>
          </div>
        </div>

        <div class="profile level column">
          <div class="level-right pt-4" style="width: 100%;">
            <Profile />
          </div>
        </div>
      </div>

      <div class="container-content columns" style="height: 88vh;">

        <div class="column is-2">
          <Navbar />
        </div>
        <div class="content column pr-5" style="overflow-x: hidden; overflow-y: scroll;">
          <div>
            <button class="button is-black is is-normal has-text-weight-normal">
              <span class="icon">
                <i class="fas fa-solid fa-plus"></i>
              </span>
              <span>Create Note</span>
            </button>
          </div>

          <div class="columns mt-4 is-multiline columns is-variable is-2">
            <div class="column is-one-third" v-for="note in note" :key="note.noted_id">
              <div class="card">
                <div>
                  <div class="card-image" @click="openModalDetail(note.noted_id)">
                    <figure class="image is-2by1">
                      <img :src="'http://localhost:3000/'+note.noted_image" alt="note_img">
                    </figure>
                  </div>
                  <div class="card-content" @click="openModalDetail(note.noted_id)">
                    <div class="media">
                      <div class="media-content" style="width: 100%;">
                        <p class="title title-note is-4">{{note.noted_title}}</p>
                        <!-- <p class="subtitle is-6">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p> -->
                        <p class="subtitle is-6" style="float: left;">{{ shortContent(note.noted_content) }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <footer class="card-footer">
                  <a href="#" class="edit-delete card-footer-item">
                    <span class="icon has-text-black">
                      <i class="fas fa-pen mr-3"></i>
                      <p>Edit</p>
                    </span>
                  </a>
                  <a href="#" class="edit-delete card-footer-item">
                    <span class="icon has-text-black">
                      <i class="fas fa-trash mr-3" style="color: rgb(105, 16, 16);"></i>
                      <p style="color: rgb(105, 16, 16);">Delete</p>
                    </span>
                  </a>
                </footer>
              </div>
            </div>
          </div>
          <!-- modal-add-note -->
          <div class="modal">
            <div class="modal-background"></div>
            <div class="modal-card">
              <header class="modal-card-head">
                <p class="modal-card-title has-text-weight-semibold m-0">ADD NOTE-DIARY</p>
                <button class="delete" aria-label="close"></button>
              </header>
              <section class="modal-card-body">
                <!-- Content ... -->
                <form id="form">
                  <div class="field">
                    <label class="label">TOPIC :</label>
                    <div class="control has-icons-left has-icons-right">
                      <input class="input" type="text" id="name-note" name="name-note" v-model="name_note">
                      <span class="icon is-small is-left">
                        <i class="fas fa-book"></i>
                      </span>
                    </div>
                  </div>
                  <div class="field">
                    <label for="image-note" class="label">IMAGE :</label>
                    <input type="file" id="image-note" name="image-note">
                  </div>
                  <div class="field">
                    <label for="date-note" class="label">DATE :</label>
                    <div class="control has-icons-left has-icons-right">
                      <input type="date" id="date-note" name="date-note" class="input" v-model="date_note">
                      <span class="icon is-small is-left">
                        <i class="fas fa-calendar"></i>
                      </span>
                    </div>
                  </div>
                  <div class="field">
                    <label for="date-note" class="label">STORY :</label>
                    <textarea class="p-5 is-size-5" style="width: 100%;" placeholder="Remember, be nice!" cols="90" rows="10" v-model="data_note"></textarea>
                  </div>
                </form>
              </section>
              <footer class="modal-card-foot">
                <button class="button is-black" @click="addNote()">Create</button>
                <button class="button" @click="show_modal = !show_modal">Cancel</button>
              </footer>
            </div>
          </div>
          <!-- modal-add-note -->

          <!-- modal-open-card -->
          <div class="modal" v-bind:class="{'is-active':show_modal_card}" v-for="(content, index) in content_note" :key="index">
            <div class="modal-background"></div>
            <div class="modal-card">
              <header class="modal-card-head">
                <p class="modal-card-title">MY DIARY</p>
                <button class="delete" aria-label="close" @click="show_modal_card = !show_modal_card"></button>
              </header>
              <section class="modal-card-body">
                <!-- Content ... -->
                <figure class="image is-5by3">
                  <img :src="'http://localhost:3000/'+ content.noted_image" alt="note_img">
                </figure>
                <p class="title">{{content.noted_title}}</p>
                <p class="content">{{content.noted_content}}</p>
                <p class="content">{{content.noted_date}} #mydiary</p>
              </section>
              <footer class="modal-card-foot">
                <button class="button is-black" @click="show_modal_card = !show_modal_card">OK</button>
              </footer>
            </div>
          </div>
          <!-- modal-open-card -->
        </div>
      </div>
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
import { useUserStore } from '@/stores/user'

export default {
  data() {
    return {
      name_note: '',
      date_note: '',
      data_note: '',
      content_note: '',
      show_modal_card: false,
    }
  },
  setup() {

      const user_id = ref(''); // สร้างมาเก็บตัวแปร user_id ที่ได้มาจากตอน userStore
      const note = ref(null);

        const note_diary = reactive({
            name_note: '',
            date_note: '',
            data_note: '',
        }) // พอมันอยู่ในนี้แล้วตัวแปรข้างในเป็น object task_todo เวลาจะใช้ตัวแปรข้างในก้ต้อง task_todo.task_name ยังงี้

        const rules_add = { // กำหนด validations ที่จะเช้ค
          name_note: {
            required: required,
          },
          date_note: {
            required: required,
          },
          data_note: {
            required: required,
          }
        }

        // const rules_edit = { // กำหนด validations ที่จะเช้ค สร้างแยกกันระหว่าง add และ edit
        //     task_name_edit: {
        //         required: required,
        //     },
        //     due_date_edit: {
        //         required: required,
        //     },
        // }

        const v$_add = useVuelidate(rules_add, note_diary);

        return { user_id, note, v$_add, note_diary }; // จะเอาค่าไปใช้ต่อก้ต้อง return ออกไป
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

        await axios.get("/NoteDiary/" + this.user_id)
            .then((response) => {
                this.note = response.data.notes; // เข้าไปใน object อีกทีอะ this.note.notes ยังงี้อะ
                console.log('note:', this.note);
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
      shortContent(content) {
        if (content.length > 100) {
          return content.substring(0, 100) + "...";
        }
        return content;
      },

      openModalDetail(note_id){
        console.log(note_id)
          axios.get("/NoteDiary/detail/" + note_id)
          .then((response) => {
            this.content_note = response.data.content_note; //จะเข้าไปใน content_task เลย
            // this.task_todo.task_name_edit = this.content_task[0].list_act
            // this.task_todo.due_date_edit = this.content_task[0].list_date
            console.log(this.content_note) // พอจะใช้ก้ this.content_task[0].list_act ได้เลย
          })
          .catch((err) => {
            console.log(err);
          });
          this.show_modal_card = !this.show_modal_card;
        }
      }
}

</script>