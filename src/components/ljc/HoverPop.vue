<template>
  <transition name="bili">
    <div v-if="popOX" class="HoverPop" :style="{top:pos.y+'px',left:pos.x+'px'}">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default{
  name: 'HoverPop',
  props:{
    pos:{
      required: true,
      type: Object,
    },
    ox:{
      required: true,
      type: Boolean,
    }
  },
  watch:{
    ox(to){
      if(to){
        clearTimeout(this.timeouter)
        this.popOX = true
      }else{
        this.timeouter = setTimeout(() => {
          this.popOX = false
        }, 100);
      }
    }
  },
  data(){
    return{
      popOX:false,
      timeouter: '',
    }
  },
  methods:{

  },
  mounted(){
    
  }
}
</script>

<style scoped>
.HoverPop{
  padding: 20px;
  position: fixed;
  z-index: 100;
  border-radius: 12px;
  box-shadow: 0 0 30px rgba(0,0,0,.06);
  background-color: #fff;
  transition: .3s;
  transform: translate(0%,-50%);
}
.bili-enter-from,
.bili-leave-to {
  opacity: 0;
  transform: translate(calc(60px), -50%);
}
.bili-enter-to,
.bili-leave-from {
  opacity: 1;
  transform: translate(0%,-50%);
}
</style>

