<template>
    <div class="nav-header">
        <img src="../assets/Group13.svg" class="more"/>
        <div class="second-box-nav">
            <p class="go-to-phone">前往手机端浏览作品</p>
            <p v-show="!is_login" class="login-text" @click="is_need_login = !is_need_login">登录</p>
            <div v-show="is_login" class="username"
            @mouseenter="is_logOut = true" 
            @mouseleave="is_logOut = false"
            >
                <p>{{username}}</p>
                <transition name="fade">
                    <p class="logout" v-show="is_logOut" @click="logOut()">退出登录</p>
                </transition>
            </div>

        </div>
        <div class="mask" v-show="is_need_login" @click="changeNeedLogin()">
            <LoginPC @tokenGet="is_login = true"/>
        </div>
    </div>
</template>

<script setup>
import LoginPC from "@/components/PC/LoginPC.vue"
import { getToken, getUserId } from "@/utils/auth";
import { ref } from "vue"
import { removeToken } from "@/utils/auth";
import { getUserInfo } from "@/api/login"
const username = ref("");
const usernameOld = "";
const is_login = ref(false);
const is_need_login = ref(false);
const is_logOut = ref(false);

if(getToken()){
    getUserInfo(getUserId())
    .then(res => username.value = res.data.username);
}


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
   
    justify-content: flex-end;
}
.login-text, .go-to-phone, .personal-center{
    margin-right:8px;
    cursor:pointer;
    display:flex;
    justify-content: center;
    align-items: center;
}

.username{
    position: relative;
    margin-right:8px;
    display:flex;
    justify-content: center;
    align-items: center;
}
.logout{
    cursor:pointer;
    position:absolute;
    top:100%;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    z-index:100;
    background:#FFFFFF;
    color:#000000;
    padding:2px;
    border-radius: 2px;
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