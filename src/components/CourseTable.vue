<template>
  <el-table
    :data="tableData"
    header-cell-class-name="table-header"
    empty-text="暂无数据"
    style="width: 100%"
  >
    <el-table-column prop="name" label="课程名称" />
    <el-table-column prop="content" label="课程类型" />
    <el-table-column prop="startTime" label="开课时间" sortable
      ><template #default="scope">{{
        scope.row.startTime.split(".")[0].split("T").join("  ")
      }}</template></el-table-column
    >
    <el-table-column prop="content" label="开课地点" />
    <el-table-column prop="content" label="主讲人/视频名称" />
    <el-table-column align="center" label="报名情况">
      <template #default="scope">
        <el-button auto-insert-space @click="handlePreview(scope.row.id)"
          >查看</el-button
        >
      </template>
    </el-table-column>
    <el-table-column align="center" label="成绩录入">
      <template #default="scope">
        <el-button auto-insert-space @click="handlePreview(scope.row.id)"
          >录入</el-button
        >
      </template>
    </el-table-column>
    <el-table-column align="center" label="补选">
      <template #default="scope">
        <el-button auto-insert-space @click="handlePreview(scope.row.id)"
          >补选</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: ["tableData"],
  data() {
    return {};
  },
};
</script>

<style scoped>
</style>