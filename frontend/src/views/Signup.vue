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
                                <label for="phone" class="label">phone :</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input type="text" id="phone" name="phone" class="input"
                                        placeholder="Enter your phone number" v-model="phone">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-phone"></i>
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
                            <div class="buttons is-centered">
                                <button type="button" class="button is-rounded is-black is is-large has-text-weight-bold">GO
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

export default {
    data() {
        return {
            fname: '',
            lname: '',
            email: '',
            phone: '',
            username: '',
            password: '',
        }
    },
}

</script>

<style>

    .img-signup {
        width: 200px;
        height: 200px;
    }

</style>