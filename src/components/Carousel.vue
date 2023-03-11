<script setup lang="ts">
interface Banner {
  title: string;
  src: string;
}
const { items } = defineProps<{
  items: Banner[];
}>();
</script>
<template>
  <div>
    <el-carousel
      trigger="click"
      class="carousel"
      arrow="never"
      :interval="5000"
    >
      <el-carousel-item v-for="(item, i) in items" :key="i">
        <el-image
          class="carousel-img"
          :src="item.src"
          :alt="item.title"
          :title="item.title"
          fit="fill"
        />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<style scoped>
.carousel {
  width: 735px;
  height: 460px;
}
.carousel-img {
  width: 735px;
  height: 435px;
  cursor: pointer;
}
</style>