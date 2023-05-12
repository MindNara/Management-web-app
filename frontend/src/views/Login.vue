<template>
    <div class="columns is-gapless" id="login">
        <div class="column is-half">
            <div class="hero is-white is-fullheight">
                <div class="container has-text-centered"
                    style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
                    <a class="mb-2" href="/" style="display: flex; align-items: center;">
                        <img class="mr-2" src="../assets/Icons/logo-100.png" style="height: 28px;">
                        <span class="is-size-3-fullhd is-size-4-widescreen has-text-weight-bold has-text-black">LOGO</span>
                    </a>
                    <p class="title is-1">WELCOME BACK <br>TO YOUR PLANNER :)</p>
                    <p class="subtitle is-4">LOG-IN to continue to your account GO!! <br> HAVE FUN ON DAY.</p>
                    <img class="img-login" src="../assets/notebook.png" alt="login">
                    <p class="subtitle is-4 mt-6">Don't have an account?</p>
                    <button class="button is-black is-large is-rounded has-text-weight-bold "
                        onclick="window.location.href='/Signup'">SIGNUP</button>
                </div>
            </div>
        </div>
        <div class="column is-half">
            <div class="hero is-black is-fullheight is-justify-content-center">
                <div class="ph-6 pv-4 mt-4 ml-6 mr-6 mb-5">
                    <p class="title is-2 has-text-centered">LOGIN ACCOUNT</p>
                    <p class="subtitle has-text-centered">Good to see you again </p><br>
                    <div class="card p-5">
                        <form action='/Login' method="post" id="form">
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
                            <div class="buttons is-centered">
                                <button type="button"
                                    class="button is-black is-outlined is-rounded is-black is is-large has-text-weight-bold"
                                    @click="submit()">LOGIN</button>
                            </div>
                        </form>
                    </div>
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
            username: '',
            password: '',
        }
    },
    methods: {
        submit() {
            var formData = new FormData(); // หากมีการส่งรูปใน from ต้องทำตาม format นี้เลย
            formData.append("username", this.username)
            formData.append("password", this.password)
            axios.post('http://localhost:3000/Login', formData, {
            }).then(() => {
                console.log("eiei")
            })
                .catch(error => {
                    console.log("error.message");
                });
        }
    }
}

</script>

<style>
.img-login {
    width: 200px;
    height: 200px;
}
</style>