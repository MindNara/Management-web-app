<template>
    <div class="level-item mt-4">
        <div class="is-flex is-align-items-center">
            <span class="name-member has-text-black is-size-5-fullhd ">Hi, {{ user.username }} </span>
            <div class="profile-box tabs mx-5">
                <img v-if="!user.image_user
                    " src="../assets/user_image_default.jpg" alt="user_img">
                <img v-else :src="user.image_user
                    ? 'http://localhost:3000/' + user.image_user
                    : '../assets/user_image_default.jpg'" alt="user_img">
                <a class="dropbtn" style="width: 100%;" @click="showDropdown = !showDropdown"></a>
            </div>
        </div>

        <div id="profileDropdown" class="tab-profile profile has-background-white px-5 py-2"
            :class="{ 'is-active': showDropdown }">
            <a class="has-text-black" @click="showModel = !showModel; showDropdown = !showDropdown"><i
                    class="fas fa-user mr-2"></i>Profile</a>
        </div>

        <!-- modal-add-task -->
        <div class="modal model-profile" :class="{ 'is-active': showModel }">
            <div class="modal-background"></div>
            <div class="modal-card" style="width: 30rem;">
                <header class="modal-card-head">
                    <p class="modal-card-title has-text-weight-semibold">MY PROFILE</p>
                    <button class="delete btnDelete" aria-label="close"
                        @click="showModel = !showModel; closeEditingInput()"></button>
                </header>
                <section class="modal-card-body px-5">
                    <div class="field is-flex is-align-items-center">
                        <div class="img-profile mr-5">
                            <img v-if="!user.image_user
                                " src="../assets/user_image_default.jpg" alt="user_img">
                            <img v-else :src="user.image_user
                                ? 'http://localhost:3000/' + user.image_user
                                : '../assets/user_image_default.jpg'" alt="user_img">
                        </div>
                        <div class="is-flex is-flex-direction-column has-text-black is-size-6" style="width: 65%;">
                            <label class="is-size-6 has-text-grey-dark">Username</label>
                            <span class="boxuser">
                                <div class="mb-4">
                                    <input type="text"
                                        class="user-card px-4 py-3 has-text-weight-medium is-flex is-align-items-center is-size-5"
                                        name="username" id="input-username" v-model="user.username"
                                        :disabled="!EditUsername" @input="v$.username.$touch()">
                                    <a @click="editInput('input-username')"><i id="iconUsername"
                                            class="icon-user iconUsername fas fa-pen is-size-7"
                                            style="color: rgb(109, 109, 109);"></i></a>
                                    <span class="mb-4" v-if="v$.username.$error">
                                        <p class="help is-danger">{{ v$.username.$errors[0].$message }}</p>
                                    </span>
                                </div>
                                <div class="file">
                                    <label class="file-label">
                                        <input class="file-input" type="file" name="user_img" id="file" ref="file"
                                            @change="handleFileUpload()">
                                        <span class="file-cta is-size-7">
                                            <span class="file-icon">
                                                <i class="fas fa-upload"></i>
                                            </span>
                                            <span class="file-label">
                                                Choose a file…
                                            </span>
                                        </span>
                                    </label>
                                </div>
                            </span>
                        </div>
                    </div>
                    <div class="field mt-3">
                        <div class="is-flex is-flex-direction-column has-text-black is-size-6">
                            <label class="mb-1 has-text-grey-dark">First name</label>
                            <span class="boxuser">
                                <input type="text"
                                    class="user-card px-4 py-3 has-text-weight-medium is-flex is-align-items-center"
                                    name="fname" id="input-fname" v-model="user.fname" :disabled="!EditFname"
                                    @input="v$.fname.$touch()">
                                <a @click="editInput('input-fname')"><i id="iconFname"
                                        class="icon-user iconLname fas fa-pen is-size-7"
                                        style="color: rgb(109, 109, 109);"></i></a>
                            </span>
                            <span v-if="v$.fname.$error">
                                <p class="help is-danger">{{ v$.fname.$errors[0].$message }}</p>
                            </span>
                        </div>
                    </div>
                    <div class="field mt-3">
                        <div class="is-flex is-flex-direction-column has-text-black is-size-6">
                            <label class="mb-1 has-text-grey-dark">Last name</label>
                            <span class="boxuser">
                                <input type="text"
                                    class="user-card px-4 py-3 has-text-weight-medium is-flex is-align-items-center"
                                    name="lname" id="input-lname" v-model="user.lname" :disabled="!EditLname"
                                    @input="v$.lname.$touch()">
                                <a @click="editInput('input-lname')"><i id="iconLname"
                                        class="icon-user iconLname fas fa-pen is-size-7"
                                        style="color: rgb(109, 109, 109);"></i></a>
                            </span>
                            <span v-if="v$.lname.$error">
                                <p class="help is-danger">{{ v$.lname.$errors[0].$message }}</p>
                            </span>
                        </div>
                    </div>
                    <div class="field mt-3">
                        <div class="is-flex is-flex-direction-column has-text-black is-size-6">
                            <label class="mb-1 has-text-grey-dark">Email</label>
                            <span class="boxuser">
                                <input type="text"
                                    class="user-card px-4 py-3 has-text-weight-medium is-flex is-align-items-center"
                                    name="email" id="input-email" v-model="user.email" disabled>
                            </span>
                        </div>
                    </div>
                    <div class="field mt-3">
                        <div class="is-flex is-flex-direction-column has-text-black is-size-6">
                            <label class="mb-1 has-text-grey-dark">Password</label>
                            <span class="boxuser">
                                <input type="password"
                                    class="user-card px-4 py-3 has-text-weight-medium is-flex is-align-items-center"
                                    name="password" id="input-password" v-model="user.password" :disabled="!EditPwd"
                                    @input="v$.password.$touch()">
                                <a @click="editInput('input-password')"><i id="iconPassword"
                                        class="icon-user iconPwd fas fa-pen is-size-7"
                                        style="color: rgb(109, 109, 109);"></i></a>
                            </span>
                            <span v-if="v$.password.$error">
                                <p class="help is-danger">{{ v$.password.$errors[0].$message }}</p>
                            </span>
                        </div>
                    </div>
                </section>

                <footer class="modal-card-foot">
                    <button class="button is-black mr-3" type="submit" @click="submit()">Update</button>
                    <a class="button btnCancel" @click="showModel = !showModel; closeEditingInput()">Cancel</a>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/plugins/axios'
import { reactive } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength, helpers } from '@vuelidate/validators'


function complexPassword(value) {
    if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
        return false
    }
    return true
}

export default {
    data() {
        return {
            profiles: null,
            file: null,
            showDropdown: false,
            showModel: false,
            EditFname: false,
            EditLname: false,
            EditEmail: false,
            EditPwd: false,
            EditUsername: false,
        }
    },
    setup() {
        const user = reactive({
            user_id: '',
            username: '',
            fname: '',
            lname: '',
            email: '',
            password: 'AaBb1234',
            passwordCrrut: '',
            image_user: '',
        });

        const rules = {
            fname: {
                required: required,
                maxLength: maxLength(150),
            },
            lname: {
                required: required,
                maxLength: maxLength(150),
            },
            username: {
                required: required,
                minLength: minLength(5),
                maxLength: maxLength(20),
            },
            password: {
                required: required,
                minLength: minLength(8),
                complex: helpers.withMessage('The password in English consists of A-Z, a-z and 0-9', complexPassword)
            },
        };

        const v$ = useVuelidate(rules, user);

        return { user, v$ };
    },
    created() {

        axios.get("/Profile")
            .then((response) => {
                this.user.user_id = response.data.user.user_id;
                this.user.username = response.data.user.username;
                this.user.fname = response.data.user.fname;
                this.user.lname = response.data.user.lname;
                this.user.email = response.data.user.email;
                this.user.passwordCrrut = response.data.user.password;
                this.user.image_user = response.data.user.image_user;
            })
            .catch((err) => {
                console.log(err);
            });

    },
    methods: {
        editInput(field) {
            console.log(field);
            if (field === 'input-fname') {
                this.EditFname = true;
                const input = document.getElementById('input-fname');
                input.focus();
            } else if (field === 'input-lname') {
                this.EditLname = true;
                const input = document.getElementById('input-lname');
                input.focus();
            } else if (field === 'input-password') {
                this.EditPwd = true;
                const input = document.getElementById('input-password');
                this.user.password = '';
                input.type = 'text';
                input.focus();
            } else if (field === 'input-username') {
                this.EditUsername = true;
                const input = document.getElementById('input-username');
                input.focus();
            }
        },

        closeEditingInput() {
            this.EditFname = false;
            this.EditLname = false;
            this.EditPwd = false;
            this.EditUsername = false;

            axios.get("/Profile")
                .then((response) => {
                    this.user.user_id = response.data.user.user_id;
                    this.user.username = response.data.user.username;
                    this.user.fname = response.data.user.fname;
                    this.user.lname = response.data.user.lname;
                    this.user.passwordCrrut = response.data.user.password;
                    this.user.image_user = response.data.user.image_user;
                })
                .catch((err) => {
                    console.log(err);
                });

            document.getElementById('input-password').type = 'password';
            this.user.password = 'AaBb1234';
        },

        handleFileUpload() {
            this.file = this.$refs.file.files[0];
        },

        submit() {
            this.v$.$touch();

            console.log(this.v$.$invalid)
            if (!this.v$.$invalid) {
                var formData = new FormData();

                // ไม่ได้เปลี่ยนรหัส -> ส่งค่า password ที่เป็นค่า default
                if (this.user.password === 'AaBb1234') {
                    console.log('ไม่ได้เปลี่ยนรหัส')
                    formData.append("user_img", this.file);
                    formData.append("fname", this.user.fname);
                    formData.append("lname", this.user.lname);
                    formData.append("username", this.user.username);
                    formData.append("user_id", this.user.user_id);
                    formData.append("password", 'AaBb1234');
                }
                // เปลี่ยนรหัส -> ส่งค่า password ใหม่
                else {
                    console.log('เปลี่ยนรหัส')
                    formData.append("user_img", this.file);
                    formData.append("fname", this.user.fname);
                    formData.append("lname", this.user.lname);
                    formData.append("username", this.user.username);
                    formData.append("user_id", this.user.user_id);
                    formData.append("password", this.user.password);
                }

                axios.put("/Profile", formData, {
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