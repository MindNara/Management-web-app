<template>
    <div style="height: 100vh; width: 100%;">
        <img class="bgHome" src="../assets/Bg-HomePage.png" alt="BG">

        <div class="nav">
            <div class="level py-6">

                <div class="level-left">
                    <div class="level-item">
                        <div class="navbar-brand">
                            <div class="navbar-item">
                                <img class="mr-2" src="../assets/Icons/logo-100.png">
                                <span
                                    class="is-size-3-fullhd is-size-4-widescreen has-text-weight-bold has-text-black">LOGO</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="level-right">
                    <div class="level-item">
                        <a href="/Login"><span class="login mr-6 has-text-black">Log In</span></a>
                        <a href="/Signup"><span class="signup">Sign Up</span></a>
                    </div>
                </div>

            </div>
        </div>

        <div class="content-text is-flex is-align-items-center" style="margin-left: 10%;">
            <div class="text">
                <div class="title-text">
                    <h1 class="m-0 has-text-black">Manage</h1>
                    <h3 class="mt-0 has-text-black">your life better</h3>
                </div>
                <p class="mt-5 mb-6 has-text-black">Keeping life organized often feels like a juggling act. Just as
                    swiftly
                    as
                    you move to catch
                    one ball, Unfortunately, some balls are bound to hit the ground.</p>
                <a href="/Login" class="btn" @click="getStart()"><span>Get Start</span></a>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {

        }
    },
    methods: {


    },
}

</script>