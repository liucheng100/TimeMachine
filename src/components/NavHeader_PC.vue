<template>
    <div class="nav-header">
        <img src="../assets/Group13.svg" class="more"/>
        <div class="second-box-nav">
            <p class="go-to-phone">前往手机端浏览作品</p>
            <p v-show="!is_login" class="login-text" @click="is_need_login = !is_need_login">登录</p>
            <p v-show="is_login" class="personal-center">个人中心</p>
            <p v-show="is_login" class="username" @click="logOut()" 
            @mouseenter="usernameOld = username, username = '退出登录'" 
            @mouseleave="username = usernameOld"
            >{{ username }}</p>
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
    width:25%;
    justify-content: flex-end;
}
.login-text, .go-to-phone, .personal-center{
    margin-right:8px;
    cursor:pointer;
}

.username{
    width:20%;
    cursor:pointer;
}
</style>