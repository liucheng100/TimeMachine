<script setup lang="ts"></script>
<template>
  <div class="img-text noSelect">
    <slot></slot><img src="../assets/rectangle.png" />
  </div>
</template>
<style scoped>
.img-text {
  position: relative;
  color: #2f2f2f;
  font-size: 24px;
  display: inline-block;
}
.img-text img {
  position: absolute;
  width: 88px;
  height: 16px;
  right: -20px;
  bottom: 0;
}
</style>