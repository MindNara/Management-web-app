<template>
    <div class="columns is-gapless" id="login">
        <div class="column is-half">
            <div class="hero is-white is-fullheight">
                <div class="container has-text-centered">
                    <br><br><br>
                    <p class="title is-1">WELCOME BACK <br>TO YOUR PLANNER :)</p>
                    <p class="subtitle is-4">LOG-IN to continue to your account GO!! <br> HAVE FUN ON DAY.</p>
                    <img class="img-login" src="../assets/notebook.png" alt="login"><br><br><br>
                    <p class="subtitle is-4">Don't have an account?</p>
                    <button class="button is-black is-large is-rounded has-text-weight-bold "
                        onclick="window.location.href='/Signup'">SIGNUP</button>
                </div>
            </div>
        </div>
        <div class="column is-half ">
            <div class="hero is-black is-fullheight">
                <div class="ph-6 pv-4 mt-4 ml-6 mr-6 mb-5">
                    <br><br><br><br>
                    <p class="title is-2 has-text-centered">LOGIN ACCOUNT</p>
                    <p class="subtitle has-text-centered">Good to see you again </p><br>
                    <div class="card p-5">
                        <form id="form">
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
                                    class="button is-black is-outlined is-rounded is-black is is-large has-text-weight-bold">LOGIN</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            username: '',
            password: '',
        }
    },
}

</script>

<style>

    .img-login {
        width: 200px;
        height: 200px;
    }

</style>