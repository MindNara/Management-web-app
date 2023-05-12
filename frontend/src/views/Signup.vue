<template>
    <div class="columns is-gapless" id="signup">
        <div class="column is-half">
            <div class="hero is-black is-fullheight">
                <div class="container has-text-centered"
                    style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
                    <a class="mb-2" href="/" style="display: flex; align-items: center;">
                        <img class="mr-2" src="../assets/Icons/logo-white-100.png" style="height: 28px;">
                        <span class="is-size-3-fullhd is-size-4-widescreen has-text-weight-bold has-text-white">LOGO</span>
                    </a>
                    <p class="title is-1">WELCOME TO YOUR <br> PLANNER !</p>
                    <p class="subtitle is-4">Plan with us ! for better life :)</p><br>
                    <img class="img-signup" src="../assets/diary.png" alt="signup">
                    <p class="subtitle is-4 mt-6">Already have an account?</p>
                    <button class="button is-large is-rounded has-text-weight-bold has-text-black"
                        onclick="window.location.href='/Login'">LOGIN</button>
                </div>
            </div>
        </div>
        <div class="column is-half ">
            <div class="hero is-white is-fullheight is-justify-content-center">
                <div class="ph-6 pv-4 mt-2 ml-6 mr-6 mb-5">
                    <p class="title is-2 has-text-centered">CREATE ACCOUNT</p>
                    <form id="form" action="/Signup" method="POST" enctype="multipart/form-data">
                        <div class="field">
                            <label class="label" for="fname">firstname :</label>
                            <input class="input" type="text" id="fname" name="fname" placeholder="Enter your firstname"
                                v-model="fname">
                            <div class="field">
                                <label for="lname" class="label">lastname :</label>
                                <input type="text" id="lname" name="lname" class="input" placeholder="Enter your lastname"
                                    v-model="lname">
                            </div>
                            <div class="field">
                                <label for="email" class="label">email :</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input type="email" id="email" name="email" class="input" placeholder="Enter your email"
                                        v-model="email">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-envelope"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">username :</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input" type="text" id="user" name="user" placeholder="Enter your username"
                                        v-model="username">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-user"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <label for="password" class="label">password :</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input type="password" id="password" name="password" class="input"
                                        placeholder="Enter your password" v-model="password">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-lock"></i>
                                    </span>
                                </div>
                            </div>

                            <!-- <div v-if="locals.register_error" v-for="error_msg in register_error" :key="error_msg">
                                <div class="alert alert-danger" role="alert">{{ error_msg }}</div>
                            </div> -->

                            <div class="buttons is-centered">
                                <button @click="submit()" type="button"
                                    class="button is-rounded is-black is is-large has-text-weight-bold">GO
                                    !</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            fname: '',
            lname: '',
            email: '',
            username: '',
            password: '',
        }
    },
    methods: {
        submit() {
            axios.post('http://localhost:3000/Signup', {
                fname: this.fname,
                lname: this.lname,
                email: this.email,
                username: this.username,
                password: this.password
            }, {
            }).then(() => {
                // this.$route.push({path: '/Login'})
                console.log("Sign Up success!!!")
            }).catch(error => {
                // this.$route.push({path: '/Signup'})
                console.log("Sign Up Insuccess!!!");
            });
        }
    }
}

</script>

<style>
.img-signup {
    width: 200px;
    height: 200px;
}
</style>