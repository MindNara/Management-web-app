<template>
    <div class="columns is-gapless" id="login">
        <div class="column is-half">
            <div class="hero is-white is-fullheight">
                <div class="container has-text-centered"
                    style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
                    <a href="/" class="mb-4" style="display: flex; align-items: center;">
                        <img class="mr-2" src="../assets/Icons/logo-100.png" style="height: 28px;">
                        <p class="is-size-3-fullhd is-size-4-widescreen has-text-weight-bold has-text-black">LOGO</p>
                    </a>
                    <p class="title is-1">WELCOME BACK <br>TO YOUR PLANNER :)</p>
                    <p class="subtitle is-4 mb-6">LOG-IN to continue to your account GO!! <br> HAVE FUN ON DAY.</p>
                    <img class="img-login mb-6" src="../assets/notebook.png" alt="login">
                    <p class="subtitle is-4">Don't have an account?</p>
                    <button class="button is-black is-large is-rounded has-text-weight-bold "
                        onclick="window.location.href='/Signup'">SIGNUP</button>
                </div>
            </div>
        </div>
        <div class="column is-half ">
            <div class="hero is-black is-fullheight"
                style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
                <div class="ph-6 pv-4 mt-4 ml-6 mr-6 mb-5" style="width: 80%;">
                    <p class="title is-2 has-text-centered">LOGIN ACCOUNT</p>
                    <p class="subtitle has-text-centered">Good to see you again </p><br>
                    <div class="card p-5">
                        <!-- <form id="form"> -->
                        <p v-if="error" class="px-3 py-2 mb-3 has-text-danger-dark has-background-danger-light">
                            {{ error }}
                        </p>
                        <div class="field">
                            <label class="label">email :</label>
                            <div class="control has-icons-left has-icons-right">
                                <input class="input" type="text" id="email" name="email" placeholder="Enter your email"
                                    v-model="email">
                                <!-- <input v-model="username" class="input" type="text" /> -->
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
                                <!-- <input v-model="password" class="input" type="password" /> -->
                                <span class="icon is-small is-left">
                                    <i class="fas fa-lock"></i>
                                </span>
                            </div>
                        </div>
                        <div class="buttons is-centered">
                            <button class="button is-black is-outlined is-rounded is-black is is-large has-text-weight-bold"
                                @click="submit">
                                LOGIN
                            </button>
                            <!-- <button class="button is-primary is-fullwidth" @click="submit">Login</button> -->
                        </div>
                        <!-- </form> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/plugins/axios'

export default {
    data() {
        return {
            email: '',
            password: '',
            error: ''
        }
    },
    methods: {
        submit() {
            // const fetchingData = await axios.post("http://localhost:3000/Login", {
            // username: this.username,
            // password: this.password
            const data = { // data ที่ผู้ใช้กรอกเข้ามาอะ
                email: this.email,
                password: this.password
            }

            axios.post('/Login', data) // ส่งข้อมูลที่พิมมา data ส่งไปที่ path ใน backend
                .then(res => {
                    const token = res.data.token
                    localStorage.setItem('token', token)
                    this.$emit('auth-change')
                    this.$router.push({ path: '/Dashboard' }) // save token แล้วมาหน้า Dashboard
                })
                .catch(error => {
                    this.error = error.response.data
                    console.log(error.response.data)
                })
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