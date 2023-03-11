<template>
  <div>
    <div
      class="top-row"
      v-if="
        !$route.params.id &&
        $route.path !== '/examinationAndClass/gradesManagement'
      "
    >
      <div
        :class="
          'sub-capsule tab statue-0 current' + (isResizing ? ' noTrans' : '')
        "
        ref="capsule"
      >
        {{ subTabList[tabIndex] }}
      </div>
      <div
        :class="'tab statue-0' + (tabIndex === i ? ' current' : '')"
        v-for="(item, i) in subTabList"
        :key="i"
        ref="tabs"
        @click="changeUrl(i)"
      >
        {{ item }}
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabIndex: 0,
      subTabList: ["全部", "入党申请人培训", "积极分子培训", "预备党员培训"],
      routeList: [
        "/examinationAndClass/trainingSummary",
        "/examinationAndClass/applicantsTraining",
        "/examinationAndClass/activistsTraining",
        "/examinationAndClass/preparativeMembersTraining",
      ],
      isResizing: false,
    };
  },
  methods: {
    changeUrl(val) {
      this.tabIndex = val;
      this.$router.push(this.routeList[val]);
      this.updateSize();
    },
    getPlace() {
      this.routeList.map((item, i) => {
        if (this.$route.path === item) {
          this.changeUrl(i);
        }
      });
    },
    updateSize() {
      this.$nextTick(() => {
        if (this.$refs.capsule) {
          this.$refs.capsule.style.width =
            this.$refs.tabs[this.tabIndex].clientWidth + "px";
          this.$refs.capsule.style.left =
            this.$refs.tabs[this.tabIndex].getBoundingClientRect().left -
            this.$refs.tabs[0].getBoundingClientRect().left +
            "px";
        }
      });
    },
    updateResize() {
      this.isResizing = true;
      this.$nextTick(() => {
        this.updateSize();
        setTimeout(() => {
          this.isResizing = false;
        }, 0);
      });
    },
  },
  watch: {
    $route() {
      this.getPlace();
    },
  },
  mounted() {
    this.getPlace();
    this.updateResize();
    window.addEventListener("resize", this.updateResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.updateResize);
  },
};
</script>

<style scoped>
.top-row {
  display: flex;
  justify-content: flex-start;
  width: max-content;
  background: #ffffff;
  border-radius: 12px;
  margin-top: 32px;
  position: relative;
}
.current {
  color: #c7242f;
  font-weight: 700 !important;
}
.sub-capsule {
  position: absolute;
  height: 100%;
  border-radius: 12px;
  background: #fdebed;
  transition: all 0.5s;
  white-space: nowrap;
}
.tab {
  display: inline-block;
  padding: 20px 48px;
  border-radius: 12px;
  font-size: 20px;
  cursor: pointer;
}
</style>