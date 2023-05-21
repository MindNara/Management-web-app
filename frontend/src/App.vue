<template>
  <router-view :key="$route.fullPath" />
</template>

<script>
export default {
  data() {
    return {
      name: "App"
    };
  }
};
</script>
