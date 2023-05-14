<template>
    <div class="columns is-gapless" id="signup">
        <div class="column is-half">
            <div class="hero is-black is-fullheight">
                <div class="container has-text-centered">
                    <br><br><br>
                    <p class="title is-1">WELCOME TO YOUR <br> PLANNER !</p>
                    <p class="subtitle is-4">Plan with us ! for better life :)</p><br>
                    <img class="img-signup" src="../assets/diary.png" alt="signup"><br><br><br>
                    <p class="subtitle is-4">Already have an account?</p>
                    <button class="button is-large is-rounded has-text-weight-bold has-text-black"
                        onclick="window.location.href='/Login'">LOGIN</button>
                </div>
            </div>
        </div>
        <div class="column is-half ">
            <div class="hero is-white is-fullheight">
                <div class="ph-6 pv-4 mt-2 ml-6 mr-6 mb-5">
                    <br>
                    <p class="title is-2 has-text-centered">CREATE ACCOUNT</p>
                    <form id="form">
                        <div class="field">
                            <div class="control has-icons-left has-icons-right">
                                <label class="label" for="fname">firstname :</label>
                                <input class="input" type="text" id="fname" name="fname" placeholder="Enter your firstname"
                                    v-model="state.form.fname" :class="{ 'is-danger': v$.form.fname.$error }"
                                    @input="v$.form.fname.$touch()">
                            </div>
                            <div v-if="v$.form.fname.$error">
                                <p class=" help is-danger" v-if="!v$.form.fname.required">This field is required</p>
                                <p class="help is-danger" v-if="!v$.form.fname.maxLength">cannot be more than 150
                                    letters
                                </p>
                            </div>
                        </div>
                        <div class="field">
                            <div class="control has-icons-left has-icons-right">
                                <label for="lname" class="label">lastname :</label>
                                <input type="text" id="lname" name="lname" class="input" placeholder="Enter your lastname"
                                    v-model="state.form.lname" :class="{ 'is-danger': v$.form.lname.$error }"
                                    @input="v$.form.lname.$touch()">
                            </div>
                            <div v-if="v$.form.lname.$error">
                                <p class=" help is-danger" v-if="!v$.form.lname.required">This field is required</p>
                                <p class="help is-danger" v-if="!v$.form.lname.maxLength">cannot be more than 150
                                    letters
                                </p>
                            </div>
                        </div>
                        <div class="field">
                            <label for="email" class="label">email :</label>
                            <div class="control has-icons-left has-icons-right">
                                <input type="email" id="email" name="email" class="input" placeholder="Enter your email"
                                    v-model="state.form.email" :class="{ 'is-danger': v$.form.email.$error }"
                                    @input="v$.form.email.$touch()">
                                <span class="icon is-small is-left">
                                    <i class="fas fa-envelope"></i>
                                </span>
                            </div>
                            <div v-if="v$.form.email.$error">
                                <p class=" help is-danger" v-if="!v$.form.email.required">This field is required</p>
                                <p class="help is-danger" v-if="!v$.form.email.email">Invalid Email</p>
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">username :</label>
                            <div class="control has-icons-left has-icons-right">
                                <input class="input" type="text" id="user" name="user" placeholder="Enter your username"
                                    v-model="state.form.username" :class="{ 'is-danger': v$.form.username.$error }"
                                    @input="v$.form.username.$touch()">
                                <span class="icon is-small is-left">
                                    <i class="fas fa-user"></i>
                                </span>
                            </div>
                            <div v-if="v$.form.username.$error">
                                <p class="help is-danger" v-if="!v$.form.username.required">This field is required
                                </p>
                                <p class="help is-danger" v-if="!v$.form.username.minLength">
                                    must be at least 5 characters</p>
                                <p class="help is-danger" v-if="!v$.form.username.maxLength">
                                    cannot be more than 20 characters</p>
                            </div>
                        </div>
                        <div class="field">
                            <label for="password" class="label">password :</label>
                            <div class="control has-icons-left has-icons-right">
                                <input type="password" id="password" name="password" class="input"
                                    placeholder="Enter your password" v-model="state.form.password"
                                    :class="{ 'is-danger': v$.form.password.$error }" @input="v$.form.password.$touch()">
                                <span class="icon is-small is-left">
                                    <i class="fas fa-lock"></i>
                                </span>
                            </div>
                            <div v-if="v$.form.password.$error">
                                <p class="help is-danger" v-if="!v$.form.password.required">This field is required
                                </p>
                                <p class="help is-danger" v-if="!v$.form.password.minLength">
                                    must be at least 8 characters</p>
                                <p class="help is-danger" v-if="!v$.form.password.complex">
                                    enter password in english only</p>
                            </div>
                        </div>
                        <div class="buttons is-centered">
                            <button @click="submit()" type="button"
                                class="button is-rounded is-black is is-large has-text-weight-bold">GO
                                !</button>
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
import { required, email, minLength, maxLength } from '@vuelidate/validators'

function complexPassword(value) {
    if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
        return false
    }
    return true
}

export default {
    setup() {
        const state = reactive({
            form: {
                fname: '',
                lname: '',
                email: '',
                username: '',
                password: '',
            }
        })

        const rules = {
            form: {
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
                    complex: complexPassword
                },
            }
        }

        const v$ = useVuelidate(rules, state);

        return { state, rules, v$ };
    },
    methods: {
        submit() {
            this.v$.$touch();
            console.log(this.v$.$invalid)
            console.log(this.v$.form.fname.required)
            console.log(this.v$.form.fname.maxLength)

            if (!this.v$.$invalid) {
                let formData = {
                    fname: this.state.form.fname,
                    lname: this.state.form.lname,
                    email: this.state.form.email,
                    username: this.state.form.username,
                    password: this.state.form.password,
                }

                axios.post("http://localhost:3000/Signup", formData)
                    .then((res) => {
                        alert("Sign Up Success");
                    })
                    .catch((err) => {
                        if (err.response && err.response.data && err.response.data.details && err.response.data.details.message) {
                            alert(err.response.data.details.message);
                        } else {
                            alert("Sign up failed");
                        }
                    })
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