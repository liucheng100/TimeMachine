<template>
  <div class="item">
    <div class="mask"></div>
    <div class="main">
      <div class="box">
        <div class="num">
          03
        </div>
        <div class="inf">
          <div class="tit">
            中华人民共和国的成立和社会主义的确立
          </div>
          <div class="tip">3004字</div>
        </div>
      </div>
      <div class="iconBox">
        ✔
      </div>
    </div>
  </div>
</template>

<script>
import getAssetsFile from "@/utils/pub-use";
export default {
  name: 'LectureItem',
  props: {
    
  },
  data(){
    return{
      
    }
  },
  methods: {
    
  },
};
</script>

<style scoped>
.item{
  width: 332px;
  height: 66px;
  background-color: white;
  padding: 10px 14px;
  border-radius: 8px;
  cursor: pointer;
  transition: .14s;
  position: relative;
  overflow: hidden;
}
.item:hover{
  filter: brightness(.97);
}
.item:active>.mask{
  width: calc(100% + 10px);
  opacity: .9;
  border-radius: 15px / 50%;
}
.mask{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
  width: 30%;
  border-radius: 5px / 50%;
  background-color: rgba(0, 0, 0, 0.03);
  opacity: .0;
  transition: 1s;
}
.item>.main{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  position: relative;
}
.box{
  display: flex;
  align-items: center;
}
.num{
  width: 48px;
  height: 48px;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #C7242F;
  font-size: 18px;
  font-weight: bold;
  background-color: #FDEBED;
  margin-right: 20px;
}
.inf{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: baseline;
}
.tit{
  font-size: 17.4px;
  color: #2F2F2F;
}
.tip{
  font-size: 15.6px;
  color: #9F9F9F;
}
.iconBox{
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: rgba(33, 179, 57, 0.1000);

  display: flex;
  justify-content: center;
  align-items: center;
  color: #21B339;
  font-size: 18px;
  font-weight: 600;
}
</style>