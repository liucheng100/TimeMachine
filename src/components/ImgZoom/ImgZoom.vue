<template>
    <teleport to="body">
        <transition name="fade">
            <div @click="end" class="img-zoom" v-if="ON">
                <transition name="zoom" >
                    <img v-if="on" class="img" :src="src" alt="">
                </transition>
                <div class="tip">长按屏幕保存图片</div>
            </div>
        </transition>
    </teleport>
</template>

<script>
export default {
    name: 'ImgZoom',
    emits:['update:ON'],
    props:{
        ON:{
            type: [Boolean,String],
            required: true,
        },
        src:{
            type:[String,Boolean],
            required: false
        }
    },
    data(){
        return{
            on: false
        }
    },
    watch:{
        ON(to){
            setTimeout(() => {
                this.on=this.ON
            }, 10);
        }
    },
    methods:{
        end(){
            this.on = false
            setTimeout(() => {
                this.$emit('update:ON')
            }, 10);
        }
    },

}
</script>


<style scoped>
.img-zoom{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    height: 100vh;
    width: 100vw;
    /* padding-top: var(--nav-height); */
    background: rgba(31, 31, 31, .5);
    transition: .3s;
    overflow: hidden;
}
.img{
    height: 100%;
    width: 100%;
    object-fit: contain;
    transition: .3s;
}
.fade-enter-from,
.fade-leave-to {
    opacity: .0;
    /* transform: rotate3d(0,0,1,60deg); */
}
.zoom-enter-from,
.zoom-leave-to {
    transform: scale(.8) translateY(14%);
    /* transform: rotate3d(0,0,1,60deg); */
}
.tip{
    opacity: .8;
    position: absolute;
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 8px 18px;
    border-radius: 12px;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
    user-select: none;
}
</style>