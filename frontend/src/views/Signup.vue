<template>
    <div class="columns is-gapless" id="signup">
        <div class="column is-half">
            <div class="hero is-black is-fullheight">
                <div class="container has-text-centered"
                    style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
                    <a href="/" class="mb-4" style="display: flex; align-items: center;">
                        <img class="mr-2" src="../assets/Icons/logo-white-100.png" style="height: 28px;">
                        <p class="is-size-3-fullhd is-size-4-widescreen has-text-weight-bold has-text-white">LOGO</p>
                    </a>
                    <p class="title is-1">WELCOME TO YOUR <br> PLANNER !</p>
                    <p class="subtitle is-4 mb-6">Plan with us ! for better life :)</p>
                    <img class="img-signup mb-6" src="../assets/diary.png" alt="signup">
                    <p class="subtitle is-4">Already have an account?</p>
                    <button class="button is-large is-rounded has-text-weight-bold has-text-black"
                        onclick="window.location.href='/Login'">LOGIN</button>
                </div>
            </div>
        </div>
        <div class="column is-half ">
            <div class="hero is-white is-fullheight"
                style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
                <div class="ph-6 pv-4 mt-2 ml-6 mr-6 mb-5" style="width: 80%;">
                    <br>
                    <p class="title is-2 has-text-centered">CREATE ACCOUNT</p>
                    <form id="form">
                        <div class="field">
                            <div class="control has-icons-left has-icons-right">
                                <label class="label" for="fname">firstname :</label>
                                <input class="input" type="text" id="fname" name="fname" placeholder="Enter your firstname"
                                    v-model="user.fname" :class="{ 'is-danger': v$.fname.$error }"
                                    @input="v$.fname.$touch()">
                            </div>
                            <span v-if="v$.fname.$error">
                                <p class="help is-danger">{{ v$.fname.$errors[0].$message }}</p>
                            </span>
                        </div>
                        <div class="field">
                            <div class="control has-icons-left has-icons-right">
                                <label for="lname" class="label">lastname :</label>
                                <input type="text" id="lname" name="lname" class="input" placeholder="Enter your lastname"
                                    v-model="user.lname" :class="{ 'is-danger': v$.lname.$error }"
                                    @input="v$.lname.$touch()">
                            </div>
                            <span v-if="v$.lname.$error">
                                <p class="help is-danger">{{ v$.lname.$errors[0].$message }}</p>
                            </span>
                        </div>
                        <div class="field">
                            <label for="email" class="label">email :</label>
                            <div class="control has-icons-left has-icons-right">
                                <input type="email" id="email" name="email" class="input" placeholder="Enter your email"
                                    v-model="user.email" :class="{ 'is-danger': v$.email.$error }"
                                    @input="v$.email.$touch()">
                                <span class="icon is-small is-left">
                                    <i class="fas fa-envelope"></i>
                                </span>
                            </div>
                            <span v-if="v$.email.$error">
                                <p class="help is-danger">{{ v$.email.$errors[0].$message }}</p>
                            </span>
                        </div>
                        <div class="field">
                            <label class="label">username :</label>
                            <div class="control has-icons-left has-icons-right">
                                <input class="input" type="text" id="user" name="user" placeholder="Enter your username"
                                    v-model="user.username" :class="{ 'is-danger': v$.username.$error }"
                                    @input="v$.username.$touch()">
                                <span class="icon is-small is-left">
                                    <i class="fas fa-user"></i>
                                </span>
                            </div>
                            <span v-if="v$.username.$error">
                                <p class="help is-danger">{{ v$.username.$errors[0].$message }}</p>
                            </span>
                        </div>
                        <div class="field">
                            <label for="password" class="label">password :</label>
                            <div class="control has-icons-left has-icons-right">
                                <input type="password" id="password" name="password" class="input"
                                    placeholder="Enter your password" v-model="user.password"
                                    :class="{ 'is-danger': v$.password.$error }" @input="v$.password.$touch()">
                                <span class="icon is-small is-left">
                                    <i class="fas fa-lock"></i>
                                </span>
                            </div>
                            <span v-if="v$.password.$error">
                                <p class="help is-danger">{{ v$.password.$errors[0].$message }}</p>
                            </span>
                        </div>
                        <div class="buttons is-centered mt-5">
                            <button @click="submit()" type="button"
                                class="button is-rounded is-black is is-large has-text-weight-bold">LET GO!</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { reactive } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, maxLength, helpers } from '@vuelidate/validators'

function complexPassword(value) {
    if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
        return false
    }
    return true
}

export default {
    setup() {
        const user = reactive({
            fname: '',
            lname: '',
            email: '',
            username: '',
            password: '',
        })

        const rules = {
            fname: {
                required: required,
                maxLength: maxLength(150),
            },
            lname: {
                required: required,
                maxLength: maxLength(150),
            },
            email: {
                required: required,
                email
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
        }

        const v$ = useVuelidate(rules, user);

        return { user, v$ };
    },
    methods: {
        submit() {
            this.v$.$touch();

            if (!this.v$.$invalid) {
                let formData = {
                    fname: this.user.fname,
                    lname: this.user.lname,
                    email: this.user.email,
                    username: this.user.username,
                    password: this.user.password,
                }

                axios.post("http://localhost:3000/Signup", formData)
                    .then((response) => {
                        console.log(response);
                        alert("Sign Up Success");
                    })
                    .catch((err) => {
                        if (err.response && err.response.data && err.response.data.details && err.response.data.details.message) {
                            alert(err.response.data.details.message);
                        } else {
                            alert("Sign up failed");
                        }
                    })
                window.location.href = '/Login';
            }
        },
    },
}

</script>

<style>
.img-signup {
    width: 200px;
    height: 200px;
}
</style>