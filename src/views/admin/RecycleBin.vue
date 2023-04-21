<script setup>
import { ref, reactive, nextTick, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { contesting } from "@/api/contest";
import { getUnPass, pass } from "@/api/examine";
let page = ref(1);
let if_send = false;
const router = useRouter();
const FloatPanel = ref();
const Bottom = ref();
const top_change = reactive({ marginTop: 0 });
const card_info = reactive([]);
const multiplyInfo = ref(false);
const ON = ref(false);
const work_id = ref(0);

const isElementVisible = (el) => {
  const rect = el.getBoundingClientRect();
  const vWidth = window.innerWidth || document.documentElement.clientWidth;
  const vHeight = window.innerHeight || document.documentElement.clientHeight;
  if (
    rect.right < 0 ||
    rect.bottom < 0 ||
    rect.left > vWidth ||
    rect.top > vHeight
  ) {
    return false;
  }
  return true;
};

function setHeight() {
  if (isElementVisible(Bottom.value) && !if_send) {
    if_send = true;
    getUnPassNow();
  }
}

async function getUnPassNow() {
  const contestInfo = await contesting();
  const contestId = contestInfo.data.contestId;
  getUnPass(contestId, page.value, 8).then((res) => {
    if (res.data.length == 0) return;

    page.value++;
    if_send = false;

    res.data.forEach((item) => {
      if (multiplyInfo.value) item.is_multiply = true;
      else item.is_multiply = false;

      item.ref = "0";
      item.is_choose = false;

      card_info.push(ref(item));
    });
  });
}
onMounted(() => {
  top_change.marginTop = FloatPanel.value.offsetHeight + "px";
  getUnPassNow();
});

function multiply() {
  multiplyInfo.value = !multiplyInfo.value;
  card_info.forEach((item) => {
    item.value.is_multiply = !item.value.is_multiply;
  });

  nextTick(() => {
    top_change.marginTop = FloatPanel.value.offsetHeight + "px";
  });
}

function send() {
  multiply();
  let x = [];
  multiplyInfo.value = false;
  card_info.forEach((item) => {
    if (item.value.is_choose) x.push(item.value.workId);
  });
  pass(x)
    .then((res) => console.log(res))
    .then(location.reload());
}

function passSingleWork() {
  pass([work_id.value]).then((res) => location.reload());
}

function back() {
  router.push("/admin/ReviewSubmissions");
}
</script>

<template>
  <div class="review-submissions" @scroll="setHeight()">
    <div class="float-panel" ref="FloatPanel">
      <p class="back-page" @click="back()">&lt; 返回</p>
      <p class="page-title">回收站</p>
      <img
        src="@/assets/rotate-ccw.svg"
        class="icon-title"
        v-show="multiplyInfo"
        @click="send()"
      />
      <img
        src="@/assets/checkSquare_.svg"
        class="icon-title"
        v-show="!multiplyInfo"
        @click="multiply()"
      />
      <img
        src="@/assets/check.svg"
        class="icon-title"
        v-show="multiplyInfo"
        @click="multiply()"
      />
    </div>

    <div class="all-works" :style="top_change">
      <WorkCard
        v-for="(item, index) in card_info"
        :ref="item.value.ref"
        :key="item.value.workId"
        :WorkName="item.value.workTitle"
        :contestGroup="item.value.contestGroup"
        :Status="item.value.isPass"
        :is_choose="item.value.is_choose"
        :ViewVolume="item.value.views"
        :is_multiply="item.value.is_multiply"
        :info="item.value"
        :src="item.value.coverFile"
        @multi="card_info[index].value.is_choose = !item.value.is_choose"
        @back="(ON = true), (work_id = item.value.workId)"
      />
    </div>

    <div class="bottom" ref="Bottom"></div>

    <Pop
      :ON="ON"
      :model="0"
      title="确认要撤回作品吗?"
      tip="请确认信息无误"
      :options="{ black: '', grey: '取消', blue: '撤回' }"
      @blackClick="0"
      @greyClick="ON = false"
      @blueClick="passSingleWork()"
    >
    </Pop>
  </div>
</template>

<style scoped>
.review-submissions {
  padding-left: 20px;
  padding-right: 20px;
}

.float-panel {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-top: 20px;
  align-items: center;
  background: #ffffff;
  padding-bottom: 20px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
}

.back-page {
  width: 100%;
  font-size: 16px;
  margin-bottom: 10px;
  color: #4e46b4;
  font-weight: bold;
}

.multi-panel {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.multi-button {
  width: 28%;
  height: 40px;
  margin-top: 10px;
  font-size: 18px;
  color: #ffffff;
  border-radius: 5px;
  border: 0;
}

.page-title {
  font-size: 30px;
  font-weight: bold;
  width: 75%;
}

.icon-title {
  height: 28px;
}

.all-works {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: space-around;
  justify-content: space-between;
  margin-top: 25%;
}
.bottom {
  height: 5px;
}
</style>