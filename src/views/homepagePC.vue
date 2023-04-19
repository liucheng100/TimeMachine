<template>
    <div class="home">
        <NavHeader_PC></NavHeader_PC>
        <div class="container" style="position: relative; height: 100%; width: 100%; perspective: 1200px;">
            <router-view v-slot="{ Component }" class="router-view" style="position: absolute; height: 100%; width: 100%;">
            <transition name="fade">
                <component class="components" :is="Component" />
            </transition>
            </router-view>
        </div>
        <Advertise></Advertise>
    </div>
</template>

<script>
import NavHeader_PC from '@/components/NavHeader_PC.vue'
import Advertise from "@/components/bottom/Advertise.vue"
import login from "@/components/PC/LoginPC.vue"

export default {
    components:[
        NavHeader_PC,
        Advertise,
        login
    ],
    data(){
        return{
            is_login:false
        }
    },
    methods:{
        login(){

        }
    }
}
</script>

<style>
.el-message{
    
    height:12px;
    border-radius: 2px;
    font-size: 5px;
    padding:0;
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
.el-message__icon{
    margin:3px;
    height:5px;
}
.el-message__content{
    padding:3px;
    font-size:5px;
}
</style>
<style scoped>
.home{
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #fff;
}
.container{
    flex: 1;
}
.router-view{
    overflow: auto;
    overflow: overlay;
}
.components{
    transition: .3s;
    transition-delay: .3s;
}
.fade-enter-from {
    opacity: .0;
    transform: translateY(10%);
    /* transform: rotate3d(0,0,1,60deg); */
}
.fade-leave-to {
    opacity: .0;
    transform: translateX(-20%);
    transition-delay: .0s;
    /* transform: rotate3d(0,0,1,60deg); */
}
</style>