<template>
  <!-- <router-view :key="$route.fullPath" /> -->
  <router-view :key="$route.fullPath" @auth-change="onAuthChange" :user="user"/>
</template>

<script>
import axios from "axios";

// export default {
//   name: "App",
// };

export default {
  data() {
    return {
      name: "App",
      user: null,
    };
  },
  mounted() {
    this.onAuthChange();
  },
  methods: {
    onAuthChange() {
      const token = localStorage.getItem("token");
      if (token) {
        this.getUser();
      }
    },
    getUser() {
      const token = localStorage.getItem("token");
      axios
        .get("http://localhost:3000/user/me", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          this.user = res.data;
        });
    },
  },
};
</script>
