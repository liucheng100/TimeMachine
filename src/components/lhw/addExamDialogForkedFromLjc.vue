<template>
  <teleport to="body">
    <div
      class="popup"
      @click="destroy($event)"
      :style="{ backgroundColor: `rgba(0,0,0,${aniL.alph})` }"
    >
      <div
        class="boat"
        :style="{ transform: `translateY(${aniL.y})`, opacity: aniL.alph1 }"
        @click.stop
      >
        <div class="box">
          <div class="item-title">添加培训</div>
          <div class="item-select">
            <span>培训类型</span>
            <el-select
              id="trigger1"
              v-model="selectValue.type"
              class="m-2"
              placeholder="请选择培训内容"
              size="large"
            >
              <el-option
                v-for="item in types"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="item-select">
            <span> 培训期数 </span>
            <div class="elinput">
              <el-input
                ref="trigger4"
                v-model="selectValue.times"
                size="large"
                placeholder="请输入培训期数，比如：1"
              />
            </div>
          </div>
          <div class="item-select">
            <span> 培训名称 </span>
            <div class="elinput">
              <el-input
                ref="trigger4"
                v-model="selectValue.name"
                size="large"
                placeholder="请输入培训名称"
              />
            </div>
          </div>
          <div class="item-select">
            <span> 培训时间 </span>
            <div class="elinput">
              <el-date-picker
                size="large"
                v-model="selectValue.date"
                type="datetimerange"
                range-separator="到"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                value-format="x"
              />
            </div>
          </div>
          <div class="item-select">
            <span> 培训内容 </span>
            <div class="elinput">
              <el-input
                ref="trigger4"
                v-model="selectValue.content"
                type="textarea"
                size="large"
                placeholder="请输入培训内容"
              />
            </div>
          </div>
        </div>
        <div @click="destroy($event)" class="icon_down_box pointer noSelect">
          <div class="icon_down"></div>
          <VividClick></VividClick>
        </div>
        <div @click="toConfirm" class="submitBox pointer noSelect">
          <div>
            提交
            <VividClick></VividClick>
          </div>
        </div>
      </div>
      <transition name="ani1">
        <div @click.stop="mask_1OX = false" class="mask_1" v-if="mask_1OX">
          <div
            @click.stop="
              destroy_1();
              mask_1OX = false;
            "
            class="sure pointer"
            :style="{ top: mask_1.y + 'px', left: mask_1.x + 'px' }"
          >
            <div class="icon_x"></div>
          </div>
        </div>
      </transition>
    </div>
  </teleport>
</template>

<script>
import VividClick from "@/components/ljc/VividClick.vue";
import ImgLoad from "@/components/ljc/ImgLoad.vue";
import { addExam } from "../../api/examinationAndClass.ts";
export default {
  name: "Popup_addBranch",
  props: {
    total: {
      required: false,
      type: Number,
    },
    defaultType: {
      required: false,
      default: "",
    },
  },
  components: {
    VividClick,
    ImgLoad,
  },
  data() {
    return {
      addLoading: false,
      selectValue: {
        type: "",
        times: "",
        name: "",
        date: [],
        content: "",
      },
      types: [
        {
          value: 0,
          label: "入党申请人培训",
        },
        {
          value: 1,
          label: "积极分子培训",
        },
        {
          value: 2,
          label: "预备党员培训",
        },
      ],
      aniL: {
        alph: 0,
        y: "200px",
        alph1: 0,
      },
      mask_1OX: false,
      mask_1: {
        x: 0,
        y: 0,
      },
    };
  },
  methods: {
    toConfirm() {
      console.log(this.selectValue);
      if (this.selectValue.type === "") {
        ElMessage.warning("请选择培训类型");
        return;
      }
      if (!this.selectValue.name) {
        ElMessage.warning("请输入培训名称");
        return;
      }
      if (!this.selectValue.times) {
        ElMessage.warning("请输入培训期数");
        return;
      }
      if (!this.selectValue.content) {
        ElMessage.warning("请输入培训内容");
        return;
      }
      if (!this.selectValue.date[0] || !this.selectValue.date[1]) {
        ElMessage.warning("请输入培训时间");
        return;
      }
      this.addLoading = true;
      addExam({
        name: this.selectValue.name,
        content: this.selectValue.content,
        times: this.selectValue.times,
        userType: this.selectValue.type,
        startTime: this.selectValue.date[0],
        endTime: this.selectValue.date[1],
      })
        .then(({ code: code, msg: msg }) => {
          if (code === 0) {
            ElMessage.success("添加培训成功");
            this.$emit("refresh");
            this.destroy_1();
          } else {
            ElMessage.error(msg);
          }
          this.addLoading = false;
        })
        .catch(() => {
          this.addLoading = false;
        });
    },
    trigger(ref) {
      // console.log(this.$refs.trigger1[0])
      // this.$refs[ref].select()
      if (ref === "trigger4") {
        this.$refs[ref].select();
      } else {
        document.getElementById(ref).click();
      }
    },
    destroy(e) {
      if (
        this.selectValue.type === this.defaultType &&
        !this.selectValue.name &&
        !this.selectValue.times &&
        (this.selectValue.date
          ? !this.selectValue.date[0] && !this.selectValue.date[1]
          : true) &&
        !this.selectValue.content
      ) {
        this.destroy_1();
      } else {
        this.mask_1.x = e.clientX;
        this.mask_1.y = e.clientY;
        this.mask_1OX = true;
      }
      // console.log(e.srcElement,e.srcElement.offsetHeight,e.offsetY,e.srcElement.clientHeight)
    },
    destroy_1() {
      document.getElementById("app").scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      this.aniL.alph = 0;
      this.aniL.alph1 = 0;
      this.aniL.y = "200px";
      setTimeout(() => {
        this.$emit("destroy");
      }, 600);
    },
  },
  mounted() {
    this.selectValue.type = this.defaultType;
    console.log(this.defaultType);
    setTimeout(() => {
      this.aniL.alph = 0.4;
      this.aniL.alph1 = 1;
      this.aniL.y = 0;
    }, 0);
  },
};
</script>

<style scoped>
.popup {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.boat {
  position: absolute;
  height: 78%;
  width: 58%;
  max-height: 900px;
  border-radius: 20px;
  box-shadow: 0px -3px 9px rgba(0, 0, 0, 0.1);
  /* background-color: rgba(255,255,255,.9); */
  /* background-image: linear-gradient(180deg , rgba(255,255,255,0.88) 0, rgba(250,250,250,1) 100%); */
  background-color: rgb(250, 250, 250);
  transition: transform 0.34s, opacity 0.4s;

  overflow: hidden;
}
.boat::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 0px;
  height: 0px;
}
.box {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 100px 100px;
  overflow: overlay;
  font-size: 18px;
}
.item-title {
  padding-left: 22px;
  font-size: 24px;
  color: rgba(0, 0, 0, 0.3);
  margin-bottom: 30px;
}
.item-select {
  display: flex;
  align-items: center;
  margin-bottom: 18px;
  transition: 0.12s;
  padding: 8px 18px;
}
.item-select:hover {
  background-color: rgba(0, 0, 0, 0.02);
}
.item-select > span {
  color: rgba(0, 0, 0, 0.76);
  margin-right: 30px;
  width: 80px;
  display: flex;
  flex-direction: row-reverse;
  white-space: nowrap;
}
.item-select > .elinput {
  width: 224px;
  width: 500px;
}
.mainName {
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  overflow: hidden;
}
.itemName {
  /* margin-right: 2px; */
  transition: 0.2s;
  border-radius: 6px;
  white-space: nowrap;
  /* text-overflow: ellipsis; */
  /* overflow: hidden; */
}
.itemName:hover {
  padding: 10px 0;
  color: rgba(199, 36, 48, 1);
  background-color: rgba(255, 255, 255, 0.7);
}
.icon_down_box {
  position: absolute;
  left: 0;
  right: 0;
  height: 70px;
  width: 100%;
  transition: 0.4s;
}
.icon_down {
  position: absolute;
  left: 0;
  right: 0;
  height: 70px;
  width: 100%;
  opacity: 0.23;
  background: url("@/assets/homepage/down.svg") center center / 2.1% no-repeat;
}
.icon_down_box:hover {
  background-color: rgba(0, 0, 0, 0.04);
}
.mask_1 {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.6);
}
.sure {
  width: 110px;
  height: 110px;
  position: fixed;
  color: white;
  /* background-color: rgb(255, 0, 0); */
  background-image: radial-gradient(
    rgba(255, 0, 0, 1),
    rgba(255, 0, 0, 0.8) 30%,
    rgba(255, 0, 0, 0)
  );
  border-radius: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
}
.icon_x {
  opacity: 0.7;
  height: 100%;
  width: 100%;
  background: url("@/assets/homepage/x.svg") center center / 36% no-repeat;
}

.icon_x::after {
  content: "退出内容不会保存";
  white-space: nowrap;
  font-size: 16px;
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
}

.submitBox {
  position: absolute;
  overflow: hidden;
  left: 50%;
  /* top: 0; */
  bottom: 48px;
  transform: translateX(-50%);
  /* height: 300px; */
  /* width: 400px; */
  /* background-color: aquamarine; */
}
.submitBox > div {
  width: 160px;
  height: 52px;
  /* position: absolute; */
  /* left: 0; */
  /* bottom: 50%; */
  border-radius: 26px;
  /* box-shadow: 3px 3px 5px rgba(0, 0, 0, .3); */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(235, 55, 64, 0.9);
  color: white;
  /* display: none; */
}
</style>