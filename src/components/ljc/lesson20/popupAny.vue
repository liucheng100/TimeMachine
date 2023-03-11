<template>
  <teleport to="body">
    <transition name="bili">
      <div v-if="ox" class="Mask">
        <div class="HoverPop">
          <slot></slot>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
export default{
  props:{
    ox:{
      required: true,
      type: [Boolean,Object],
    }
  },
  data(){
    return{
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
.Mask{
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0,0,0,0.2);
}
.HoverPop{
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 100;
  border-radius: 12px;
  box-shadow: 0 0 30px rgba(0,0,0,.06);
  background-color: #fff;
  transition: .3s;
  transform: translate(-50%,-50%);
}
.bili-enter-from,
.bili-leave-to {
  opacity: 0;
  transform: translate(calc(-60px - 100%), -50%);
}
.bili-enter-to,
.bili-leave-from {
  opacity: 1;
  transform: translate(-100%,-50%);
}
</style>

