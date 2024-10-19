<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  mounted() {}
};
</script>

<style lang="scss">
html,
body {
  overflow-x: hidden;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

html body {
  overflow-y: auto;
}

#app {
  position: relative;
  font-family: COSTOME PINGFANG, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  height: 100%;
  min-height: 1080px;
}
</style>
