<template>
  <div id="swiper" class="swiper">
    <div class="box">
      <div class="list title">
        <div>序号</div>
        <div>标题</div>
        <div><div class="btn0">操作</div></div>
      </div>
      <div
        :style="{
          transition: transOX
            ? `height .18s linear,background-color .1s, transform ${transdur}s ease`
            : 'height .18s linear,background-color .1s',
        }"
        :ref="`item` + i"
        :class="{ list: true, item: true, 'item-hover': i == cur }"
        @mouseenter="mouseenter($event, i)"
        @mouseleave="mouseleave($event)"
        v-for="(o, i) in assets"
        :key="o.id"
      >
        <div>
          {{ i + 1 }}
        </div>
        <div>
          <div v-if="i != cur" class="singleLine">{{ o.title }}</div>
          <FullView v-if="i == cur" :content="o.title" />
        </div>
        <div>
          <div @click="ontop(i)" class="btn">
            置顶
            <VividClick />
          </div>
          <div class="btn">
            编辑
            <VividClick />
          </div>
          <div class="btn delete">
            删除
            <VividClick />
          </div>
        </div>
      </div>
      <div class="add" @click="openPopup">
        <div class="addT">+</div>
        <VividClick />
      </div>
    </div>
    <div class="mask" v-if="maskOX"></div>
    <Popup @destroy="popupOX = false" v-if="popupOX" />
  </div>
</template>
  
<script>
import VividClick from "@/components/ljc/VividClick.vue";
import FullView from "@/components/ljc/FullView.vue";
import Popup from "@/components/ljc/swiper/Popup.vue";
import request from "@/utils/pub-use.ts";

import { getNotices } from "@/api/notice.ts";
export default {
  components: {
    VividClick,
    FullView,
    Popup,
  },
  data() {
    return {
      cur: -1,
      timeStamp: 0,
      timeouter: null,
      maskOX: false,
      transOX: true,
      transdur: 0.42,
      popupOX: false,
      assets: [
        {
          id: 1,
          img: request("yctf/1.jpeg"),
          title:
            "今安徽覅发电公司地方多少分山东分公司好的办法开机费发动机和城乡环卫",
        },
        {
          id: 2,
          img: request("yctf/2.jpeg"),
          title: "今安徽覅好的办法开机费发动机和城乡环卫",
        },
        {
          id: 3,
          img: request("yctf/3.jpeg"),
          title:
            "今安徽覅好的办法开机费发动机和城乡环卫今安徽覅好的办法开机费发动机和城乡环卫",
        },
        {
          id: 4,
          img: request("yctf/4.jpeg"),
          title: "今安徽覅好的办法开机费发动机和城乡环卫",
        },
        {
          id: 5,
          img: request("yctf/5.png"),
          title:
            "今安徽覅好的办法开机费发动机和城乡环卫今安徽覅好的办法开机费发动机和城乡环卫今安徽覅好的办法开机费发动机和城乡环卫",
        },
      ],
    };
  },
  methods: {
    openPopup() {
      this.popupOX = true;
      document.getElementById("swiper").scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    },
    ontop(index) {
      index = parseInt(index);
      this.maskOX = true;
      // console.log(this.$refs['item'+index],index)
      // this.$refs['item'+index][0].style.transform = `translateY(-${2*(index-1)*7+(index-1)*90}px)`
      this.$refs["item" + index][0].style.transform = `translateY(-${
        this.$refs["item" + index][0].offsetTop -
        this.$refs["item0"][0].offsetTop
      }px)`;

      for (let i = 0; i < index; i++) {
        setTimeout(() => {
          console.log((1 / (i + 1)) * 280);
          this.$refs["item" + i][0].style.transform = `translateY(${
            this.$refs["item" + index][0].offsetHeight +
            this.$refs["item1"][0].offsetTop -
            this.$refs["item0"][0].offsetTop -
            this.$refs["item0"][0].offsetHeight
          }px)`;
        }, (1 / (i + 1)) * 240);
      }
      // 模拟
      setTimeout(() => {
        this.transOX = false;
        this.cur = 0;
        // 交换数据
        this.assets.unshift(this.assets.splice(index, 1)[0]);
        for (let ii = 0; ii <= index; ii++) {
          this.$refs["item" + ii][0].style.transform = "unset";
        }
        this.maskOX = false;
        setTimeout(() => {
          this.transOX = true;
        }, 60);
      }, 1000);
    },
    mouseenter(e, index) {
      this.timeStamp = e.timeStamp;
      this.timeouter = setTimeout(() => {
        this.cur = index;
      }, 150);
    },
    mouseleave(e) {
      clearTimeout(this.timeouter);
    },
  },
  mounted() {
    getNotices().then((e) => {
      console.log(e);
      this.assets = e.data
    });
  },
};
</script>
    

<style scoped>
.swiper {
  position: relative;
  overflow: hidden;
  height: calc(100vh - 150px);
}
.box {
  /* display: flex;
  flex-direction: column; */
  /* background-color: blue; */
  padding: 20px 0;
  position: relative;

  height: 100%;
  overflow: overlay;
}

.box::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 0px;
  height: 0px;
}

.list {
  background-color: rgb(255, 255, 255);
  display: flex;
  align-items: center;
  /* border-radius: 20px; */
  padding: 0 10px 0 54px;
  /* box-shadow: 2px 2px rgba(0, 0, 0, 0.1); */
}

.item {
  /* margin: 7px 0; */
  height: 70px;
  /* border-radius: 20px; */
  /* box-shadow: 2px 2px rgba(0, 0, 0, 0.07); */
}
.item:hover {
  background-color: rgba(0, 0, 0, 0.02);
}
.item-hover {
  /* height: 70px; */
}
.title {
  height: 70px;
}
.add {
  margin-top: 20px;
  height: 68px;
  border-radius: 36px;
  box-shadow: 2px 2px rgba(0, 0, 0, 0.06);

  overflow: hidden;
  transition: background-color 0.36s;
  background-color: rgb(255, 255, 255);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.add:hover {
  background-color: rgba(0, 0, 0, 0.03);
  cursor: pointer;
}
.addT {
  display: flex;
  align-items: center;
  justify-content: center;
  /* font-weight: 700; */
  color: rgba(0, 0, 0, 0.5);
  font-size: 40px;
  user-select: none;
  /* transform: scale(1.1); */
  padding: 0 !important;

  /* transform: translate(-50%, -50%); */
}
.list > div:nth-child(1) {
  flex: 0.8;
  padding-right: 24px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.list > div:nth-child(2) {
  flex: 6.4;
  padding-right: 100px;
  overflow: hidden;
}
/* .list > div:nth-child(3) {
  flex: 2.5;
  padding-right: 40px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.item > div:nth-child(3) {
  height: 80%;
} */
.list > div:nth-child(3) {
  flex: 2.4;
  overflow: hidden;
  padding-right: 60px;
}
.item > div:nth-child(3) {
  justify-content: space-between;
  height: 100%;
  display: flex;
  align-items: center;
}
.thumb {
  cursor: pointer;
  border-radius: 6px;
  height: 100%;
  transition: opacity 0.3s;
}
.singleLine {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.btn0 {
  width: 90px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn {
  width: 90px;
  height: 48px;
  user-select: none;
  border-radius: 7px;
  /* border: solid 1px rgba(0, 0, 0, 0.05);
    box-shadow: 2px 2px rgba(0, 0, 0, 0.07); */
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.4s;
  position: relative;
}
.btn:hover {
  background-color: rgba(0, 0, 0, 0.03);
}
.delete {
  color: rgb(235, 10, 10);
}
.mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* background-color: rgba(0, 0, 0, 0.09); */
}
</style>