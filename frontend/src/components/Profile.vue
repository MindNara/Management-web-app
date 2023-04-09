<template>
    <div class="level-item mt-4">
        <div class="is-flex is-align-items-center">
            <span class="name-member has-text-black is-size-5-fullhd ">Hi, {{ username }} </span>
            <div class="profile-box tabs mx-5">
                <img :src="'http://localhost:3000/' + img_user ? 'http://localhost:3000/' + img_user : '../assets/user_image_default.jpg'"
                    alt="user_img">
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
                    <button class="delete btnDelete" aria-label="close" @click="showModel = !showModel"></button>
                </header>
                <form method="POST" action="/Dashboard" id="form-user" enctype="multipart/form-data">
                    <section class="modal-card-body px-5">
                        <div class="field is-flex is-align-items-center">
                            <div class="img-profile mr-5">
                                <img :src="'http://localhost:3000/' + img_user ? 'http://localhost:3000/' + img_user : '../assets/user_image_default.jpg'"
                                    alt="user_img">
                            </div>
                            <div class="is-flex is-flex-direction-column has-text-black is-size-6" style="width: 65%;">
                                <label class="is-size-6 has-text-grey-dark">Username</label>
                                <span class="boxuser">
                                    <h1 class="pb-2 is-size-3 has-text-weight-medium">{{ username }}</h1>
                                    <div class="file">
                                        <label class="file-label">
                                            <input class="file-input" type="file" name="user_img" id="file" ref="file">
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
                                        name="fname" id="fname" v-model="fname">
                                    <i id="iconFname" class="icon-user iconFname fas fa-pen is-size-7"
                                        style="color: rgb(109, 109, 109);"></i>
                                </span>
                            </div>
                        </div>
                        <div class="field mt-3">
                            <div class="is-flex is-flex-direction-column has-text-black is-size-6">
                                <label class="mb-1 has-text-grey-dark">Last name</label>
                                <span class="boxuser">
                                    <input type="text"
                                        class="user-card px-4 py-3 has-text-weight-medium is-flex is-align-items-center"
                                        name="lname" id="lname" v-model="lname">
                                    <i id="iconLname" class="icon-user iconLname fas fa-pen is-size-7"
                                        style="color: rgb(109, 109, 109);"></i>
                                </span>
                            </div>
                        </div>
                        <div class="field mt-3">
                            <div class="is-flex is-flex-direction-column has-text-black is-size-6">
                                <label class="mb-1 has-text-grey-dark">Email</label>
                                <span class="boxuser">
                                    <input type="text"
                                        class="user-card px-4 py-3 has-text-weight-medium is-flex is-align-items-center"
                                        name="email" id="email" v-model="email">
                                    <i id="iconEmail" class="icon-user iconEmail fas fa-pen is-size-7"
                                        style="color: rgb(109, 109, 109);"></i>
                                </span>
                            </div>
                        </div>
                        <div class="field mt-3">
                            <div class="is-flex is-flex-direction-column has-text-black is-size-6">
                                <label class="mb-1 has-text-grey-dark">Password</label>
                                <span class="boxuser">
                                    <input type="text"
                                        class="user-card px-4 py-3 has-text-weight-medium is-flex is-align-items-center"
                                        name="password" id="password" v-model="password">
                                    <i id="iconPwd" class="icon-user iconPwd fas fa-pen is-size-7"
                                        style="color: rgb(109, 109, 109);"></i>
                                </span>
                            </div>
                        </div>
                    </section>

                    <footer class="modal-card-foot">
                        <button class="button is-black mr-3" type="submit">Update</button>
                        <button class="button btnCancel" @click="showModel = !showModel">Cancel</button>
                    </footer>
                </form>
            </div>
        </div>
        <!-- modal-add-task -->
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            profiles: null,
            username: '',
            fname: '',
            lname: '',
            email: '',
            password: '',
            img_user: '',
            file: null,
            showDropdown: false,
            showModel: false,
            editProfile: false,
        }
    },
    created() {
        axios.get("http://localhost:3000" + this.$route.path)
            .then((response) => {
                this.profiles = response.data;
                if (this.profiles && this.profiles.user) {
                    this.username = this.profiles.user.username;
                    this.fname = this.profiles.user.fname;
                    this.lname = this.profiles.user.lname;
                    this.email = this.profiles.user.email;
                    this.password = this.profiles.user.password;
                    this.img_user = this.profiles.user.image_user;
                    // console.log(this.img_user)
                }
            })
            .catch((err) => {
                console.log(err);
            });
    },
    methods: {

    },
}
</script>