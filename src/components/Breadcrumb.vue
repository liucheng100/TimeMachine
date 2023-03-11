<template>
  <div class="breadcrumb">
    <p class="pointer" @click="back">{{ path[0] }}</p>
    <img src="../assets/arrow.png" />
    <p>{{ path[1] }}</p>
  </div>
</template>

<script>
export default {
  props: {
    path: {
      type: Array,
      default: ["", ""],
    },
  },
  methods: {
    back() {
      this.$emit("clickPath", 0);
    },
  },
};
</script>

<style scoped>
.breadcrumb {
  margin: 20px 0;
  margin-bottom: 36px;
}
.breadcrumb p {
  font-size: 24px;
  color: #2f2f2f;
  display: inline-block;
  vertical-align: middle;
}
.breadcrumb img {
  width: 12.5px;
  height: 9px;
  margin: 0 18px;
  display: inline-block;
  vertical-align: middle;
}
</style>