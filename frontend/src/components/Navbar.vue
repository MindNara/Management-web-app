<template>
    <nav class="navbar is-flex-direction-column mx-5" role="navigation" aria-label="main navigation">
        <div class="navbar-menu">
            <div class="navbar-start is-flex-direction-column" style="width: 20rem;">

                <a href="/Dashboard" class="nav-item pl-5 pr-5 py-3 mb-5" :class="{'navbar-active is-active': isActive('/Dashboard')}">
                    <i class='bx bx-home-alt-2 mr-4 is-size-4-fullhd is-size-5-widescreen'></i>
                    <span class="is-size-5-fullhd is-size-6-widescreen">Dashboard</span>
                </a>

                <a href="/Schedule" class="nav-item pl-5 pr-5 py-3 mb-5" :class="{'navbar-active is-active': isActive('/Schedule')}">
                    <i class='bx bx-calendar-alt mr-4 is-size-4-fullhd is-size-5-widescreen'></i>
                    <span class="is-size-5-fullhd is-size-6-widescreen">Schedule</span>
                </a>

                <a href="/Task" class="nav-item pl-5 pr-5 py-3 mb-5" :class="{'navbar-active is-active': isActive('/Task')}">
                    <i class='bx bx-list-ul mr-4 is-size-4-fullhd is-size-5-widescreen'></i>
                    <span class="is-size-5-fullhd is-size-6-widescreen">Task</span>
                </a>

                <a href="/NoteDiary" class="nav-item pl-5 pr-5 py-3 mb-5" :class="{'navbar-active is-active': isActive('/NoteDiary')}">
                    <i class='bx bx-note mr-4 is-size-4-fullhd is-size-5-widescreen'></i>
                    <span class="is-size-5-fullhd is-size-6-widescreen">Note</span>
                </a>

                <a href="/" class="nav-item pl-5 pr-5 py-3 mb-5" :class="{'navbar-active is-active': isActive('/')}">
                    <i class='bx bx-log-in mr-4 is-size-4-fullhd is-size-5-widescreen'></i>
                    <span class="is-size-5-fullhd is-size-6-widescreen" @click="logout">Logout</span>
                </a>

            </div>
        </div>
        <!-- <router-view @auth-change="onAuthChange" :user="user" /> -->
    </nav>
</template>

<script>
import axios from '@/plugins/axios'

export default {
    data() {
        return {
            user: null,
        };
    },
    mounted() {
        this.onAuthChange();
    },
    methods: {
        isActive(url) {
            return url === window.location.pathname;
        },
        onAuthChange () {
            const token = localStorage.getItem('token')
            if (token) {
                this.getUser()
            }
        },
        getUser () {
            const token = localStorage.getItem('token')
            axios.get('/user/me').then(res => {
                this.user = res.data
            })
        },
        logout(){
            localStorage.removeItem('token')
            this.user = null
            this.$router.push('/')
        }
    }
}
</script>