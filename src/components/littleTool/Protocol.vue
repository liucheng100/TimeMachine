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
            <div class="a">隐私政策</div>
        </div>
    </div>
</template>

<script>
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
}
.btn{
    position: relative;
    height: 17px;
    width: 17px;
    transform: translateY(.5px);
}
.text{
    font-size: 12px;
    display: flex;
    align-items: center;
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
</style>