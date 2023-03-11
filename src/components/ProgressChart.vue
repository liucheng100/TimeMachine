<script setup lang="ts"></script>
<template>
  <div>
    <div class="progress">
      <div class="progressLine">
        <div class="line-1"></div>
        <div class="line-2"></div>
        <div class="point">
          <img src="../assets/point.png" />
          <div></div>
        </div>
      </div>
      <div class="progressChart">
        <div class="capsule statue-3 step-1">
          <img class="img-1" src="../assets/party-icon.png" />
          入党积极分子
        </div>
        <div class="line-h">
          <div class="polygon-2"></div>
          <div class="polygon-1"></div>
        </div>
        <div class="square-line-h">
          <div class="middle-line-h"></div>
          <div class="items-1-v">
            <div class="square statue-2 step-2-1">
              <div class="dot-1"></div>
              通过院级积极分子培训
            </div>
            <div class="square statue-0 step-2-2">
              <div class="dot-0"></div>
              按季度递交思想汇报
            </div>
            <div class="square statue-0 step-2-3">
              <div class="dot-0"></div>
              确定培养联系人
            </div>
          </div>
          <div class="items-2-v">
            <div class="square statue-0 step-2-4">
              <div class="dot-0"></div>
              支部考察
            </div>
          </div>
        </div>
        <div class="line-h">
          <div class="polygon-2"></div>
          <div class="polygon-1"></div>
        </div>
        <div class="square-line-h"><div class="middle-line-h"></div></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.progress {
  width: 870px;
  height: 420px;
  border-radius: 4px;
  margin-top: 10px;
  border: 2px solid rgba(199, 36, 58, 0.1);
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #505050;
  position: relative;
}
.progressLine {
  width: 870px;
  position: absolute;
  top: 45px;
}
.line-1 {
  width: 35%;
  height: 0;
  border: 2px solid;
  border-image: linear-gradient(
      270deg,
      rgba(193, 6, 45, 1),
      rgba(193, 6, 45, 0)
    )
    2 2;
  display: inline-block;
}
.line-2 {
  width: 65%;
  height: 0;
  border: 2px solid #e6e6e6;
  display: inline-block;
}
.point {
  position: absolute;
  left: calc(35% - 16px);
  bottom: 2px;
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
.dot-1 {
  width: 6px;
  height: 6px;
  background: #c7242f;
  display: inline-block;
  border-radius: 50% 50%;
  margin-right: 12px;
}
.dot-0 {
  width: 6px;
  height: 6px;
  display: inline-block;
  border: 1px solid rgba(199, 36, 58, 0.4);
  border-radius: 50% 50%;
  margin-right: 12px;
}
.progressChart {
  width: 100%;
  height: 320px;
  margin-top: 80px;
  display: flex;
  align-items: center;
  font-size: 14px;
  overflow: hidden;
}
.progressChart div {
  flex-shrink: 0;
}
.statue-0 {
  background: #ffffff;
  color: #9f9f9f;
}
.statue-1 {
  background: rgba(243, 115, 53, 0.8);
  color: #ffffff;
}
.statue-2 {
  background: #fdebed;
  color: #c7242f;
}
.statue-3 {
  background: rgba(199, 36, 47, 0.8);
  color: #ffffff;
}
.capsule {
  width: max-content;
  display: flex;
  align-items: center;
  border-radius: 100px;
  padding: 6px 16px;
}
.img-1 {
  width: 14px;
  height: 14px;
  display: inline-block;
  margin-right: 6px;
}
.step-1 {
  margin-left: 36px;
}
.line-h {
  height: 1px;
  width: 40px;
  background-color: #c7242f;
  display: flex;
  justify-content: center;
  align-items: center;
}
.polygon-1 {
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 7px solid #c7242f;
}
.polygon-2 {
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 7px solid #edc4ca;
}
.square-line-h {
  width: 500px;
  height: 200px;
  border: 1px solid #c7242f;
  border-radius: 32px;
  display: flex;
  justify-content: center;
  position: relative;
}
.items-1-v {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 50px;
}
.items-2-v {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.middle-line-h {
  width: 100%;
  height: 1px;
  background-color: #c7242f;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 0;
}
.square {
  border-radius: 18px;
  padding: 6px 16px;
  display: flex;
  align-items: center;
  white-space: nowrap;
}
.step-2-1 {
  transform: translateY(-50%);
}
.step-2-2 {
  z-index: 2;
}
.step-2-3 {
  transform: translateY(50%);
}
.step-2-4 {
  transform: translateY(50%);
}
</style>