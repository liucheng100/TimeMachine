<script setup lang="ts">
import { ref } from "vue";
let currentTab = ref("tests");
let content = ref("");
let examName = ref("考试");
let centerDialogVisible = ref(false);
interface Test {
  name: string;
  date: string;
  able: boolean;
}
interface Grade {
  name: string;
  pass: boolean;
  grades: number;
}
const { tests, grades } = defineProps<{
  tests: Test[];
  grades: Grade[];
}>();
</script>
<template>
  <div class="exams">
    <el-tabs v-model="currentTab">
      <el-tab-pane label="考试报名" name="tests"
        ><div class="test-container">
          <div
            class="test-item"
            v-for="(item, i) in tests.slice(0, 4)"
            :key="i"
          >
            <div>
              <p
                class="test-name"
                :style="item.able ? '' : 'color: #9F9F9F !important;'"
              >
                {{ item.name }}
              </p>
              <p
                class="test-date"
                :style="item.able ? '' : 'color: #9F9F9F !important;'"
              >
                {{ item.date }}
              </p>
            </div>
            <div
              class="test-sign"
              :style="
                item.able
                  ? ''
                  : 'background-color:#FAFAFA !important;color: #9F9F9F !important;cursor: not-allowed;'
              "
              @click="
                () => {
                  item.able
                    ? (() => {
                        examName = item.name;
                        centerDialogVisible = true;
                      })()
                    : '';
                }
              "
            >
              报名
            </div>
          </div>
        </div></el-tab-pane
      >
      <el-tab-pane label="成绩查询" name="grades">
        <div class="query-container">
          <el-input
            v-model="content"
            class="query-input"
            placeholder="请输入需查询成绩"
            ><template #suffix>
              <img
                class="search-icon pointer"
                src="../assets/search.png"
              /> </template
          ></el-input>
          <div class="result-container">
            <template v-for="(item, i) in grades" :key="i">
              <p>{{ item.name }}</p>
              <p class="right-grid">
                <span>{{ item.grades }}</span> 分
              </p>
              <p class="right-grid">
                <span>{{ item.grades }}</span> 分
              </p>
              <div class="right-grid pass">
                <div></div>
                {{ item.pass ? "通过" : "未通过" }}
              </div>
            </template>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog v-model="centerDialogVisible" :show-close="false" center>
      <p class="dialog-content">是否确认报名 {{ examName }} ?</p>
      <template #footer>
        <div class="dialog-footer">
          <div class="cancelBtn pointer" @click="centerDialogVisible = false">
            取消
          </div>
          <div class="confirmBtn pointer" @click="centerDialogVisible = false">
            确认
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<style scoped>
.exams {
  width: 735px;
  height: 420px;
  background: white;
  border-radius: 4px;
  margin-top: 10px;
  padding: 30px 40px;
  overflow: hidden;
}
.test-container {
  margin-top: 25px;
}
.query-container {
  margin-top: 40px;
}
.query-input {
  margin-bottom: 30px;
}
.query-input :deep(.el-input__wrapper) {
  height: 44px;
  border-radius: 22px !important;
  background-color: #fafafa;
  box-shadow: none !important;
  padding: 9px 20px !important;
  font-size: 20px;
}
.query-input :deep(.el-input__inner) {
  color: #000000 !important;
}
.test-name {
  font-size: 20px;
  color: #505050;
}
.test-date {
  font-size: 16px;
  margin-top: 4px;
  color: #c7242f;
}
.test-item {
  display: grid;
  grid-template-columns: 560px 90px;
  margin: 15px 0;
  align-items: center;
}
.test-sign {
  width: 90px;
  height: 40px;
  background: #fdebed;
  border-radius: 20px;
  line-height: 40px;
  cursor: pointer;
  color: #c7242f;
  text-align: center;
}
.search-icon {
  width: 32px;
  height: 32px;
}
.result-container {
  margin: 10px;
  display: grid;
  align-items: center;
  row-gap: 18px;
  grid-template-columns: 240px 120px 120px auto;
}
.result-container p {
  font-size: 20px;
  color: #000000;
}
.result-container span {
  color: #c7242f;
}
.pass {
  background: #fafafa;
  border-radius: 15px;
  padding: 3px 15px;
}
.pass div {
  width: 6px;
  height: 6px;
  border-radius: 3px;
  display: inline-block;
  margin-right: 5px;
  vertical-align: middle;
  background-color: #21b339;
}
.right-grid {
  justify-self: end;
}
</style>