<template>
  <router-view :key="$route.fullPath" />
  <!-- <router-view :key="$route.fullPath" v-slot="{ user }" @auth-change="onAuthChange" :user="user" /> -->
</template>

<script>
import axios from '@/plugins/axios';

export default {
  data() {
    return {
      name: "App",
      // user: null,
    };
  },
  // mounted() {
  //   this.onAuthChange();
  // },
  // methods: {
  //   onAuthChange() {
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       this.getUser();
  //     }
  //   },
  //   getUser() {
  //     const token = localStorage.getItem("token");
  //     axios
  //       .get("/user/me", {
  //         headers: { Authorization: "Bearer " + token },
  //       })
  //       .then((res) => {
  //         this.user = res.data;
  //         console.log(res.data)
  //       });
  //   },
  // },
};
</script>
