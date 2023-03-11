<template>
  <div class="navTree noSelect">
    <div class="fixedNav">
      <img src="../assets/logo.png" class="logo" />
      <div class="navItems" @mouseleave="handleOut">
        <div
          class="navItem"
          v-for="(item, i) in navList"
          :key="i"
          @mouseover="handleHover(i)"
          @click="clickItem(item.url)"
        >
          <img
            :src="require(currentItem == i ? '_' + item.src : item.src)"
            class="navLogo"
          />
          <p
            class="navText"
            :style="hoverItem == i || currentItem == i ? 'color:#c7242f' : ''"
          >
            {{ item.title }}
          </p>
        </div>
        <div :class="'capsule' + (isResizing ? ' noTrans' : '')" ref="capsule">
          <Transition duration="550" name="nested">
            <div
              class="menu"
              v-if="showMenu && navList[hoverItem].children.length"
            >
              <div class="trueMenu">
                <p
                  class="menuItem"
                  v-for="(subItem, j) in navList[hoverItem].children"
                  :key="j"
                  @click="clickItem(subItem.url)"
                  :style="
                    $route.path.includes(subItem.url) ? 'color:#c7242f' : ''
                  "
                >
                  <span
                    :style="
                      $route.path.includes(subItem.url)
                        ? 'color:#c7242f;font-weight:700'
                        : 'font-weight:700'
                    "
                  >
                    · </span
                  >{{ subItem.title }}
                </p>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import require from "@/utils/pub-use";
export default {
  data() {
    return {
      defaultActive: "",
      currentItem: -1,
      hoverItem: -1,
      showMenu: false,
      isResizing: false,
      navList: [
        {
          title: "消息通知",
          src: "nav1.png",
          children: [],
        },
        {
          title: "站内信",
          src: "nav2.png",
          url: "/message/get",
          children: [
            {
              title: "收件箱",
              url: "/message/get",
            },
            {
              title: "发件箱",
              url: "/message/post",
            },
          ],
        },
        {
          title: "资源库",
          src: "nav3.png",
          url: "/resource/columnList",
          children: [
            {
              title: "栏目列表",
              url: "/resource/columnList",
            },
            {
              title: "文件列表",
              url: "/resource/fileList",
            },
          ],
        },
        {
          title: "网上党课学习",
          src: "nav4.png",
          url: "/lesson20/lesson20",
          children: [
            {
              title: "课程管理",
              url: "/lesson20/lesson20",
            },
            {
              title: "文章管理",
              url: "/lesson20/article20",
            },
            {
              title: "试题管理",
              url: "/lesson20/question20",
            },
          ],
        },
        {
          title: "考试与选课",
          src: "nav5.png",
          url: "/examinationAndClass/trainingSummary",
          children: [
            {
              title: "培训总表",
              url: "/examinationAndClass/trainingSummary",
            },
            {
              title: "入党申请人培训",
              url: "/examinationAndClass/applicantsTraining",
            },
            {
              title: "积极分子培训",
              url: "/examinationAndClass/activistsTraining",
            },
            {
              title: "预备党员培训",
              url: "/examinationAndClass/preparativeMembersTraining",
            },
            {
              title: "成绩管理",
              url: "/examinationAndClass/gradesManagement",
            },
            {
              title: "违纪管理",
              url: "/examinationAndClass/disciplinaryManagement",
            },
          ],
        },
        {
          title: "学生信息",
          src: "nav6.png",
          url: "/studentInfo/initStatue",
          children: [
            {
              title: "状态初始化",
              url: "/studentInfo/initStatue",
            },
            {
              title: "个人状态更改",
              url: "/studentInfo/personalStatue",
            },
          ],
        },
        {
          title: "支部管理",
          src: "nav7.png",
          url: "/branch/branchList",
          children: [
            {
              title: "支部列表",
              url: "/branch/branchList",
            },
          ],
        },
        {
          title: "首页管理",
          src: "nav8.png",
          url: "/homepage/swiper",
          children: [
            {
              title: "轮播图",
              url: "/homepage/swiper",
            },
            {
              title: "近期通知",
              url: "/homepage/notice",
            },
            {
              title: "推荐阅读",
              url: "/homepage/recommend",
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleHover(val) {
      this.hoverItem = val;
      this.showMenu = true;
      this.updatePlace();
    },
    handleOut() {
      this.hoverItem = this.currentItem;
      this.showMenu = false;
      this.updatePlace();
    },
    require(url) {
      return require(url);
    },
    clickItem(url) {
      this.currentItem = this.hoverItem;
      this.showMenu = false;
      this.$router.push(url);
    },
    updatePlace(val = false) {
      if (val) {
        this.isResizing = true;
        this.$refs.capsule.style.opacity = "0";
        this.$nextTick(() => {
          this.$refs.capsule.style.top = 5 * this.hoverItem + "rem";
          this.$refs.capsule.style.opacity = "1";
          setTimeout(() => {
            this.isResizing = false;
          }, 0);
        });
      } else {
        this.$refs.capsule.style.opacity = "1";
        this.$refs.capsule.style.top = 5 * this.hoverItem + "rem";
      }
    },
    updateItem() {
      for (let i = 0; i < this.navList.length; i++) {
        for (let j = 0; j < this.navList[i].children.length; j++) {
          if (this.$route.path.includes(this.navList[i].children[j].url)) {
            this.currentItem = i;
            this.hoverItem = i;
          }
        }
      }
    },
  },
  mounted() {
    this.updateItem();
    this.updatePlace(true);
  },
  watch: {
    $route(to, from) {
      this.updateItem();
      this.updatePlace(from.path === "/");
    },
  },
};
</script>

<style scoped>
.navTree {
  background-color: #ffffff;
  position: relative;
}
.fixedNav {
  position: fixed;
  width: 300px;
}
.logo {
  width: 234px;
  margin: 20px auto;
  margin-bottom: 60px;
  display: block;
  cursor: pointer;
}
.navItems {
  position: relative;
}
.navItem {
  height: 60px;
  display: flex;
  align-items: center;
  cursor: pointer;
  box-sizing: content-box;
  margin: 20px 24px;
  border-radius: 4px;
}
.navItem:hover {
  background-color: #fdebed;
}
.navLogo {
  width: 32px;
  height: 32px;
  margin-left: 40px;
  margin-right: 24px;
}
.navText {
  font-size: 20px;
}
.capsule {
  width: 8px;
  height: 60px;
  background-color: #f2404c;
  border-radius: 8px 0 0 8px;
  margin: 0;
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0;
  transition: all 0.5s;
}
.menu {
  padding-left: 40px;
  transform: translateY(-50%);
  top: 50%;
  position: relative;
}
.trueMenu {
  min-width: 220px;
  padding: 18px 0;
  background-color: #ffffff;
  transition: all 0.5s;
  border-radius: 8px;
}
.menuItem {
  font-size: 20px;
  margin: 10px;
  padding-left: 24px;
  cursor: pointer;
}
.menuItem:hover {
  color: #c7242f;
}
.nested-enter-active,
.nested-leave-active {
  transition: all 0.3s ease-in-out;
}
.nested-leave-active {
  transition-delay: 0.15s;
}
.nested-enter-from,
.nested-leave-to {
  transform: translateY(-50%) translateX(30px);
  opacity: 0;
}
.noTrans {
  transition: opacity 0.5s !important;
}
</style>

