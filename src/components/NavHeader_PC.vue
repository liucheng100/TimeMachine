<template>
    <div class="nav-header">
        <img src="../assets/Group13.svg" class="more"/>
        <div class="second-box-nav">
            <p class="go-to-phone">前往手机端浏览作品</p>
            <p v-if="!is_login" class="login-text" @click="emits('login')">登录</p>
            <p v-else class="personal-center">个人中心</p>
        </div>
    </div>
</template>

<script setup>

const props = defineProps(["is_login"])

</script>
<style scoped>
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