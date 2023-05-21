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
          <button class="button is-black is is-normal has-text-weight-normal" @click="show_modal = !show_modal">
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
                    <img :src="'http://localhost:3000/' + note.noted_image" alt="note_img">
                  </figure>
                </div>
                <div class="card-content" @click="openModalDetail(note.noted_id)">
                  <div class="media">
                    <div class="media-content" style="width: 100%;">
                      <p class="title title-note is-4">{{ note.noted_title }}</p>
                      <!-- <p class="subtitle is-6">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p> -->
                      <p class="subtitle is-6" style="float: left;">{{ shortContent(note.noted_content) }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <footer class="card-footer">
                <a href="#" class="edit-delete card-footer-item">
                  <span class="icon has-text-black" @click="openModalEdit(note.noted_id)">
                    <i class="fas fa-pen mr-3"></i>
                    <p>Edit</p>
                  </span>
                </a>
                <a href="#" class="edit-delete card-footer-item">
                  <span class="icon has-text-black" @click="deleteNote(note.noted_id, note.noted_title)">
                    <i class="fas fa-trash mr-3" style="color: rgb(105, 16, 16);"></i>
                    <p style="color: rgb(105, 16, 16);">Delete</p>
                  </span>
                </a>
              </footer>
            </div>
          </div>
        </div>
        <!-- modal-add-note -->
        <div class="modal" v-bind:class="{ 'is-active': show_modal }">
          <div class="modal-background" @click="show_modal = !show_modal"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title has-text-weight-semibold m-0">ADD NOTE-DIARY</p>
              <button class="delete" aria-label="close" @click="show_modal = !show_modal; closeAddNote()"></button>
            </header>
            <section class="modal-card-body">
              <!-- Content ... -->
              <form id="form">
                <div class="field">
                  <label class="label">TOPIC :</label>
                  <div class="control has-icons-left has-icons-right">
                    <input class="input" type="text" id="name-note" name="name-note" v-model="note_diary.name_note"
                      @input="v$_add.name_note.$touch()" :class="{ 'is-danger': v$_add.name_note.$error }">
                    <span class="icon is-small is-left">
                      <i class="fas fa-book"></i>
                    </span>
                  </div>
                  <span v-if="v$_add.name_note.$error">
                    <p class="help is-danger" v-if="v$_add.name_note.required">This field is required</p>
                  </span>
                </div>
                <div class="file">
                  <label class="field">
                    <label for="image-note" class="label">IMAGE :</label>
                    <input type="file" name="image-note" id="image-note" ref="file" @change="handleFileUpload()">
                  </label>
                </div>
                <div class="field mt-3">
                  <label for="date-note" class="label">DATE :</label>
                  <div class="control has-icons-left has-icons-right">
                    <input type="date" id="date-note" name="date-note" class="input" v-model="note_diary.date_note"
                      @input="v$_add.date_note.$touch()" :class="{ 'is-danger': v$_add.date_note.$error }">
                    <span class="icon is-small is-left">
                      <i class="fas fa-calendar"></i>
                    </span>
                  </div>
                  <span v-if="v$_add.date_note.$error">
                    <p class="help is-danger" v-if="v$_add.date_note.required">This field is required</p>
                  </span>
                </div>
                <div class="field">
                  <label for="date-note" class="label">STORY :</label>
                  <textarea class="p-5 is-size-5" style="width: 100%;" placeholder="Remember, be nice!" cols="90"
                    rows="10" v-model="note_diary.data_note" @input="v$_add.data_note.$touch()"
                    :class="{ 'is-danger': v$_add.data_note.$error }"></textarea>
                </div>
                <span v-if="v$_add.data_note.$error">
                  <p class="help is-danger" v-if="v$_add.data_note.required">This field is required</p>
                </span>
              </form>
            </section>
            <footer class="modal-card-foot">
              <button class="button is-black" @click="addNote()">Create</button>
              <button class="button" @click="show_modal = !show_modal; closeAddNote()">Cancel</button>
            </footer>
          </div>
        </div>
        <!-- modal-add-note -->

        <!-- modal-open-card -->
        <div class="modal" v-bind:class="{ 'is-active': show_modal_card }" v-for="(content, index) in content_note"
          :key="index">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title has-text-weight-semibold m-0">MY DIARY</p>
              <button class="delete" aria-label="close" @click="show_modal_card = !show_modal_card"></button>
            </header>
            <section class="modal-card-body">
              <!-- Content ... -->
              <figure class="image is-5by3">
                <img :src="'http://localhost:3000/' + content.noted_image" alt="note_img">
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

        <!-- modal-edit-note -->
        <div class="modal" v-bind:class="{ 'is-active': show_modal_edit }">
          <div class="modal-background" @click="show_modal_edit = !show_modal_edit"></div>
          <div class="modal-card" v-for="(content, index) in content_note" :key="index">
            <header class="modal-card-head">
              <p class="modal-card-title has-text-weight-semibold m-0">EDIT NOTE-DIARY</p>
              <button class="delete" aria-label="close" @click="show_modal_edit = !show_modal_edit"></button>
            </header>
            <section class="modal-card-body">
              <!-- Content ... -->
              <form id="form_edit">
                <div class="field">
                  <label class="label">TOPIC :</label>
                  <div class="control has-icons-left has-icons-right">
                    <input class="input" type="text" id="name-note-edit" name="name-note-edit"
                      v-model="note_diary_edit.name_note_edit" @input="v$_edit.name_note_edit.$touch()">
                    <span class="icon is-small is-left">
                      <i class="fas fa-book"></i>
                    </span>
                  </div>
                  <span v-if="v$_edit.name_note_edit.$error">
                    <p class="help is-danger" v-if="v$_edit.name_note_edit.required">This field is required</p>
                  </span>
                </div>
                <div class="file">
                  <label class="field">
                    <label for="image-note" class="label">IMAGE :</label>
                    <input type="file" name="note_img_edit" id="note_img_edit" ref="editfile"
                      @change="handleFileUploadEdit()">
                  </label>
                </div>
                <div class="field mt-3">
                  <label for="date-note" class="label">DATE :</label>
                  <div class="control has-icons-left has-icons-right">
                    <input type="date" id="date-note-edit" name="date-note-edit" class="input"
                      v-model="note_diary_edit.date_note_edit" @input="v$_edit.date_note_edit.$touch()">
                    <span class="icon is-small is-left">
                      <i class="fas fa-calendar"></i>
                    </span>
                  </div>
                  <span v-if="v$_edit.date_note_edit.$error">
                    <p class="help is-danger" v-if="v$_edit.date_note_edit.required">This field is required</p>
                  </span>
                </div>
                <div class="field">
                  <label for="date-note" class="label">STORY :</label>
                  <textarea class="p-5 is-size-5" style="width: 100%;" placeholder="Remember, be nice!" cols="90"
                    rows="10" v-model="note_diary_edit.data_note_edit"
                    @input="v$_edit.data_note_edit.$touch()"></textarea>
                </div>
                <span v-if="v$_edit.data_note_edit.$error">
                  <p class="help is-danger" v-if="v$_edit.date_note_edit.required">This field is required</p>
                </span>
              </form>
            </section>
            <footer class="modal-card-foot">
              <button class="button is-black" @click="editNote(content.noted_id)">Update</button>
              <button class="button" @click="show_modal_edit = !show_modal_edit">Cancel</button>
            </footer>
          </div>
        </div>
        <!-- modal-edit-note -->
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
      file: null,
      editfile: null,
      content_note: '',
      show_modal_card: false,
      show_modal: false,
      show_modal_edit: false,
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

    const note_diary_edit = reactive({ // แยกกัน
      name_note_edit: '',
      date_note_edit: '',
      data_note_edit: '',
    })

    const rules_edit = { // กำหนด validations ที่จะเช้ค สร้างแยกกันระหว่าง add และ edit
      name_note_edit: {
        required: required,
      },
      date_note_edit: {
        required: required,
      },
      data_note_edit: {
        required: required,
      }
    }

    const v$_add = useVuelidate(rules_add, note_diary);
    const v$_edit = useVuelidate(rules_edit, note_diary_edit);

    return { user_id, note, v$_add, v$_edit, note_diary, note_diary_edit }; // จะเอาค่าไปใช้ต่อก้ต้อง return ออกไป
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
    // console.log('User ID:', this.user_id);

    await axios.get("/NoteDiary/" + this.user_id)
      .then((response) => {
        this.note = response.data.notes; // เข้าไปใน object อีกทีอะ this.note.notes ยังงี้อะ
        console.log('note:', this.note);
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

    openModalDetail(note_id) {
      console.log(note_id)
      axios.get("/NoteDiary/detail/" + note_id)
        .then((response) => {
          this.content_note = response.data.content_note; //จะเข้าไปใน content_task เลย
          console.log(this.content_note) // พอจะใช้ก้ this.content_task[0].list_act ได้เลย
        })
        .catch((err) => {
          console.log(err);
        });
      this.show_modal_card = !this.show_modal_card;
    },

    closeAddNote() {
      this.note_diary.name_note = '';
      this.note_diary.date_note = '';
      this.note_diary.data_note = '';

      // reset สถานะของ vuelidate
      this.v$_add.$reset();
    },

    openModalEdit(note_id) {
      console.log(note_id)
      axios.get("/NoteDiary/detail/" + note_id)
        .then((response) => {
          this.content_note = response.data.content_note; //จะเข้าไปใน content_task เลย
          this.note_diary_edit.name_note_edit = this.content_note[0].noted_title
          this.note_diary_edit.data_note_edit = this.content_note[0].noted_content
          this.note_diary_edit.date_note_edit = this.content_note[0].noted_date
          console.log(this.content_note) // พอจะใช้ก้ this.content_task[0].list_act ได้เลย
          console.log(this.note_diary_edit.name_note_edit)
        })
        .catch((err) => {
          console.log(err);
        });
      this.show_modal_edit = !this.show_modal_edit;
    },

    handleFileUpload() { // แยกกันไม่งั้นมันทับ ระหว่าง add กะ edit
      this.file = this.$refs.file.files[0];
      // console.log(this.$refs.file.files[0])
    },

    handleFileUploadEdit() {
      this.editfile = this.$refs.editfile[0].files[0];
      // console.log(this.$refs.editfile[0].files[0])
    },

    addNote() {
      this.v$_add.$touch();

      console.log(this.v$_add.$invalid)
      if (!this.v$_add.$invalid) {
        var formData = new FormData();
        formData.append("note_img", this.file);
        formData.append("name_note", this.note_diary.name_note);
        formData.append("date_note", this.note_diary.date_note);
        formData.append("data_note", this.note_diary.data_note);
        formData.append("user_id", this.user_id)

        console.log(this.file)

        axios.post("/NoteDiary/add", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }).then((response) => {
          console.log(response);
          document.location.reload();
        }).catch((error) => {
          console.log(error.message);
        });
      }
    },

    deleteNote(noted_id, noted_title) {
      // this.list_act = task_act
      // this.list_id = task_id
      const result = confirm(`Are you sure you want to delete \'${noted_title}\'`);

      if (result) {
        axios.delete("/NoteDiary/delete/" + noted_id)
          .then((response) => {
            // this.$router.push({ path: "/NoteDiaey" })
            document.location.reload();

          })
          .catch((error) => {
            this.error = error.response.data.message;
          });
      }
    },
    editNote(noted_id) {
      this.v$_edit.$touch(); // ไปเอามาเช้คอีกทีใน usevalidate

      console.log(this.v$_edit.$invalid)
      if (!this.v$_edit.$invalid) {
        var formData = new FormData();
        formData.append("note_img_edit", this.editfile);
        formData.append("name_note", this.note_diary_edit.name_note_edit);
        formData.append("date_note", this.note_diary_edit.date_note_edit);
        formData.append("data_note", this.note_diary_edit.data_note_edit);
        formData.append("user_id", this.user_id);

        console.log(this.editfile)

        axios.put("/NoteDiary/edit/" + noted_id, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }).then((response) => {
          console.log(response);
          document.location.reload();
        }).catch((error) => {
          console.log(error.message);
        });
      }
    },
  },
}

</script>