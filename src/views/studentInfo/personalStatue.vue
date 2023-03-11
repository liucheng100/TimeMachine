<template>
  <div>
    <div class="topBar">
      <el-input
        v-model="schoolNumber"
        size="large"
        class="numberInput"
        placeholder="输入学号"
      />
      <div class="confirm">
        <el-button auto-insert-space @click="toSearch" class="redBtn"
          >查询</el-button
        >
      </div>
    </div>
    <div class="mainView">
      <el-table
        :data="
          processMap.filter(
            (data) =>
              !search || data.name.toLowerCase().includes(search.toLowerCase())
          )
        "
        border
        empty-text="暂无数据"
        style="width: 100%"
      >
        <el-table-column align="center" prop="name" label="入党流程" />
        <el-table-column align="center" label="类型"
          ><template #default="scope">{{
            types[scope.row.type]
          }}</template></el-table-column
        ><el-table-column align="center" label="状态"
          ><template #default="scope">{{
            scope.row.statue ? "通过" : "未通过"
          }}</template></el-table-column
        >
        <el-table-column align="center" prop="remark" label="备注" />
        <el-table-column align="center">
          <template #header>
            <el-input v-model="search" placeholder="搜索关键词" />
          </template>
          <template #default="scope">
            <a v-for="(item, i) in scope.row.action" :key="i">{{ item }}</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getUserId } from "../../api/user.ts";
import { getProcess } from "../../api/studentInfo.ts";
export default {
  data() {
    return {
      schoolNumber: "",
      search: "",
      statusList: [],
      types: ["状态类", "文件类", "成绩类"],
      processMap: [
        {
          name: "递交入党申请书",
          type: 1,
          statue: 1,
          remark: "通过：1篇",
          action: ["查看文件"],
        },
        {
          name: "参加入党申请人学习小组",
          type: 0,
          statue: 1,
          remark: "组长：xx",
          action: [],
        },
        {
          name: "群团组织推优",
          type: 0,
          statue: 1,
          remark: "",
          action: [],
        },
        {
          name: "通过网上申请人培训",
          type: 2,
          statue: 1,
          remark: "通过：20课",
          action: [],
        },
        {
          name: "支委会审议并上报党委备案",
          type: 0,
          statue: 1,
          remark: "",
          action: [],
        },
        {
          name: "入党积极分子",
          type: 0,
          statue: 1,
          remark: "",
          action: [],
          highlight: true,
        },
        {
          name: "通过院级积极分子培训",
          type: 2,
          statue: 1,
          remark: "论文：80\n笔试：70",
          action: [],
        },
        {
          name: "按季度递交思想汇报",
          type: 1,
          statue: 1,
          remark: "通过：4篇",
          action: ["查看文件"],
        },
        {
          name: "确定培养联系人",
          type: 0,
          statue: 1,
          remark: "联系人：xxx",
          action: [],
        },
        {
          name: "支部考察",
          type: 1,
          statue: 1,
          remark: "通过：2次",
          action: ["考察通过"],
        },
        {
          name: "听取党员意见",
          type: 0,
          statue: 1,
          remark: "",
          action: [],
        },
        {
          name: "征求群众意见",
          type: 0,
          statue: 1,
          remark: "",
          action: [],
        },
        {
          name: "征求党小组、培养联系人意见",
          type: 0,
          statue: 1,
          remark: "",
          action: [],
        },
        {
          name: "支委会讨论决定并上报上级党委备案",
          type: 0,
          statue: 1,
          remark: "",
          action: [],
        },
        {
          name: "发展对象",
          type: 0,
          statue: 1,
          remark: "",
          action: [],
          highlight: true,
        },
        {
          name: "确定2名正式党员为入党介绍人",
          type: 0,
          statue: 1,
          remark: "入党介绍人：xxx xxx",
          action: [],
        },
        {
          name: "撰写个人自传、政审",
          type: 2,
          statue: 1,
          remark: "通过：1篇",
          action: ["查看文件"],
        },
        {
          name: "通过发展对象党校培训",
          type: 0,
          statue: 1,
          remark: "",
          action: [],
        },
        {
          name: "材料齐全",
          type: 0,
          statue: 1,
          remark: "",
          action: [],
        },
        {
          name: "支部综合审查",
          type: 0,
          statue: 1,
          remark: "",
          action: [],
        },
        {
          name: "上级党委预审并公示",
          type: 0,
          statue: 1,
          remark: "",
          action: [],
        },
        {
          name: "填写入党申请书",
          type: 1,
          statue: 1,
          remark: "通过：1篇",
          action: ["查看文件"],
        },
        {
          name: "党员发展大会",
          type: 0,
          statue: 1,
          remark: "",
          action: [],
        },
        {
          name: "党委谈话、审批",
          type: 0,
          statue: 1,
          remark: "",
          action: [],
        },
        {
          name: "报再上一级党委组织部门备案",
          type: 0,
          statue: 1,
          remark: "",
          action: [],
        },
        {
          name: "中共预备党员",
          type: 0,
          statue: 1,
          remark: "",
          action: [],
          highlight: true,
        },
        {
          name: "入党宣誓",
          type: 0,
          statue: 0,
          remark: "",
          action: [],
        },
        {
          name: "通过预备党员培训",
          type: 2,
          statue: 0,
          remark: "实践：\n论文：\n必修课：\n选修课：",
          action: [],
        },
        {
          name: "季度递交个人小结",
          type: 1,
          statue: 0,
          remark: "通过：",
          action: ["查看文件"],
        },
        {
          name: "参加组织生活",
          type: 0,
          statue: 0,
          remark: "",
          action: ["考察通过"],
        },
        {
          name: "支部按季度进行考察",
          type: 0,
          statue: 0,
          remark: "通过：",
          action: [],
        },
        {
          name: "提出转正申请",
          type: 0,
          statue: 0,
          remark: "",
          action: [],
        },
        {
          name: "征求党员、群众意见",
          type: 0,
          statue: 0,
          remark: "",
          action: [],
        },
        {
          name: "听取党小组、入党介绍人意见",
          type: 0,
          statue: 0,
          remark: "",
          action: [],
        },
        {
          name: "转正公示",
          type: 0,
          statue: 0,
          remark: "",
          action: [],
        },
        {
          name: "转正大会",
          type: 0,
          statue: 0,
          remark: "",
          action: [],
        },
        {
          name: "党委审批",
          type: 0,
          statue: 0,
          remark: "",
          action: [],
        },
        {
          name: "支部书记谈话",
          type: 0,
          statue: 0,
          remark: "",
          action: [],
        },
        {
          name: "中共党员",
          type: 0,
          statue: 0,
          remark: "",
          action: [],
          highlight: true,
        },
      ],
    };
  },
  methods: {
    toSearch() {
      if (!this.schoolNumber) {
        ElMessage.warning("请输入学号");
        return;
      }
      getUserId(this.schoolNumber).then(({ data: res }) => {
        if (res) {
          getProcess(res).then((res) => {
            ElMessage.success("获取学生信息成功");
            console.log(res);
          });
        } else {
          ElMessage.warning("获取学生信息失败，请检查输入的学号");
        }
      });
    },
  },
};
</script>

<style scoped>
.topBar {
  display: flex;
  justify-content: center;
}
.confirm :deep(.el-button) {
  background: #c7242f;
  border-radius: 10px;
  padding: 0 30px;
  height: 100%;
  font-size: 18px;
  color: #ffffff;
  display: inline-block;
  margin-left: 45px;
}
.numberInput {
  text-align: center;
  width: 500px;
  --el-input-height: 50px;
  line-height: 160px !important;
  font-size: 22px !important;
}
.numberInput :deep(.el-input__inner) {
  text-align: center;
}
.mainView {
  margin-top: 40px;
}
</style>