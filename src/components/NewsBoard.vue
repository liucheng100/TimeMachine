<script setup lang="ts">
import ImgText from "./ImgText.vue";
interface News {
  title: string;
  url: string;
}
interface Notice {
  title: string;
  url: string;
  date: string;
}
const { news, notice } = defineProps<{
  news: News[];
  notice: Notice[];
}>();
</script>
<template>
  <div>
    <div class="news">
      <div style="overflow: hidden">
        <ImgText>推荐阅读</ImgText>
        <div class="news-container">
          <p
            v-for="(item, i) in news.slice(0, 10)"
            :key="i"
            :title="item.title"
          >
            {{ item.title }}
          </p>
        </div>
      </div>
      <div style="overflow: hidden">
        <ImgText>近期通知</ImgText>
        <div class="notice-container">
          <div
            class="notice-item"
            v-for="(item, i) in notice"
            :key="i"
            :title="item.title"
          >
            <div class="notice-date">
              <p class="notice-day">18</p>
              <p class="notice-month">01月</p>
            </div>
            <div class="notice-title">
              <p>{{ item.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.news {
  width: 870px;
  height: 435px;
  background: white;
  border-radius: 4px;
  padding: 22px 44px;
  display: grid;
  grid-template-columns: 390px 340px;
  grid-gap: 52px;
}
.news-container {
  width: 100%;
  margin-top: 30px;
  padding-left: 14px;
  border-left: 2px solid #c7242f;
}
.news-container p {
  cursor: pointer;
  font-size: 20px;
  color: #505050;
  margin: 7px 0;
}
.notice-container {
  width: 100%;
  margin-top: 30px;
}
.notice-item {
  width: 100%;
  display: grid;
  grid-template-columns: 54px 266px;
  justify-content: space-between;
  margin: 10px 0;
  cursor: pointer;
}
.notice-date {
  border-right: 2px solid #c7242f;
  width: 54px;
}
.notice-day {
  font-size: 24px;
  color: #c7242f;
}
.notice-month {
  font-size: 12px;
  color: #c7242f;
}
.notice-title {
  display: flex;
  align-content: center;
  align-self: center;
}
.notice-title p {
  font-size: 20px;
  color: #505050;
  margin: 7px 0;
  vertical-align: middle;
}
</style>