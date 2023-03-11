<template>
  <div class="main">
    <Navtree class="nav" />
    <div class="content">
      <MainHeader />
      <div id="screen" class="screen">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import Navtree from "@/components/Navtree.vue";
import MainHeader from "@/components/MainHeader.vue";
export default {
  components: {
    Navtree,
    MainHeader,
  },
};
</script>
<style scoped>
.main {
  background-color: #fafafa;
  display: grid;
  grid-template-columns: 300px auto;
  overflow-x: hidden;
}
.nav {
  z-index: 99;
  min-height: 100vh;
}
.screen {
  background-color: #fafafa;
  overflow: overlay; /*auto*/
  padding: 30px 100px;
}
.content {
  display: grid;
  grid-template-rows: 90px auto;
}
</style>
