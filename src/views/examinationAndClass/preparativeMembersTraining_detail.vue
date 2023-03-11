<template>
  <div>
    <div class="title-bar">
      <div @click="goBack" class="back-btn noSelect"></div>
      <p class="detail-name">{{ examTitle }}</p>
    </div>
    <p class="text-title">状态管理</p>
    <div class="switch-bar">
      <div class="switch-item">
        <span>报名状态： </span>
        <el-switch
          v-model="state1"
          active-text="开启"
          inactive-text="关闭"
          :loading="loading1"
          @change="
            () => {
              loading1 = true;
              changeState();
            }
          "
          size="large"
        />
      </div>
      <div class="switch-item">
        <span>选课状态： </span>
        <el-switch
          v-model="state2"
          active-text="开启"
          inactive-text="关闭"
          :loading="loading2"
          @change="
            () => {
              loading2 = true;
              changeState();
            }
          "
          size="large"
        />
      </div>
      <div class="switch-item">
        <span>成绩查询： </span>
        <el-switch
          v-model="state3"
          active-text="开启"
          inactive-text="关闭"
          :loading="loading3"
          @change="
            () => {
              loading3 = true;
              changeState();
            }
          "
          size="large"
        />
      </div>
    </div>
    <p class="text-title">课程管理</p>
    <CourseTable />
    <p class="text-title">实践与论文</p>
    <el-button auto-insert-space @click="toGrades" class="redBtn"
      >成绩录入</el-button
    >
  </div>
</template>

<script>
import CourseTable from "@/components/CourseTable.vue";
import {
  getExamResults,
  getExam,
  getExcel,
  getCollegeStatue,
  getExamProbationary,
  postExamProbationary,
} from "../../api/examinationAndClass.ts";
export default {
  components: { CourseTable },
  data() {
    return {
      examTitle: "",
      hasInit: false,
      state1: false,
      state2: false,
      state3: false,
      loading1: true,
      loading2: true,
      loading3: true,
    };
  },
  methods: {
    toGrades() {
      this.$router.push(`${this.$route.path}/grades`);
    },
    getDetail() {
      if (this.$route.params.id) {
        getExam(this.$route.params.id).then(({ code: code, data: res }) => {
          if (code === 0) this.examTitle = res.name;
        });
        this.getState();
      }
    },
    getState() {
      getExamProbationary(this.$route.params.id).then(
        ({ code: code, data: res }) => {
          if (code === 0) {
            this.state1 = res[0];
            this.state2 = res[1];
            this.state3 = res[2];
            this.loading1 = false;
            this.loading2 = false;
            this.loading3 = false;
          }
        }
      );
    },
    changeState() {
      postExamProbationary(this.$route.params.id, [
        this.state1,
        this.state2,
        this.state3,
      ]).finally(() => {
        this.getState();
      });
    },
    goBack() {
      if (this.hasInit) {
        this.hasInit = false;
      } else {
        if (this.$router.options.history.state.back) {
          this.$router.back();
        } else {
          this.$router.push("/examinationAndClass/trainingSummary");
        }
      }
    },
  },
  watch: {
    $route() {
      this.getDetail();
    },
  },
  created() {
    this.getDetail();
  },
};
</script>

<style scoped>
.detail-name {
  font-size: 21px;
}
.text-title {
  font-size: 24px;
  margin: 15px 0;
  margin-bottom: 5px;
}
.switch-bar {
  display: flex;
  justify-content: flex-start;
}
.switch-item {
  display: flex;
  align-items: center;
  margin-left: 20px;
  margin-right: 40px;
}
.switch-item :deep(span) {
  font-size: 17px;
}
.title-bar {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
}
.back-btn {
  background: url("@/assets/back.svg") center center / 100% no-repeat;
  height: 40px;
  width: 40px;
  cursor: pointer;
  border-radius: 6px;
  margin-right: 20px;
}
.back-btn:active {
  filter: brightness(0.9);
}
</style>