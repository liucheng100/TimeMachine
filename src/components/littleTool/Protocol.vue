<template>
    <div class="protocol">
        <div @click="$emit('check')" class="btn">
            <transition-group name="fade">
                <div key="1" v-show="!ON" class="check-square"></div>
                <div key="2" v-show="ON" class="check-square_"></div>
            </transition-group>
        </div>
        <div class="text">
            <div>我已阅读并同意</div>
            <div @click="pro_box=true" class="a">隐私政策</div>
        </div>
        <teleport to="body">
            <div class="proBox" v-if="pro_box">
                <div class="header">
                    <div @click="pro_box=false" class="back">
                        {{'<返回'}}
                    </div>
                </div>
                <div class="content">
                    <iframe :src="iframeSrc"></iframe>
                </div>
            </div>
        </teleport>
    </div>
</template>

<script>
import longText from './proto';
export default {
    name: 'Protocol',
    emits:['check'],
    props:{
        ON:{
            type: Boolean,
            required: true,
        }
    },
    data(){
        return{
            pro_box: false,
            longText: longText,
        }
    },
    computed:{
        iframeSrc(){
            return new URL(`./privacy.html`, import.meta.url).href
        }
    },
    methods:{

    },

}
</script>


<style scoped>
.protocol{
    width: 154px;
    height: 17px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
}
.btn{
    position: relative;
    height: 17px;
    width: 17px;
    transform: translateY(.5px);
    overflow: hidden;
}
.text{
    font-size: 12px;
    display: flex;
    align-items: center;
    color: rgba(153, 156, 160, 1);
}
.text div{
    flex-shrink: 0;
}
.a{
    color: rgba(78, 70, 180, 1);
}
.check-square{
    transition: .3s;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    height: 15px;
    width: 15px;
    background: url('../../assets/checkSquare.svg') center center / 100% no-repeat;
}
.check-square_{
    transition: .3s;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    height: 15px;
    width: 15px;
    background: url('../../assets/checkSquare_.svg') center center / 100% no-repeat;
}
.fade-enter-from,
.fade-leave-to {
    opacity: .0;
}

.proBox{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 999;
    display: flex;
    flex-direction: column;
}
.header{
    height: 50Px;
    /* background-color: blue; */
    box-shadow: 0 9px 9px rgba(0, 0, 0, .05);
    display: flex;
    align-items: center;
    padding-left: 20Px;
    font-size: 16Px;
}
.content{
    flex: 1;
    overflow: auto;
    white-space: pre-wrap;
    text-align: center;
    line-height: 30px;
    overflow: hidden;
}
iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>