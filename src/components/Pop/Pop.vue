<template>
    <teleport to="body">
        <transition name="fade">
            <div class="pop" v-show="ON">
                <transition name="pop">
                    <div v-if="ON" class="box">
                        <div class="icon" :style="{backgroundImage: `url('${iconList[model]}')`}"></div>
                        <div class="title">
                            {{ title }}
                        </div>
                        <div class="tip">
                            {{ tip }}
                        </div>
                        <div class="btn-bar">
                            <div @click="$emit('blackClick')" class="btn black-btn" v-if="options.black">
                                {{ options.black }}
                            </div>
                            <div @click="$emit('greyClick')" class="btn grey-btn" v-if="options.grey">
                                {{ options.grey }}
                            </div>
                            <div @click="$emit('blueClick')" class="btn blue-btn" v-if="options.blue">
                                {{ options.blue }}
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </transition>
    </teleport>
</template>

<script>
import pubuse from '@/utils/pub-use'
export default {
    name: 'Pop',
    emits:['blackClick','greyClick','blueClick'],
    props:{
        model:{
            default: 0, //0 1 2
            type: Number,
        },
        options:{
            default: {black:false,grey:false,blue:true}, //0 1 2
            type: Object,
        },
        title:{
            default: '',
            type: String
        },
        tip:{
            default: '',
            type: String
        },
        ON:{
            type:Boolean,
            required:true
        }
    },
    data(){
        return{
            iconList:[
                pubuse('alertCircle.svg'),
                pubuse('finishCircle.svg'),
                pubuse('warnCircle.svg'),
            ]
            
        }
    },
    methods:{
        
    },
    mounted(){
    },

}
</script>


<style scoped>
.pop{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    height: 100vh;
    width: 100vw;
    /* padding-top: var(--nav-height); */
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(31, 31, 31, .5);
    transition: .2s;
    user-select: none;
}
.box{
    padding: 20px;
    background-color: #fff;
    width: 353px;
    height: 233px;
    filter: drop-shadow(0px 2px 30px rgba(0, 0, 0, 0.1));
    max-width: 95vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius: 6px;
    transition: .3s;
}
.icon{
    height: 48px;
    width: 48px;
    margin-bottom: 20px;
    background: center center / 100% no-repeat;
}
.title{
    margin-bottom: 10px;
    height: 34px;
    font-size: 24px;
    font-weight: 500;
    color: #1F1F1F;
}
.tip{
    margin-bottom: 20px;
    height: 17px;
    font-size: 12px;
    font-weight: 300;
    color: #999CA0;
}
.btn-bar{
    display: flex;
    height: 48px;
    width: 100%;
}
.btn{
    height: 48px;
    width: 147px;
    border-radius: 6px;
    color: white;
    font-weight: 400;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.black-btn{
    background-color: #444444;
    margin-right: 20px;
}
.grey-btn{
    background-color: #999CA0;
    margin-right: 20px;
}
.blue-btn{
    background-color: #4E46B4;
    flex: 1;
}

.fade-enter-from,
.fade-leave-to {
    opacity: .0;
    /* transform: rotate3d(0,0,1,60deg); */
}
.pop-enter-from,
.pop-leave-to {
    transform: translateY(20%);
    /* transform: rotate3d(0,0,1,60deg); */
}
@media screen and (min-width: 768px){
    .box{
        transform: scale(.4, .4);
    }
}
</style>