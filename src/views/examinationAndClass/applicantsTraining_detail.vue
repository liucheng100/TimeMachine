<template>
  <div>
    <div class="title-bar">
      <div @click="goBack" class="back-btn noSelect"></div>
      <p class="detail-name">{{ examTitle }}</p>
    </div>
    <div class="top-info">
      <el-select
        v-model="college"
        size="large"
        placeholder="筛选学院"
        @change="changeCollege"
        class="topSearch"
        clearable
        ><el-option
          v-for="item in collegeOptions"
          :key="item.id"
          :label="item.collegeName"
          :value="item.id"
        />
      </el-select>
      <div class="right-action">
        <el-input
          v-model="search"
          placeholder="搜索关键词"
          size="large"
          class="topSearch"
        />
        <div class="confirm">
          <el-button auto-insert-space @click="toEnter" class="redBtn"
            >录入成绩</el-button
          >
        </div>
        <div class="confirm">
          <el-button auto-insert-space @click="toExport" class="redBtn"
            >导出数据</el-button
          >
        </div>
      </div>
    </div>
    <el-table
      :data="
        examData.filter(
          (data) =>
            !search ||
            data.name.toLowerCase().includes(search.toLowerCase()) ||
            data.sno.toLowerCase().includes(search.toLowerCase()) ||
            data.major.toLowerCase().includes(search.toLowerCase()) ||
            data.detailScore.toLowerCase().includes(search.toLowerCase()) ||
            (data.status === 1 ? '合格' : '不合格').includes(
              search.toLowerCase()
            ) ||
            (
              statueList[data.status] +
              (data.comments ? '（' + data.comments + '）' : '')
            )
              .toLowerCase()
              .includes(search.toLowerCase())
        )
      "
      header-cell-class-name="table-header"
      empty-text="暂无数据"
      style="width: 100%"
    >
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="学号" prop="sno"></el-table-column>
      <el-table-column label="专业" prop="major"></el-table-column>
      <el-table-column label="论文"
        ><template #default="scope">{{
          scope.row.detailScore.split(",")[0].slice(1)
        }}</template></el-table-column
      >
      <el-table-column label="考试"
        ><template #default="scope">{{
          scope.row.detailScore.split(",")[1].slice(1).split("]")[0]
        }}</template></el-table-column
      >
      <el-table-column label="状态">
        <template #default="scope">{{
          scope.row.status === 1 ? "合格" : "不合格"
        }}</template>
      </el-table-column>
      <el-table-column label="考试状态"
        ><template #default="scope">{{
          statueList[scope.row.status] +
          (scope.row.comments ? "（" + scope.row.comments + "）" : "")
        }}</template></el-table-column
      >
    </el-table>
  </div>
</template>

<script>
import {
  getExamResults,
  getExam,
  getExcel,
} from "../../api/examinationAndClass.ts";
import { getCollege } from "../../api/studentInfo.ts";
export default {
  data() {
    return {
      examData: [],
      college: "",
      examTitle: "",
      collegeOptions: [],
      search: "",
      statueList: ["未通过", "通过", "缺考", "作弊", "缺考且作弊"],
    };
  },
  methods: {
    toEnter() {
      this.$router.push(`${this.$route.path}/grades`);
    },
    toExport() {
      getExcel(this.$route.params.id).then((res) => {
        let result = res;
        let blob = new Blob([result], { type: "application/vnd.ms-excel" });
        let url = window.URL.createObjectURL(blob);
        let link = document.createElement("a");
        link.download = this.examTitle + "成绩统计数据.xls";
        link.href = url;
        link.click();
      });
    },
    changeCollege(val) {
      getExamResults(this.$route.params.id, val || -1).then(
        ({ code: code, data: res }) => {
          if (code === 0) this.examData = res;
        }
      );
    },
    getDetail() {
      if (this.$route.params.id) {
        getExam(this.$route.params.id).then(({ code: code, data: res }) => {
          if (code === 0) this.examTitle = res.name;
        });
        getExamResults(this.$route.params.id, this.college || -1).then(
          ({ code: code, data: res }) => {
            if (code === 0) this.examData = res;
          }
        );
      }
      getCollege().then(({ code: code, data: res }) => {
        if (code === 0) this.collegeOptions = res;
      });
    },
    goBack() {
      if (this.$router.options.history.state.back) {
        this.$router.back();
      } else {
        this.$router.push("/examinationAndClass/trainingSummary");
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
.top-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  height: 50px;
}
.right-action {
  display: flex;
  justify-content: flex-end;
}
.confirm :deep(.el-button) {
  background: #c7242f;
  border-radius: 10px;
  padding: 0 20px;
  height: 100%;
  font-size: 18px;
  color: #ffffff;
  display: inline-block;
  margin-left: 45px;
}
.topSearch,
.topSearch :deep(.select-trigger),
.topSearch :deep(.el-input) {
  width: 320px;
  height: 100%;
  --el-input-height: 30px;
  line-height: 140px !important;
  font-size: 17px !important;
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