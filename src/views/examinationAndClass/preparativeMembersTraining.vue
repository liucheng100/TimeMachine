<template>
  <div>
    <div class="topBar">
      <el-input
        v-model="search"
        placeholder="搜索关键词"
        size="large"
        class="topSearch"
      />
      <div class="confirm">
        <el-button auto-insert-space @click="toAdd" class="redBtn"
          >添加培训</el-button
        >
      </div>
    </div>
    <el-table
      :data="
        examList.filter(
          (data) =>
            !search ||
            ('第' + data.times + '期').includes(search.toLowerCase()) ||
            data.name.toLowerCase().includes(search.toLowerCase()) ||
            data.content.toLowerCase().includes(search.toLowerCase()) ||
            data.startTime.toLowerCase().includes(search.toLowerCase()) ||
            data.endTime.toLowerCase().includes(search.toLowerCase())
        )
      "
      header-cell-class-name="table-header"
      empty-text="暂无数据"
      style="width: 100%"
    >
      <el-table-column label="期数"
        ><template #default="scope">{{
          "第" + scope.row.times + "期"
        }}</template></el-table-column
      >
      <el-table-column prop="name" label="培训名称" />
      <el-table-column prop="content" label="培训内容" />
      <el-table-column prop="startTime" label="开始时间" sortable
        ><template #default="scope">{{
          scope.row.startTime.split(".")[0].split("T").join("  ")
        }}</template></el-table-column
      >
      <el-table-column prop="endTime" label="结束时间" sortable
        ><template #default="scope">{{
          scope.row.endTime.split(".")[0].split("T").join("  ")
        }}</template></el-table-column
      ><el-table-column align="center" label="操作">
        <template #default="scope">
          <el-button auto-insert-space @click="handlePreview(scope.row.id)"
            >查看</el-button
          >
          <el-popconfirm
            title="您确定要删除这场培训吗？"
            confirm-button-text="确认"
            cancel-button-text="取消"
            @confirm="handleDelete(scope.row.id)"
          >
            <template #reference>
              <el-button auto-insert-space class="redBtn">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <addExamDialogForkedFromLjc
      @destroy="addExamDialog = false"
      @refresh="getExamList"
      v-if="addExamDialog"
      :defaultType="2"
    />
  </div>
</template>

<script>
import addExamDialogForkedFromLjc from "@/components/lhw/addExamDialogForkedFromLjc.vue";
import { getExamList, deleteExam } from "../../api/examinationAndClass.ts";
export default {
  components: {
    addExamDialogForkedFromLjc,
  },
  data() {
    return {
      addExamDialog: false,
      types: ["入党申请人培训", "积极分子培训", "预备党员培训"],
      search: "",
      examList: [],
    };
  },
  methods: {
    toAdd() {
      this.addExamDialog = true;
    },
    handlePreview(val) {
      this.$router.push(`${this.$route.path}/${val}`);
    },
    handleDelete(id) {
      deleteExam(id).then(({ code: code, msg: msg }) => {
        if (code === 0) {
          ElMessage.success("删除培训成功！");
          this.getExamList();
        } else {
          ElMessage.error(msg);
        }
      });
    },
    getExamList() {
      getExamList().then(({ data: res }) => {
        this.examList = res.filter((data) => data.userType === 2);
      });
    },
  },
  created() {
    this.getExamList();
  },
};
</script>

<style scoped>
.topBar {
  margin-top: -50px;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;
  height: 50px;
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
.topSearch {
  width: 320px;
  --el-input-height: 30px;
  line-height: 140px !important;
  font-size: 17px !important;
}
</style>