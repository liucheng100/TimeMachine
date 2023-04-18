<template>
    <div class="nav-header">
        <img src="../assets/Group13.svg" class="more"/>
        <div class="second-box-nav">
            <p class="go-to-phone">前往手机端浏览作品</p>
            <p v-show="!is_login" class="login-text" @click="is_need_login = !is_need_login">登录</p>
            <p v-show="is_login" class="personal-center">个人中心</p>
            <p v-show="is_login" class="personal-center" @click="logOut()">退出登录</p>
        </div>
        <div class="mask" v-show="is_need_login" @click="changeNeedLogin()">
            <LoginPC @tokenGet="is_login = true"/>
        </div>
    </div>
</template>

<script setup>
import LoginPC from "@/components/PC/LoginPC.vue"
import { ref } from "vue"
import { removeToken } from "@/utils/auth";

const is_login = ref(false);
const is_need_login = ref(false);

function changeLogin(){
    is_login.value = !is_login.value;
}
function changeNeedLogin(){
    is_need_login.value = !is_need_login.value;
    console.log(is_need_login.value);
}

function logOut(){
    removeToken();
    location.reload();
}
</script>
<style scoped>
.mask{
    position: fixed;
    z-index:50;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:#00000020;
}
.nav-header{
    background:#000000;
    height:12.5px;
    display:flex;
    align-items: center;
    justify-content: space-between;
}
.more{
    margin-left:1.5%;
    height:8px;
}
.second-box-nav{
    display: flex;
    font-size:4px;
    color:#FFFFFF;
}
.login-text, .go-to-phone, .personal-center{
    margin-right:8px;
    cursor:pointer;
}
</style>