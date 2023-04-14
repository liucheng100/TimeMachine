<template>
  <div class="login">
    <p class="title">登录方寸 · 流年</p>
    <div class="content">
      <!-- <p class="hint">欢迎回来，请登录您的账号</p> -->
      <form>
        <p class="tag">方寸 · 流年账号</p>
        <el-input v-model="account" @blur="checkEmail" placeholder="请输入邮箱..." class="input">
        </el-input>
        <p class="tag">密码</p>
        <el-input v-model="password" type="password" show-password placeholder="请输入密码..." class="input"
          @keypress.enter="toLogin">
        </el-input>
      </form>
      <div class="other-bar">
        <Protocol class="proto" @check="ON = !ON" :ON="ON"></Protocol>
        <div @click="$router.replace('resetPwd')" class="forget">忘记密码</div>
      </div>
      <el-button auto-insert-space class="loginBtn redBtn" @click="toLogin" :loading="loginLoading">登录</el-button>

      <el-button v-if="0" auto-insert-space class="loginBtn redBtn" @click="toLogin('admin')"
        :loading="loginLoading">测试按钮: 以管理者身份进入</el-button>
      <div class="other-bar">
        <div @click="$router.replace('login')" class="other-way">
          天外天账号登陆
        </div>
        <div @click="$router.replace('signup')" class="forget">注册方寸 · 流年</div>
      </div>
    </div>
  </div>
</template>
  
<script>
import { getToken, setToken, setAdmin, setUserId } from "@/utils/auth";
import { loginA } from "@/api/login";
export default {
  data() {
    return {
      ON: false,
      account: "",
      password: "",
      loginLoading: false,
    };
  },
  methods: {
    toLogin(op) {
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
    if (getToken()) {
      this.$router.push(this.$route.query.from || "/");
    }
  },
};
</script>
  
<style scoped>
.login {
  width: 100%;
  height: 100vh;
  background-color: white;
  position: relative;
}

.content {
  padding: 0 20px;
  width: 100%;
  height: 334px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  display: flex;
  flex-direction: column;
  box-shadow: 0 -30px 20px rgba(255, 255, 255, 0.8);
}


.input {
  height: 48px;
  font-size: 12px;
  margin-bottom: 20px;
  width: 100%;
  background: #FFFFFF;
  /* Mid-shadow */
  box-shadow: 0px 2px 30px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
}

.icon {
  width: 1em;
  height: 1em;
}

.title {
  color: #1F1F1F;
  font-size: 32px;
  font-weight: 600;
  position: absolute;
  top: 35px;
  left: 20px;
}

.hint {
  color: #9f9f9f;
  font-size: 20px;
  margin-bottom: 64px;
}

.tag {
  color: #4E46B4;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;
  height: 28px;
}

.loginBtn {
  width: 100%;
  height: 48px !important;
  border-radius: 6px;
  margin: 0;
  margin-bottom: 20px;
  flex-shrink: 0;
}

.proto {
  align-self: center;
}

.other-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.other-way {
  color: #4E46B4;
  font-size: 12px;
}

.forget {
  color: #4E46B4;
  font-size: 12px;
}
</style>