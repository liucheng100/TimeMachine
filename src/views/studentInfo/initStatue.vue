<template>
  <div>
    <div class="topBar">
      <el-cascader
        v-model="cascaderValue"
        :options="cascaderOptions"
        class="large-select"
        placeholder="请选择对象"
      />
      <div class="confirm">
        <el-button auto-insert-space @click="toSearch" class="redBtn"
          >查询</el-button
        >
      </div>
    </div>
    <div class="classes">
      <transition name="ani4">
        <table class="class-items" v-if="classes.length !== 0">
          <td
            :class="'class-item border-type-' + (i % 3)"
            v-for="(item, i) in classes"
            :key="i"
            :style="
              selectedClass[item.classId]
                ? 'background-color:#c7242f;color:#fff'
                : ''
            "
            @click="clickClass(item.classId)"
          >
            {{ item.className }}
          </td>
        </table>
      </transition>
      <p class="no-data" v-if="classes.length === 0">
        {{ isSearching ? "加载中……" : "暂未选择对象" }}
      </p>
      <transition name="ani4">
        <div class="students" v-if="studentTableData.length">
          <div v-for="(item, i) in studentTableData" :key="i">
            <p class="className">{{ item.classVo.className }}</p>
            <el-table
              stripe
              ref="multipleTableRef"
              :data="item.studentList"
              style="width: 100%"
              @selection-change="
                (val) => {
                  multipleSelection[i] = val;
                }
              "
              @row-click="handleRowClick"
              header-cell-class-name="table-header"
            >
              <el-table-column type="selection" width="55" :key="i" />
              <el-table-column property="stuNum" label="学号" :key="i" />
              <el-table-column property="uname" label="姓名" :key="i" />
              <el-table-column property="collegeName" label="学院" :key="i" />
              <el-table-column property="majorName" label="专业" :key="i" />
            </el-table>
          </div>
        </div>
      </transition>
    </div>
    <div class="mainView">
      <div class="graphBar">
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
      <div class="graphMain">
        <div class="chart-main" @scroll="updatePlace" id="chart">
          <div class="chart">
            <!-- 第一部分 -->
            <div
              :class="
                (statueList[0] ? 'statue-3' : 'statue-0') +
                ' square noSelect shadow step-1 tab-home'
              "
              @click="changeStatue(0)"
              id="tabHome0"
            >
              <div class="tab-point" id="tab0"></div>
              <div class="dot-0" v-if="!statueList[0]"></div>
              递交入党申请书
            </div>
            <div class="line-v"></div>
            <div
              :class="
                (statueList[1] ? 'statue-3' : 'statue-0') +
                ' capsule noSelect shadow step-2'
              "
              @click="changeStatue(1)"
            >
              <img
                class="img-1"
                src="../../assets/party-icon-2.png"
                v-if="!statueList[1]"
              />
              <img class="img-1" src="../../assets/party-icon.png" v-else />
              入党申请人
            </div>
            <div class="line-v"></div>
            <div
              :class="
                (statueList[2] ? 'statue-3' : 'statue-0') +
                ' square noSelect shadow step-3'
              "
              @click="changeStatue(2)"
            >
              <div class="dot-0" v-if="!statueList[2]"></div>
              参加入党申请人学习小组
            </div>
            <div class="line-v">
              <div class="polygon-1"></div>
              <div class="polygon-2"></div>
            </div>
            <div class="square-line-c">
              <div
                :class="
                  (statueList[3] ? 'statue-3' : 'statue-0') +
                  ' square noSelect shadow step-4-1'
                "
                @click="changeStatue(3)"
              >
                <div class="dot-0" v-if="!statueList[3]"></div>
                群团组织推优
              </div>
              <div
                :class="
                  (statueList[4] ? 'statue-3' : 'statue-0') +
                  ' square noSelect shadow step-4-2'
                "
                @click="changeStatue(4)"
              >
                <div class="dot-0" v-if="!statueList[4]"></div>
                通过网上申请人培训
              </div>
            </div>
            <div class="line-v">
              <div class="polygon-1"></div>
              <div class="polygon-2"></div>
            </div>
            <div
              :class="
                (statueList[5] ? 'statue-3' : 'statue-0') +
                ' square noSelect shadow step-5'
              "
              @click="changeStatue(5)"
            >
              <div class="dot-0" v-if="!statueList[5]"></div>
              支委会(支部大会) 审议并上报党委备案
            </div>
            <div class="line-v"></div>
            <div
              :class="
                (statueList[6] ? 'statue-3' : 'statue-0') +
                ' capsule noSelect shadow step-3'
              "
              @click="changeStatue(6)"
            >
              <img
                class="img-2"
                src="../../assets/party-icon-2.png"
                v-if="!statueList[6]"
              />
              <img class="img-2" src="../../assets/party-icon.png" v-else />
              入党积极分子
            </div>
            <!-- 第二部分 -->

            <div
              :class="
                (statueList[6] ? 'statue-3' : 'statue-0') +
                ' capsule noSelect shadow step-b-1 tab-home'
              "
              @click="changeStatue(6)"
              id="tabHome1"
            >
              <div class="tab-point" id="tab1"></div>
              <img
                class="img-2"
                src="../../assets/party-icon-2.png"
                v-if="!statueList[6]"
              />
              <img class="img-2" src="../../assets/party-icon.png" v-else />
              入党积极分子
            </div>
            <div class="line-v">
              <div class="polygon-1"></div>
              <div class="polygon-2"></div>
            </div>
            <div class="square-line-c-3">
              <div class="line-v-sub"></div>
              <div
                :class="
                  (statueList[7] ? 'statue-3' : 'statue-0') +
                  ' square noSelect shadow step-4-1 offset-1'
                "
                @click="changeStatue(7)"
              >
                <div class="dot-0" v-if="!statueList[7]"></div>
                通过院级积极分子培训
              </div>
              <div
                :class="
                  (statueList[8] ? 'statue-3' : 'statue-0') +
                  ' square noSelect shadow step-4-0 offset-1'
                "
                @click="changeStatue(8)"
              >
                <div class="dot-0" v-if="!statueList[8]"></div>
                按季度递交思想汇报
              </div>
              <div
                :class="
                  (statueList[9] ? 'statue-3' : 'statue-0') +
                  ' square noSelect shadow step-4-2 offset-1'
                "
                @click="changeStatue(9)"
              >
                <div class="dot-0" v-if="!statueList[9]"></div>
                确定培养联系人
              </div>
              <div
                :class="
                  (statueList[10] ? 'statue-3' : 'statue-0') +
                  ' square noSelect shadow step-4-3'
                "
                @click="changeStatue(10)"
              >
                <div class="dot-0" v-if="!statueList[10]"></div>
                支部考察
              </div>
            </div>
            <div class="line-v">
              <div class="polygon-1"></div>
              <div class="polygon-2"></div>
            </div>
            <div class="square-line-c-3-b">
              <div class="line-v-sub"></div>
              <div
                :class="
                  (statueList[11] ? 'statue-3' : 'statue-0') +
                  ' square noSelect shadow step-4-1'
                "
                @click="changeStatue(11)"
              >
                <div class="dot-0" v-if="!statueList[11]"></div>
                听取党员意见
              </div>
              <div
                :class="
                  (statueList[12] ? 'statue-3' : 'statue-0') +
                  ' square noSelect shadow step-4-0'
                "
                @click="changeStatue(12)"
              >
                <div class="dot-0" v-if="!statueList[12]"></div>
                征求群众意见
              </div>
              <div
                :class="
                  (statueList[13] ? 'statue-3' : 'statue-0') +
                  ' square noSelect shadow step-4-2'
                "
                @click="changeStatue(13)"
              >
                <div class="dot-0" v-if="!statueList[13]"></div>
                征求党小组、培养联系人意见
              </div>
            </div>
            <div class="line-v">
              <div class="polygon-1"></div>
              <div class="polygon-2"></div>
            </div>
            <div
              :class="
                (statueList[14] ? 'statue-3' : 'statue-0') +
                ' square noSelect shadow step-5'
              "
              @click="changeStatue(14)"
            >
              <div class="dot-0" v-if="!statueList[14]"></div>
              支委会(支部大会) 讨论决定并上报上级党委备案
            </div>
            <div class="line-v"></div>
            <div
              :class="
                (statueList[15] ? 'statue-3' : 'statue-0') +
                ' capsule noSelect shadow step-3'
              "
              @click="changeStatue(15)"
            >
              <img
                class="img-2"
                src="../../assets/party-icon-2.png"
                v-if="!statueList[15]"
              />
              <img class="img-2" src="../../assets/party-icon.png" v-else />
              发展对象
            </div>
            <!-- 第三部分 -->
            <div
              :class="
                (statueList[15] ? 'statue-3' : 'statue-0') +
                ' capsule noSelect shadow step-b-1 tab-home'
              "
              @click="changeStatue(15)"
              id="tabHome2"
            >
              <div class="tab-point" id="tab2"></div>
              <img
                class="img-2"
                src="../../assets/party-icon-2.png"
                v-if="!statueList[15]"
              />
              <img class="img-2" src="../../assets/party-icon.png" v-else />
              发展对象
            </div>
            <div class="line-v">
              <div class="polygon-1"></div>
              <div class="polygon-2"></div>
            </div>
            <div class="square-line-c-2">
              <div
                :class="
                  (statueList[16] ? 'statue-3' : 'statue-0') +
                  ' square noSelect shadow step-4-1 offset-1'
                "
                @click="changeStatue(16)"
              >
                <div class="dot-0" v-if="!statueList[16]"></div>
                确定2名正式党员为入党介绍人
              </div>
              <div
                :class="
                  (statueList[17] ? 'statue-3' : 'statue-0') +
                  ' square noSelect shadow step-4-2 offset-1'
                "
                @click="changeStatue(17)"
              >
                <div class="dot-0" v-if="!statueList[17]"></div>
                撰写个人自传、政审
              </div>
              <div
                :class="
                  (statueList[18] ? 'statue-3' : 'statue-0') +
                  ' square noSelect shadow step-4-4'
                "
                @click="changeStatue(18)"
              >
                <div class="dot-0" v-if="!statueList[18]"></div>
                通过发展对象党校培训
              </div>
              <div
                :class="
                  (statueList[19] ? 'statue-3' : 'statue-0') +
                  ' square noSelect shadow step-4-3'
                "
                @click="changeStatue(19)"
              >
                <div class="dot-0" v-if="!statueList[19]"></div>
                材料齐全
              </div>
            </div>
            <div class="line-v">
              <div class="polygon-1"></div>
              <div class="polygon-2"></div>
            </div>
            <div
              :class="
                (statueList[20] ? 'statue-3' : 'statue-0') +
                ' square noSelect shadow'
              "
              @click="changeStatue(20)"
            >
              <div class="dot-0" v-if="!statueList[20]"></div>
              支部综合审查
            </div>
            <div class="line-v"></div>
            <div
              :class="
                (statueList[21] ? 'statue-3' : 'statue-0') +
                ' square noSelect shadow'
              "
              @click="changeStatue(21)"
            >
              <div class="dot-0" v-if="!statueList[21]"></div>
              上级党委预审并公示
            </div>
            <div class="line-v"></div>
            <div
              :class="
                (statueList[22] ? 'statue-3' : 'statue-0') +
                ' square noSelect shadow'
              "
              @click="changeStatue(22)"
            >
              <div class="dot-0" v-if="!statueList[22]"></div>
              填写入党申请书
            </div>
            <div class="line-v"></div>
            <div
              :class="
                (statueList[23] ? 'statue-3' : 'statue-0') +
                ' square noSelect shadow'
              "
              @click="changeStatue(23)"
            >
              <div class="dot-0" v-if="!statueList[23]"></div>
              党员发展大会
            </div>
            <div class="line-v"></div>
            <div
              :class="
                (statueList[24] ? 'statue-3' : 'statue-0') +
                ' square noSelect shadow'
              "
              @click="changeStatue(24)"
            >
              <div class="dot-0" v-if="!statueList[24]"></div>
              党委谈话、审批
            </div>
            <div class="line-v"></div>
            <div
              :class="
                (statueList[25] ? 'statue-3' : 'statue-0') +
                ' square noSelect shadow'
              "
              @click="changeStatue(25)"
            >
              <div class="dot-0" v-if="!statueList[25]"></div>
              报再上一级党委组织部门备案
            </div>
            <div class="line-v"></div>
            <div
              :class="
                (statueList[26] ? 'statue-3' : 'statue-0') +
                ' capsule noSelect shadow step-3'
              "
              @click="changeStatue(26)"
            >
              <img
                class="img-2"
                src="../../assets/party-icon-2.png"
                v-if="!statueList[26]"
              />
              <img class="img-2" src="../../assets/party-icon.png" v-else />
              中共预备党员
            </div>
            <!-- 第四部分 -->
            <div
              :class="
                (statueList[26] ? 'statue-3' : 'statue-0') +
                ' capsule noSelect shadow step-b-1 tab-home'
              "
              @click="changeStatue(26)"
              id="tabHome3"
            >
              <div class="tab-point" id="tab3"></div>
              <img
                class="img-2"
                src="../../assets/party-icon-2.png"
                v-if="!statueList[26]"
              />
              <img class="img-2" src="../../assets/party-icon.png" v-else />
              中共预备党员
            </div>
            <div class="line-v"></div>
            <div
              :class="
                (statueList[27] ? 'statue-3' : 'statue-0') +
                ' square noSelect shadow'
              "
              @click="changeStatue(27)"
            >
              <div class="dot-0" v-if="!statueList[27]"></div>
              入党宣誓
            </div>
            <div class="line-v">
              <div class="polygon-1"></div>
              <div class="polygon-2"></div>
            </div>
            <div class="square-line-c-3">
              <div class="line-v-sub"></div>
              <div
                :class="
                  (statueList[28] ? 'statue-3' : 'statue-0') +
                  ' square noSelect shadow step-4-1 offset-1'
                "
                @click="changeStatue(28)"
              >
                <div class="dot-0" v-if="!statueList[28]"></div>
                通过预备党员培训
              </div>
              <div
                :class="
                  (statueList[29] ? 'statue-3' : 'statue-0') +
                  ' square noSelect shadow step-4-0 offset-1'
                "
                @click="changeStatue(29)"
              >
                <div class="dot-0" v-if="!statueList[29]"></div>
                季度递交个人小结
              </div>
              <div
                :class="
                  (statueList[30] ? 'statue-3' : 'statue-0') +
                  ' square noSelect shadow step-4-2 offset-1'
                "
                @click="changeStatue(30)"
              >
                <div class="dot-0" v-if="!statueList[30]"></div>
                参加组织生活
              </div>
              <div
                :class="
                  (statueList[31] ? 'statue-3' : 'statue-0') +
                  ' square noSelect shadow step-4-3'
                "
                @click="changeStatue(31)"
              >
                <div class="dot-0" v-if="!statueList[31]"></div>
                支部按季度进行考察
              </div>
            </div>
            <div class="line-v">
              <div class="polygon-1"></div>
              <div class="polygon-2"></div>
            </div>
            <div
              :class="
                (statueList[32] ? 'statue-3' : 'statue-0') +
                ' square noSelect shadow'
              "
              @click="changeStatue(32)"
            >
              <div class="dot-0" v-if="!statueList[32]"></div>
              提出转正申请
            </div>
            <div class="line-v">
              <div class="polygon-1"></div>
              <div class="polygon-2"></div>
            </div>
            <div class="square-line-c">
              <div
                :class="
                  (statueList[33] ? 'statue-3' : 'statue-0') +
                  ' square noSelect shadow step-4-1'
                "
                @click="changeStatue(33)"
              >
                <div class="dot-0" v-if="!statueList[33]"></div>
                征求党员、群众意见
              </div>
              <div
                :class="
                  (statueList[34] ? 'statue-3' : 'statue-0') +
                  ' square noSelect shadow step-4-2'
                "
                @click="changeStatue(34)"
              >
                <div class="dot-0" v-if="!statueList[34]"></div>
                听取党小组、入党介绍人意见
              </div>
            </div>
            <div class="line-v">
              <div class="polygon-1"></div>
              <div class="polygon-2"></div>
            </div>
            <div
              :class="
                (statueList[35] ? 'statue-3' : 'statue-0') +
                ' square noSelect shadow'
              "
              @click="changeStatue(35)"
            >
              <div class="dot-0" v-if="!statueList[35]"></div>
              转正公示
            </div>
            <div class="line-v"></div>
            <div
              :class="
                (statueList[36] ? 'statue-3' : 'statue-0') +
                ' square noSelect shadow'
              "
              @click="changeStatue(36)"
            >
              <div class="dot-0" v-if="!statueList[36]"></div>
              转正大会
            </div>
            <div class="line-v"></div>
            <div
              :class="
                (statueList[37] ? 'statue-3' : 'statue-0') +
                ' square noSelect shadow'
              "
              @click="changeStatue(37)"
            >
              <div class="dot-0" v-if="!statueList[37]"></div>
              党委审批
            </div>
            <div class="line-v"></div>
            <div
              :class="
                (statueList[38] ? 'statue-3' : 'statue-0') +
                ' square noSelect shadow'
              "
              @click="changeStatue(38)"
            >
              <div class="dot-0" v-if="!statueList[38]"></div>
              支部书记谈话
            </div>
            <div class="line-v"></div>
            <div
              :class="
                (statueList[39] ? 'statue-3' : 'statue-0') +
                ' capsule noSelect shadow step-last'
              "
              @click="changeStatue(39)"
            >
              <img
                class="img-2"
                src="../../assets/party-icon-2.png"
                v-if="!statueList[39]"
              />
              <img class="img-2" src="../../assets/party-icon.png" v-else />
              中共党员
            </div>
          </div>
        </div>
      </div>
      <div class="sureBtn">
        <el-button
          auto-insert-space
          @click="toSubmit"
          class="redBtn"
          :loading="submitLoading"
          >提交</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import {
  getCollege,
  getGrade,
  getClass,
  getStudentsByClass,
  initStudentsStatue,
} from "../../api/studentInfo.ts";
export default {
  data() {
    return {
      isSearching: false,
      selectedClass: {},
      classes: [],
      tabIndex: 0,
      statue: false,
      isApplication: false,
      submitLoading: false,
      title: "",
      content: "",
      isAuto: false,
      centerDialogVisible: false,
      subTabList: ["入党申请人", "入党积极分子", "发展对象", "中共预备党员"],
      isResizing: false,
      scrollTime: 0,
      collegeList: [],
      cascaderValue: [],
      statueList: [],
      cascaderOptions: [],
      classInfo: {},
      studentTableData: [],
      multipleSelection: [],
    };
  },
  methods: {
    handleRowClick(val, i, j) {
      this.$refs.multipleTableRef[i.rawColumnKey].toggleRowSelection(val);
    },
    clickClass(id) {
      this.selectedClass[id] = !this.selectedClass[id];
      this.studentTableData = [];
      for (let item in this.selectedClass) {
        if (this.selectedClass[item]) {
          if (!this.classInfo[item]) {
            let formData = new FormData();
            formData.append("classIdList", item);
            getStudentsByClass(formData).then(({ data: res }) => {
              if (res[0]) {
                this.classInfo[item] = res[0];
                this.studentTableData.push(res[0]);
              }
            });
          } else {
            this.studentTableData.push(this.classInfo[item]);
          }
        }
      }
    },
    toSearch() {
      if (
        this.cascaderValue[0] === undefined ||
        this.cascaderValue[1] === undefined
      ) {
        ElMessage.warning("请选择您要查询的对象");
        return;
      }
      this.isSearching = true;
      getClass({
        collegeId: this.cascaderValue[0],
        grade: this.cascaderValue[1],
      })
        .then(({ code: code, data: res, msg: msg }) => {
          this.isSearching = false;
          if (code === 0) {
            this.classes = res;
            ElMessage.success("查询班级成功");
          } else {
            ElMessage.error(msg);
          }
        })
        .catch(() => {
          this.isSearching = false;
        });
    },
    getCollege() {
      getCollege().then(async ({ data: res }) => {
        let gradeList = [];
        await getGrade().then(({ data: res }) => {
          res.map((item) => {
            gradeList.push({
              label: item === 0 ? "其他" : item + "级",
              value: item,
            });
          });
        });
        this.collegeList = res;
        this.cascaderOptions = [];
        this.collegeList.map((item) => {
          this.cascaderOptions.push({
            value: item.id,
            label: item.collegeName,
            children: gradeList,
          });
        });
      });
    },
    toSubmit() {
      if (!this.statueList.length) {
        ElMessage.warning("请选择需要初始化的状态");
        return;
      }
      if (!this.multipleSelection.length) {
        ElMessage.warning("请选择需要进行初始化的对象");
        return;
      }
      this.submitLoading = true;
      let processIds = [];
      let status = [];
      let ids = [];
      for (let i = 0; i < 40; i++) {
        processIds.push(i);
        status.push(this.statueList[i] ? 1 : 0);
      }
      this.multipleSelection.map((item) => {
        item.map((_item) => {
          ids.push(_item.uid);
        });
      });
      initStudentsStatue({ ids, processIds, status })
        .then(({ code: code, msg: msg }) => {
          if (code === 0) {
            ElMessage.success("更新" + ids.length + "个用户的状态成功");
            this.submitLoading = false;
            Object.assign(this.$data, this.$options.data());
            this.$nextTick(() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            });
          } else {
            this.submitLoading = false;
            ElMessage.error(msg);
          }
        })
        .catch(() => {
          this.submitLoading = false;
        });
    },
    changeStatue(val) {
      this.statueList[val] = !this.statueList[val];
    },
    goApplication() {
      this.isApplication = true;
    },
    clickPath(val) {
      if (val === 0) {
        this.isApplication = false;
      }
    },
    clickConfirm() {
      this.centerDialogVisible = true;
    },
    changeUrl(val) {
      this.tabIndex = val;
      this.isAuto = true;
      this.scrollTime = new Date().getTime();
      document.getElementById("tab" + val).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      this.cancelAuto();
      this.updateSize();
    },
    cancelAuto() {
      setTimeout(() => {
        if (new Date().getTime() - this.scrollTime > 1000) {
          this.isAuto = false;
        } else {
          this.cancelAuto();
        }
      }, 1000);
    },
    updateSize() {
      this.$refs.capsule.style.width =
        this.$refs.tabs[this.tabIndex].clientWidth + "px";
      this.$refs.capsule.style.left =
        this.$refs.tabs[this.tabIndex].getBoundingClientRect().left -
        this.$refs.tabs[0].getBoundingClientRect().left +
        "px";
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
    updatePlace() {
      if (this.isAuto) return;
      let x = document.getElementById("chart").scrollTop;
      if (
        x >
        document.getElementById("tabHome3").offsetTop +
          document.getElementById("tab3").offsetTop -
          50
      ) {
        if (this.tabIndex !== 3) {
          this.tabIndex = 3;
          this.updateSize();
        }
      } else if (
        x >
        document.getElementById("tabHome2").offsetTop +
          document.getElementById("tab2").offsetTop -
          50
      ) {
        if (this.tabIndex !== 2) {
          this.tabIndex = 2;
          this.updateSize();
        }
      } else if (
        x >
        document.getElementById("tabHome1").offsetTop +
          document.getElementById("tab1").offsetTop -
          50
      ) {
        if (this.tabIndex !== 1) {
          this.tabIndex = 1;
          this.updateSize();
        }
      } else if (
        x >
        document.getElementById("tabHome0").offsetTop +
          document.getElementById("tab0").offsetTop -
          50
      ) {
        if (this.tabIndex !== 0) {
          this.tabIndex = 0;
          this.updateSize();
        }
      }
    },
  },
  mounted() {
    this.getCollege();
    this.updateResize();
    window.addEventListener("resize", this.updateResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.updateResize);
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
.sureBtn {
  text-align: center;
  margin-top: 40px;
}
.sureBtn :deep(.el-button) {
  background: #c7242f;
  border-radius: 10px;
  padding: 0 50px;
  height: 50px;
  font-size: 18px;
  color: #ffffff;
  display: inline-block;
}
.progress {
  padding: 24px 150px;
  padding-top: 32px;
  padding-bottom: 16px;
}
.graphBar {
  display: flex;
  justify-content: flex-start;
  width: max-content;
  background: #ffffff;
  border-radius: 12px;
  margin-top: 32px;
  position: relative;
}
.tab {
  display: inline-block;
  padding: 20px 48px;
  border-radius: 12px;
  font-size: 20px;
  cursor: pointer;
}
.tab-home {
  position: relative;
}
.tab-point {
  position: absolute;
  top: -77px;
}
.statue-0 {
  background: #ffffff;
  color: #9f9f9f;
}
.statue-1 {
  background: rgba(243, 115, 53, 0.8);
  color: #ffffff;
}
.shadow {
  box-shadow: 0px 2px 16px -4px rgba(199, 36, 58, 0.24);
}
.statue-2 {
  background: #fdebed;
  color: #c7242f;
}
.statue-3 {
  background: #d25059;
  color: #ffffff;
}
.content {
  width: 100%;
  display: grid;
  grid-gap: 16px;
  grid-template-columns: 1280px 325px;
}
.graphMain {
  width: 100%;
  height: 800px;
  background: #ffffff;
  position: relative;
}
.chart-main {
  overflow: auto;
  height: 800px;
  position: relative;
}
.chart-main::-webkit-scrollbar {
  display: none;
}
.progressLine {
  height: 100%;
  position: absolute;
  left: 100px;
}
.line-1 {
  width: 0px;
  height: 11%;
  border: 2px solid;
  border-image: linear-gradient(
      0deg,
      rgba(217, 38, 75, 1),
      rgba(251, 117, 73, 1)
    )
    2 2;
}
.line-2 {
  width: 0px;
  height: 89%;
  border: 2px solid #e6e6e6;
}
.point {
  position: absolute;
  left: -14px;
  bottom: 89%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.point img {
  width: 32px;
  height: 32px;
  margin-bottom: 6px;
}
.point div {
  width: 16px;
  height: 16px;
  border-radius: 8px;
  border: 3px solid #c7242f;
  background: #ffffff;
}
.right {
  width: 100%;
}
.right-1 {
  background: #ffffff;
  border-radius: 12px;
  width: 100%;
  height: 304px;
  margin-bottom: 16px;
  padding: 40px 36px;
}
.party-info-1 {
  display: grid;
  grid-template-columns: 48px auto;
  column-gap: 12px;
  margin-bottom: 28px;
}
.party-icon {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.party-icon img {
  width: 48px;
  height: 48px;
}
.party-name {
  font-size: 20px;
  color: #2f2f2f;
}
.party-hint {
  font-size: 14px;
  color: #9f9f9f;
}
.person-name {
  font-size: 18px;
  color: #505050;
  margin-bottom: 7px;
}
.person-name span {
  margin-left: 10px;
  font-size: 12px;
  color: #c7242f;
}
.party-info-2 {
  display: flex;
  justify-content: space-between;
  margin-top: 26px;
}
.party-num {
  font-size: 24px;
  color: #2f2f2f;
}
.party-num-hint {
  font-size: 12px;
  color: #9f9f9f;
}
.right-2 {
  background: #ffffff;
  border-radius: 12px;
  width: 100%;
  height: 174px;
  margin-bottom: 16px;
  padding: 25px 36px;
}
.title-2 {
  display: grid;
  grid-template-columns: 24px auto;
  column-gap: 10px;
  margin-bottom: 20px;
}
.title-icon {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.title-2 p {
  font-size: 20px;
  color: #505050;
}
.info-2 {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr;
  row-gap: 12px;
}
.info-2 div {
  width: max-content;
  background: #fdebed;
  border-radius: 14px;
  font-size: 14px;
  color: #c7242f;
  padding: 3px 12px;
}
.info-2 p {
  font-size: 16px;
  color: #505050;
}
.right-3 {
  background: #ffffff;
  border-radius: 12px;
  width: 100%;
  height: 138px;
  margin-bottom: 16px;
  padding: 25px 36px;
}
.info-3 {
  display: flex;
  justify-content: space-between;
}
.info-3 p {
  font-size: 18px;
  color: #505050;
}
.right-4 {
  background: #ffffff;
  border-radius: 12px;
  width: 100%;
  height: 138px;
  padding: 25px 36px;
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
.hint {
  position: absolute;
  right: 20px;
  bottom: 32px;
}
.hint div {
  display: inline-block;
  padding: 8px 13px;
  font-size: 14px;
  border-radius: 100px;
  margin: 0 12px;
}
.chart {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-size: 20px;
}
.square {
  border-radius: 18px;
  padding: 12px 22px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  cursor: pointer;
}
.step-1 {
  margin-top: 77px;
}
.step-last {
  margin-bottom: 77px;
}
.step-b-1 {
  margin-top: 177px;
}
.line-v {
  width: 1px;
  height: 40px;
  background-color: #c7242f;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.line-v-sub {
  width: 1px;
  height: 100%;
  background-color: #c7242f;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.capsule {
  width: max-content;
  display: flex;
  align-items: center;
  border-radius: 100px;
  padding: 12px 22px;
  cursor: pointer;
}
.img-1 {
  width: 16px;
  height: 16px;
  display: inline-block;
  margin-right: 8px;
}
.img-2 {
  width: 16px;
  height: 16px;
  display: inline-block;
  margin-right: 8px;
}
.img-3 {
  width: 24px;
  height: 24px;
  display: inline-block;
}
.polygon-1 {
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 8px solid #c7242f;
  margin-top: 13px;
  z-index: 2;
}
.polygon-2 {
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 8px solid #edc4ca;
  margin-top: -2px;
  z-index: 1;
}
.square-line-c {
  width: 344px;
  height: 132px;
  border: 1px solid #c7242f;
  border-radius: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.square-line-c-2 {
  width: 344px;
  height: 220px;
  border: 1px solid #c7242f;
  border-radius: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.square-line-c-3 {
  width: 600px;
  height: 220px;
  border: 1px solid #c7242f;
  border-radius: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.square-line-c-3-b {
  width: 600px;
  height: 132px;
  border: 1px solid #c7242f;
  border-radius: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.step-4-0 {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.step-4-1 {
  position: absolute;
  left: 0;
  transform: translateX(-50%);
}
.step-4-2 {
  position: absolute;
  right: 0;
  transform: translateX(50%);
}
.step-4-3 {
  position: absolute;
  right: 0;
  transform: translateX(50%);
  margin-top: 85px;
}
.step-4-4 {
  position: absolute;
  left: 0;
  transform: translateX(-50%);
  margin-top: 85px;
}
.offset-1 {
  margin-top: -85px;
}
.dot-1 {
  width: 8px;
  height: 8px;
  background: #c7242f;
  display: inline-block;
  border-radius: 50% 50%;
  margin-right: 12px;
}
.dot-0 {
  width: 8px;
  height: 8px;
  display: inline-block;
  border: 1px solid rgba(199, 36, 58, 0.4);
  border-radius: 50% 50%;
  margin-right: 12px;
}
.form {
  padding: 55px 80px;
  display: grid;
  grid-template-columns: 50px auto;
  align-items: center;
  gap: 55px 40px;
  font-size: 24px;
}
.text-2 {
  align-self: flex-start;
}
.input-1 {
  height: 48px;
  font-size: 20px;
}
.input-2 {
  font-size: 20px;
}
.buttons {
  position: absolute;
  right: 80px;
  bottom: 40px;
}
.noTrans {
  transition: none !important;
}
.classes {
  width: 100%;
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.no-data {
  font-size: 19px;
}
.class-items {
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 40px 0;
  width: 100%;
}
.class-item {
  padding: 15px;
  cursor: pointer;
  font-size: 17px;
  width: 100%;
  height: 100%;
}
.border-type-0 {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-left: 2px solid rgba(0, 0, 0, 0.1);
}
.border-type-0:first-of-type {
  border-top: 2px solid rgba(0, 0, 0, 0.1);
}
.border-type-0:last-of-type {
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  border-right: 2px solid rgba(0, 0, 0, 0.1);
}
.border-type-0:nth-last-of-type(3) {
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  border-right: 2px solid rgba(0, 0, 0, 0.1);
}
.border-type-1 {
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.border-type-1:nth-of-type(2) {
  border-top: 2px solid rgba(0, 0, 0, 0.1);
}
.border-type-1:last-of-type {
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
}
.border-type-1:nth-last-of-type(3) {
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
}
.border-type-2 {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-right: 2px solid rgba(0, 0, 0, 0.1);
}
.border-type-2:nth-of-type(3) {
  border-top: 2px solid rgba(0, 0, 0, 0.1);
}
.border-type-2:last-of-type {
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
}
.border-type-2:nth-last-of-type(2) {
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
}
.border-type-2:nth-last-of-type(3) {
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
}
.ani4-enter-active,
.ani4-leave-active {
  transition: all 0.5s;
}
.ani4-enter-from,
.ani4-leave-to {
  opacity: 0;
  height: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  min-height: unset !important;
}
.ani4-enter-to,
.ani4-leave-from {
  min-height: unset !important;
}
.className {
  display: inline-block;
  background-color: #c7242f;
  border-radius: 10px;
  color: #fff;
  font-size: 18px;
  overflow: hidden;
  padding: 2px 10px;
  margin: 15px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
.students {
  width: 100%;
}
</style>