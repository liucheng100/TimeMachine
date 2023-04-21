<template>
  <div class="login" @click.stop="0" v-if="is_login == 'login'">
    <div class="input-box">
      <p class=input-title>{{ loginType == 'login'?'天外天账户名':'方寸流年账号' }}</p>
      <input type="text" class="input-self" v-model="account" :placeholder="loginType == 'login'?'学号/昵称/手机号...':'请输入邮箱...'">
    </div>
    <div class="input-box">
      <p class=input-title>{{ "密码" }}</p>
      <input type="password" class="input-self" v-model="password" placeholder="请输入密码...">
    </div>
    <div class="other-bar" v-if="loginType == 'loginA'">
      <div class="proto">
        <img src="@/assets/checkSquare.svg" v-show="!ON" @click="ON = !ON" class="img"/>
        <img src="@/assets/checkSquare_.svg" v-show="ON" @click="ON = !ON" class="img"/>
        <p>我已阅读并同意</p>
        <p class="privacy">隐私政策</p>
      </div>
      <p class="forget" v-show="loginType == 'loginA'" @click="is_login = 'forget'">忘记密码</p>
    </div>
    <div class="proto" v-if="loginType == 'login'">
      <img src="@/assets/checkSquare.svg" v-show="!ON" @click="ON = !ON" class="img"/>
      <img src="@/assets/checkSquare_.svg" v-show="ON" @click="ON = !ON" class="img"/>
      <p>我已阅读并同意</p>
      <p class="privacy" @click="pro_box = !pro_box">隐私政策</p>
    </div>
    <button class="button" @click="toLogin(loginType)">登录</button>
    <div class="other-bar">
      <div class="other-way bottom-text" @click="changeWay(loginType == 'login'?'loginByOther':'loginByTWT')">
        {{ loginType == 'login'?'没有天外天账号？':'天外天账号登录' }}
      </div>
      <p class="forget bottom-text" v-show="loginType == 'login'">忘记密码</p>
      <p class="signup bottom-text" v-show="loginType == 'loginA'" @click="login = 'signUp'">注册方寸流年</p>
    </div>

    <teleport to="body">
      <div class="proBox" v-if="pro_box">
          <div class="header">
              <div @click="pro_box=false" class="back">
                  {{'<返回'}}
              </div>
          </div>
          <div class="content">
              <iframe :src="iframeSrc()"></iframe>
          </div>
      </div>
    </teleport>

  </div>
  <!-- <div v-else-if="login == 'signUp'" class="login" @click.stop="0">
    注册方寸流年  
  </div>
  <div v-else-if="login == 'forget'" class="login" @click.stop="0">
    忘记密码
  </div> -->
</template>
<script>
import { getToken, setToken, setAdmin, setUserId } from "@/utils/auth";
import { loginA, login } from "@/api/login";
export default {
  emits:[
  "tokenGet"
  ],
  data() {
    return {
      ON: false,
      account: "",
      password: "",
      loginLoading: false,
      loginType:'login',
      pro_box:false,
      is_login:'login',

    };
  },
  methods: {
    changeWay(name) {
      switch(name){
        case "loginByTWT":{
          this.loginType = "login";
          return;
        }
        case "loginByOther":{
          this.loginType = "loginA";
          return;
        }
        default:
      }
    },
    iframeSrc(){
      return new URL(`../littleTool/privacy.html`, import.meta.url).href
    },
    toLogin(loginType) {
      // setToken('asdf');
      // if (op == 'admin') {
      //   this.$router.push("/admin");
      //   return;
      // }
      // this.$router.push(this.$route.query.from || "/");
      // return

      if (!this.account) {
        ElMessage.warning("请输入您的账号");
        return;
      }
      if (!this.password) {
        ElMessage.warning("请输入您的密码");
        return;
      }
      if (!this.ON) {
        ElMessage.warning("请阅读并同意隐私政策");
        return;
      }


      this.loginLoading = true;
      if(loginType == "loginA"){
        loginA({ username: this.account, password: this.password })
          .then(({ data: data, ...res }) => {
            if (data.code === 0) {
              ElMessage.success("登录成功");
              setUserId(data.data.userId);
              setAdmin(data.data.isAdmin);
              setToken(res.headers["token"]);
              // console.log(data)
              this.loginLoading = false;
              this.$router.push(this.$route.query.from || "/");
            } else {
              ElMessage.error(data.description+': '+data.msg);
              this.password = "";
              this.loginLoading = false;
            }
          })
          .catch(() => {
            ElMessage.error("登录失败");
            this.loginLoading = false;
          });
      }
      else if(loginType == "login"){
        login({ username: this.account, password: this.password })
          .then(({ data: data, ...res }) => {
            if (data.code === 0) {
              ElMessage.success("登录成功");
              setUserId(data.data.userId);
              setAdmin(data.data.isAdmin);
              setToken(res.headers["token"]);
              // console.log(data)
              this.loginLoading = false;
              location.reload();
              // this.$router.push(this.$route.query.from || "/");
            } else {
              ElMessage.error(data.description+': '+data.msg);
              this.password = "";
              this.loginLoading = false;
            }
          })
          .catch(() => {
            ElMessage.error("登录失败");
            this.loginLoading = false;
          });
      }
    },
    checkEmail() {
      const emailPattern = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!emailPattern.test(this.account) && this.account) {
        ElMessage.info('请输入正确的邮箱格式');
        return false;
      }
      return true;
    }
  },
  created() {
    // if (getToken()) {
    //   this.$router.push(this.$route.query.from || "/");
    // }
   
  },
  mounted(){
    if(getToken()) {
      this.$emit("tokenGet");
    }
  }
};
</script>
  
<style scoped>
.login {
  width: 40%;
  height: 70%;
  background-color: white;
  position: relative;
  position:fixed;
  top:15%;
  left:30%;
  border-radius:5px;
  padding:13px;
  display:flex;
  flex-direction: column;
  align-items: center;
  z-index: 100;
}
.input-box{
  display:flex;
  flex-direction: column;
  width:100%;
}
.input-title{
  font-size: 6px;
  color:#4E46B4;
  margin-bottom:5px;
}
.input-self{
  height:15px;
  padding:3px;
  border:0;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  margin-bottom:5px;
  font-size:4.5px;
}
.proto{
  
  display:flex;
  margin-bottom:5px;
  justify-content: center;
  font-size:4px;
}
.button{
  height:15px;
  width:100%;
  background:#4E46B4;
  color:#FFFFFF;
  border:0;
  border-radius: 2px;
  font-size:6px;
}
.other-bar{
  display:flex;
  width:100%;
  justify-content: space-between;
  color:#4E46B4;
  font-size:4px;
}
.other-way, .forget{
  color:#4E46B4;
  font-size:4px;
}
.bottom-text{
  margin-top:5px;
}
.privacy{
  color:#4E46B4;
  cursor:pointer;
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
  height: 15px;
  /* background-color: blue; */
  box-shadow: 0 9px 9px rgba(0, 0, 0, .05);
  display: flex;
  align-items: center;
  padding-left: 5px;
  font-size:5px;
}
.content{
  flex: 1;
  overflow: auto;
  white-space: pre-wrap;
  text-align: center;
  line-height: 30px;

}
iframe {
width: 100%;
height: 100%;
border: none;
}
</style>