<template>
  <div ref="fath" class="fullview">
    <div ref="chil" :class="{nowrap:true,box:!state,ani:state===2}">
      {{content}}
    </div>
    <div :class="{nowrap:true,box_:true,ani:state===2}" v-if="state===2">
      {{content}}
    </div>
  </div>
</template>

<script>
export default{
  name: 'FullView',
  props:{
    content:{
      required: true,
      type: String,
    }
  },
  data(){
    return{
      state: 0,
    }
  },
  methods:{

  },
  mounted(){
    setTimeout(() => {
      this.state = 1
      this.$nextTick(()=>{
        // let fathW = this.$refs.fath.offsetWidth
        // let chilW = this.$refs.chil.offsetWidth
        // console.log(this.$refs.fath)
        if(!this.$refs.fath)return;
        let fathW = parseFloat(getComputedStyle(this.$refs.fath).width)
        let chilW = parseFloat(getComputedStyle(this.$refs.chil).width)
        // console.log(fathW, chilW)
        if(fathW < chilW){
          this.state = 2
          setTimeout(() => {
            this.state = 0
          }, 8000);
          setInterval(() => {
            this.state = 2
            setTimeout(() => {
              this.state = 0
            }, 8000);
          }, 12000);
        }else{
          this.state = 0
        }
      })
    }, 500);
  }
}
</script>

<style scoped>
@keyframes scroll{
  to{
    transform: translateX(calc(-100% - 8px));
  }
}
.fullview{
  display: flex;
  width: 100%;
  overflow: hidden;
}
.box{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.box_{
  margin-left: 8px;
}
.nowrap{
  white-space: nowrap;
}
.ani{
  animation: scroll 8s linear;
}
</style>

