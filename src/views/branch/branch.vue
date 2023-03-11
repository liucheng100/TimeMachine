<template>
  <div ref="branch" class="branch">
    <div class="box">
      <div class="toolBar">
        <div class="leftFlex">
          <div class="selectCom">
            <span>所在学院</span>
            <el-select
              v-model="selectValue.v_department"
              class="m-2"
              placeholder="Select"
              size="large"
              @change="select"
            >
              <el-option
                v-for="item in selectOption.op_department"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="selectCom">
            <span>年级</span>
            <el-select
              v-model="selectValue.v_grade"
              class="m-2 i-1"
              placeholder="Select"
              size="large"
              @change="select"
            >
              <el-option
                v-for="item in selectOption.op_grade"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="selectCom">
            <span>支部类型</span>
            <el-select
              v-model="selectValue.v_type"
              class="m-2 i-1"
              placeholder="Select"
              size="large"
              @change="select"
            >
              <el-option
                v-for="item in selectOption.op_type"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="btn2 margin-right" @click="select">
            <div>查询</div>
            <VividClick></VividClick>
            <div class="ani-loading-box" v-if="loadOX">
              <div></div>
            </div>
          </div>
        </div>
        <div class="btn2" @click="openPopup">
          <div>创建支部</div>
          <VividClick></VividClick>
        </div>
      </div>
      <div class="mainBox">
        <div class="list list-title list-first">
          <div class="item flex-3 item-first">学院名称</div>
          <div class="item flex-2">支部总数</div>
          <div class="item flex-2 noSelect">操作</div>
        </div>
        <div
          v-for="(o, i) in assets"
          :ref="`focusView` + i"
          :key="o.collegeId + 'ko' + o.branchCount"
        >
          <div class="list list-item">
            <div class="item flex-3 item-first">{{ o.collegeName }}</div>
            <div class="item flex-2">{{ o.branchCount }}</div>
            <div class="item flex-2">
              <div class="btn1" @click="extendPop(o, i)">
                {{ o.OX ? "收起" : "支部详情" }}
                <VividClick></VividClick>
              </div>
            </div>
          </div>
          <transition name="ani4">
            <div
              :ref="`levelBox` + i"
              class="levelBox"
              :style="{
                height: o.popHeight + 'px',
              }"
              v-show="o.OX"
            >
              <div class="popBox">
                <div class="list list-title list-first">
                  <div class="item flex-5 item-first">支部名称</div>
                  <div class="item flex-2">支部类型</div>
                  <div class="item flex-2">所属年级</div>
                  <div class="item flex-2">正式党员</div>
                  <div class="item flex-2">预备党员</div>
                  <div class="item flex-4 noSelect">操作</div>
                </div>
                <div
                  class="list list-item"
                  v-for="(child, j) in o.list"
                  :key="i + ' ' + j"
                >
                  <div class="item flex-5 item-first">
                    {{ child.partybranchName }}
                  </div>
                  <div class="item flex-2">{{ child.partybranchType }}</div>
                  <div class="item flex-2">
                    {{ child.partybranchSchoolyear }}
                  </div>
                  <div class="item flex-2">
                    {{ child.regularCount || "暂无" }}
                  </div>
                  <div class="item flex-2">
                    {{ child.prepareCount || "暂无" }}
                  </div>
                  <div class="item flex-4">
                    <div
                      class="btn1"
                      @click="
                        $router.push({
                          path: '/branch/memberControl',
                          query: { branchId: child.partybranchId },
                        })
                      "
                    >
                      人员管理
                      <VividClick v-if="o.OX"></VividClick>
                    </div>
                    <div
                      class="btn1"
                      @click="
                        $router.push({
                          path: '/branch/memberView',
                          query: { branchId: child.partybranchId },
                        })
                      "
                    >
                      支部管理
                      <VividClick v-if="o.OX"></VividClick>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
    <Popup_addBranch @destroy="popupOX = false" v-if="popupOX" />
    <!-- mask -->
  </div>
</template>

<script>
import VividClick from "@/components/ljc/VividClick.vue";
import FullView from "@/components/ljc/FullView.vue";
import Popup_addBranch from "@/components/ljc/branch/Popup_addBranch.vue";
import request from "@/utils/pub-use.ts";
import { getBranchlist, getUtilYear, getCollegeList } from "@/api/branch.ts";
export default {
  components: {
    VividClick,
    FullView,
    Popup_addBranch,
  },
  data() {
    return {
      popupOX: false,
      loadOX: false,
      selectValue: {
        v_department: "",
        v_grade: "",
        v_type: "",
      },
      selectOption: {
        op_department: [
          {
            value: "",
            label: "全部",
          },
          {
            value: 201,
            label: "机械工程学院",
          },
        ],
        op_grade: [
          {
            value: "",
            label: "全部",
          },
          {
            value: "2021",
            label: "2021",
          },
        ],
        op_type: [
          {
            value: "",
            label: "全部",
          },
          {
            value: "本科",
            label: "本科",
          },
          {
            value: "硕士",
            label: "硕士",
          },
          {
            value: "博士",
            label: "博士",
          },
          {
            value: "其他",
            label: "其他",
          },
        ],
      },
      assets: [
        {
          OX: false,
          children: [{}, {}, {}],
        },
        {
          OX: false,
          children: [{}],
        },
        {
          OX: false,
          children: [{}, {}],
        },
        {
          OX: false,
          children: [{}, {}, {}, {}],
        },
        {
          OX: false,
          children: [{}, {}],
        },
      ],
    };
  },
  methods: {
    select() {
      this.loadOX = true;
      getBranchlist({
        collegeId: this.selectValue.v_department,
        grade: this.selectValue.v_grade,
        type: this.selectValue.v_type,
      }).then((v) => {
        this.loadOX = false;
        this.assets = "";
        this.assets = v.data;
        console.log(this.assets);
      });
    },
    openPopup() {
      this.popupOX = true;
      this.$refs.branch.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    },
    extendPop(o, i) {
      let dom = this.$refs["levelBox" + i][0];
      let popHeight = parseInt(getComputedStyle(dom).height);
      if (!!popHeight) {
        o.popHeight = popHeight;
      }
      o.OX = !o.OX;
      if (o.OX) {
        setTimeout(() => {
          this.$refs["focusView" + i][0].scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 310);
      } else {
        setTimeout(() => {
          if (this.$refs["focusView" + (i - 1)]) {
            this.$refs["focusView" + (i - 1)][0].scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }, 0);
      }
    },
  },
  mounted() {
    this.assets = []
    this.loadOX = true;
    getBranchlist({}).then((v) => {
      this.assets = v.data;
      this.loadOX = false;
      console.log(v.data[0]);
    }).catch(e=>{
      this.loadOX = false;
      ElMessage({
        message: '加载失败',
        type: 'error'
      })
      console.log(e)
    });
    getUtilYear().then((v) => {
      console.log(v);
      this.selectOption.op_grade = v.data.map((y) => {
        return {
          value: y.toString(),
          label: y,
        };
      });
      this.selectOption.op_grade.unshift({
        value: "",
        label: "全部",
      });
    });
    getCollegeList().then((v) => {
      console.log(v);
      this.selectOption.op_department = v.data.map((y) => {
        return {
          value: y.code,
          label: y.shortName,
        };
      });
      this.selectOption.op_department.unshift({
        value: "",
        label: "全部",
      });
    });
  },
};
</script>
    

<style scoped>
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
  padding-top: 26px !important;
  padding-bottom: 26px !important;
  min-height: unset !important;
}
.branch {
  width: 100%;
  position: relative;
  height: 100%;
}
.box {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  padding: 30px 10px;
  display: flex;
  flex-direction: column;
  overflow: overlay;
}
.toolBar {
  height: 50px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.leftFlex {
  display: flex;
  align-items: center;
}
.selectCom {
  margin-right: 50px;
  display: flex;
  align-items: center;
}
.selectCom > span {
  margin-right: 20px;
}
.flex-1 {
  flex: 1;
}
.flex-2 {
  flex: 2;
}
.flex-3 {
  flex: 3;
}
.flex-4 {
  flex: 4.2;
}
.flex-5 {
  flex: 6;
}
.mainBox {
  --borderColor: rgba(0, 0, 0, 0.2);
}
.list {
  display: flex;
  background-color: #fff;
  border: solid 1px var(--borderColor);
  border-top: 0;
}
.list-first {
  border-top: solid 1px var(--borderColor);
}
.list-item {
  background-color: rgba(0, 0, 0, 0.01);
}
.item {
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: solid 1px var(--borderColor);
  padding: 10px;
}
.item-first {
  border-left: 0;
}
.btn1 {
  border-radius: 6px;
  color: rgba(199, 36, 48, 1);
  text-decoration: underline;
  user-select: none;
  cursor: pointer;
  position: relative;
  padding: 9px 26px;
  /* color: white; */
  /* background-color: rgba(199,36,48,1); */
}
.btn1:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
.levelBox {
  border-bottom: solid 1px var(--borderColor);
  min-height: 100px;
  padding: 26px 30px;
}
.popBox {
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}
.btn2 {
  border-radius: 6px;
  user-select: none;
  cursor: pointer;
  position: relative;
  padding: 10px 30px;
  flex-shrink: 0;
  transition: 0.4s;
  color: white;
  background-color: rgb(228, 72, 80);
  overflow: hidden;
}
.btn2:hover {
  background-color: rgba(228, 72, 80, 0.84);
}

.ani-loading-box {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  cursor: not-allowed;
}
@keyframes loading {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(100%);
  }
}
.ani-loading-box > div {
  animation: loading 2s infinite;
  height: 100%;
  width: 100%;
  background-image: linear-gradient(
    -90deg,
    rgba(255, 255, 255, 0.7) 0,
    rgba(255, 255, 255, 0.8) 5%,
    rgba(255, 255, 255, 0.6) 20%,
    rgba(255, 255, 255, 0)
  );
}
.margin-right {
  margin-right: 50px;
}
.m-2 {
  width: 220px;
}
.i-1 {
  width: 140px;
}
</style>