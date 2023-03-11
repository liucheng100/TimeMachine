<template>
  <div>
    <div class="title-bar">
      <div @click="goBack" class="back-btn noSelect"></div>
      <p class="detail-name">{{ examTitle }}</p>
    </div>
    <div class="top-info">
      <div></div>
      <div class="right-action">
        <el-input
          v-model="search"
          placeholder="搜索关键词"
          size="large"
          class="topSearch"
        />
        <!-- <div class="confirm">
          <el-button auto-insert-space @click="toSave" class="redBtn"
            >保存</el-button
          >
        </div> -->
        <div class="confirm">
          <el-button
            auto-insert-space
            @click="toSubmit"
            class="redBtn"
            :loading="submitLoading"
            >提交</el-button
          >
        </div>
        <div class="confirm">
          <el-button auto-insert-space @click="toDownload" class="redBtn"
            >下载模板</el-button
          >
        </div>
        <el-upload
          action=""
          :limit="1"
          :on-change="handleUpload"
          :auto-upload="false"
          :file-list="fileList"
          :show-file-list="false"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        >
          <div class="confirm">
            <el-button auto-insert-space class="redBtn" :loading="uploadLoading"
              >导入</el-button
            >
          </div>
        </el-upload>
      </div>
    </div>
    <div class="errorInfo" v-if="errorData.length">
      <div
        class="my-el-message el-message--error"
        v-for="(item, i) in errorData"
        :key="i"
      >
        <i class="el-icon el-message__icon el-message-icon--error"
          ><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="currentColor"
              d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z"
            ></path>
          </svg>
        </i>
        <p class="el-message__content">{{ item }}</p>
      </div>
    </div>
    <el-table
      :data="
        examData.filter(
          (data) =>
            !search ||
            data.name.toLowerCase().includes(search.toLowerCase()) ||
            data.sno.toLowerCase().includes(search.toLowerCase()) ||
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
      <el-table-column type="index" width="50" />
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="学号" prop="sno"></el-table-column>
      <!-- <el-table-column label="专业" prop="major"></el-table-column> -->
      <el-table-column label="论文"
        ><template #default="scope">{{
          scope.row.detailScore.split(",")[0].slice(1)
        }}</template></el-table-column
      >
      <el-table-column label="实践"
        ><template #default="scope">{{
          scope.row.detailScore.split(",")[1]
        }}</template></el-table-column
      >
      <el-table-column label="笔试"
        ><template #default="scope">{{
          scope.row.detailScore.split(",")[2].split("]")[0]
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
  uploadExcelActivist,
  submitExcel,
} from "../../api/examinationAndClass.ts";
import { getCollege } from "../../api/studentInfo.ts";
export default {
  data() {
    return {
      errorData: [],
      examData: [],
      college: "",
      examTitle: "",
      collegeOptions: [],
      search: "",
      importId: 0,
      fileList: [],
      statueList: ["未通过", "通过", "缺考", "作弊", "缺考且作弊"],
      uploadLoading: false,
      submitLoading: false,
    };
  },
  methods: {
    toSave() {},
    toSubmit() {
      if (this.importId) {
        this.submitLoading = true;
        submitExcel(this.$route.params.id, this.importId)
          .then(({ code: code, msg: msg }) => {
            if (code === 0) {
              ElMessage.success(`提交成功！`);
              this.$router.push(this.$route.path.split("/grades")[0]);
            } else {
              ElMessage.error(msg);
            }
          })
          .finally(() => {
            this.submitLoading = false;
          });
      } else {
        ElMessage.warning("请先导入成绩数据哦~");
      }
    },
    toDownload() {
      let a = document.createElement("a");
      a.href = "./static/activists.xlsx";
      a.download = this.examTitle + " - 成绩录入模板.xlsx";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      a.remove();
    },
    toExport() {},
    handleUpload(file, fileLists) {
      this.uploadLoading = true;
      let formData = new FormData();
      formData.append("file", file.raw);
      uploadExcelActivist(formData)
        .then(({ code: code, data: data, msg: msg }) => {
          if (code === 0) {
            if (data.error?.length) {
              ElMessage.warning(`导入成功！但存在${data.error.length}个问题`);
            } else {
              ElMessage.success(`导入成功！`);
            }
            this.errorData = data.error;
            this.examData = data.list;
            this.importId = data.importId;
          } else {
            ElMessage.error(msg);
          }
        })
        .finally(() => {
          this.uploadLoading = false;
        });
    },
    getDetail() {
      if (this.$route.params.id) {
        getExam(this.$route.params.id).then(({ code: code, data: res }) => {
          if (code === 0) this.examTitle = res.name;
        });
      }
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
.my-el-message {
  --el-message-padding: 11.25px 14.25px;
  width: fit-content;
  max-width: calc(100% - 2rem);
  box-sizing: border-box;
  border-radius: var(--el-border-radius-base);
  border-width: var(--el-border-width);
  border-style: var(--el-border-style);
  border-color: var(--el-message-border-color);
  background-color: var(--el-message-bg-color);
  transition: opacity var(--el-transition-duration), transform 0.4s, top 0.4s;
  padding: var(--el-message-padding);
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.my-el-message .el-message-icon--error {
  color: var(--el-message-text-color);
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
  margin-left: 15px;
}
.topSearch,
.topSearch :deep(.select-trigger),
.topSearch :deep(.el-input) {
  width: 320px;
  height: 100%;
  --el-input-height: 30px;
  line-height: 140px !important;
  font-size: 17px !important;
  margin-right: 30px;
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
<style>
.el-upload,
.el-upload .confirm {
  height: 100%;
}
</style>