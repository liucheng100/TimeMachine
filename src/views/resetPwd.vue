<template>
  <div class="login">
    <p class="title">忘记密码</p>
    <div class="content">
      <!-- <p class="hint">欢迎回来，请登录您的账号</p> -->
      <form>
        <p class="tag">邮箱</p>
        <el-input v-model="account" @blur="checkEmail" placeholder="请输入邮箱..." class="input">
        </el-input>
        <p class="tag">验证码</p>
        <div class="flex">
          <div class="left-input">
            <el-input v-model="authcode" placeholder="请输入验证码..." class="input code-input" @keypress.enter="toLogin">
            </el-input>
          </div>
          <div v-if="sendable" @click="sendCode" class="right-sender">发送验证码</div>
          <div v-else class="right-sender resend">重发: {{ restTime }}s</div>
        </div>
        <p class="tag">新密码</p>
        <el-input v-model="password" type="password" show-password placeholder="请输入新密码..." class="input"
          @keypress.enter="toLogin">
        </el-input>
      </form>
      <Protocol class="proto" @check="ON = !ON" :ON="ON"></Protocol>
      <el-button auto-insert-space class="loginBtn redBtn" @click="signUp" :loading="loginLoading">
        修改密码
      </el-button>

      <el-button v-if="0" auto-insert-space class="loginBtn redBtn" @click="toLogin('admin')"
        :loading="loginLoading">测试按钮: 以管理者身份进入</el-button>
      <div class="other-bar">
        <div @click="$router.replace('login')" class="other-way">
          天外天账号登陆
        </div>
        <div @click="$router.replace('loginA')" class="forget">返回邮箱登陆</div>
      </div>
    </div>
  </div>
</template>
  
<script>
import { getToken, setToken, setAdmin, setUserId } from "@/utils/auth";
import { loginA, sendCode, verifyCode, resetPass } from "@/api/login";
export default {
  data() {
    return {
      ON: false,
      account: "",
      password: "",
      authcode: '',
      restTime: 0,
      waitTime: 2,
      sendable: true,
      loginLoading: false,
      interval: 0,
    };
  },
  methods: {
    signUp() {
      if (!this.account) {
        ElMessage.warning("请输入您的邮箱并验证");
        return;
      }
      if (!this.authcode) {
        ElMessage.warning("请输入验证码");
        return;
      }
      if (!this.password) {
        ElMessage.warning("请设置密码");
        return;
      }
      if (!this.ON) {
        ElMessage.warning("请阅读并同意隐私政策");
        return;
      }


      resetPass({
        code: this.authcode,
        newPassword: this.password,
        email: this.account,
      }).then(v => {
        // console.log(v)
        if (!v.code) {
          ElMessage.success('密码修改成功！')
          // 自动登录
          // this.toLogin();
          this.$router.replace('loginA')
        } else {
          ElMessage.error('修改失败: ' + v.description)
        }
      })

    },
    toLogin() {
      loginA({ username: this.account, password: this.password })
        .then(({ data: data, ...res }) => {
          if (data.code === 0) {
            // ElMessage.success("登录成功");
            setUserId(data.data.userId);
            setAdmin(data.data.isAdmin);
            setToken(res.headers["token"]);
            this.$router.push(this.$route.query.from || "/");
          } else {
            ElMessage.error(data.description+': '+data.msg);
          }
        })
        .catch((err) => {
          // console.log(err)
          ElMessage.error("登录失败");
        });
    },
    checkMobile() {
      const reg = /^[1][3|4|5|6|7|8|9][0-9]{9}$/;
      if (!reg.test(this.account) && this.account != '') {
        ElMessage.warning('手机格式不正确')
      }
    },
    checkEmail() {
      const emailPattern = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      // if (!emailPattern.test(this.account) && this.account) {
      //   ElMessage.info('请输入正确的邮箱格式');
      //   return false;
      // }
      if (emailPattern.test(this.account)) {
        return true;
      }
      return false;
    },
    sendCode() {
      if (!this.checkEmail()) {
        ElMessage.warning('请输入正确的邮箱格式')
        return
      }


      this.sendable = false
      this.restTime = this.waitTime
      setTimeout(() => {
        this.sendable = true
        clearInterval(this.interval);
      }, this.waitTime * 1000);
      this.interval = setInterval(() => {
        this.restTime--;
      }, 1000);

      sendCode(this.account).then(v => {
        // console.log(v)
        if (!v.code) {
          ElMessage.success('验证码已发送至邮箱')
        } else {
          ElMessage.error(v.msg)
        }
      })
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
  margin-bottom: 20px;
  align-self: center;
}

.other-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.other-way {
  color: #4E46B4;
  font-size: 12px;
}

.forget {
  color: #4E46B4;
  font-size: 12px;
}

.flex {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.left-input {
  flex: 1;
}

.code-input {
  margin: 0;
}

.right-sender {
  width: 118px;
  height: 48px;
  color: white;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  margin-left: 20px;
  background-color: rgba(78, 70, 180, 1);

}

.resend {
  color: rgba(78, 70, 180, 1);
  ;
  background-color: rgb(228, 227, 244);
}
</style>