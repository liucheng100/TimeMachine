<template>
  <div class="login">
    <div class="content">
      <p class="title">天津大学党建系统后台</p>
      <p class="hint">欢迎回来，请登录您的账号</p>
      <p class="tag">用户名</p>
      <el-input v-model="account" placeholder="请输入您的用户名" class="input">
        <template #prefix>
          <el-icon class="el-input__icon"
            ><img src="../../assets/account.png" alt="icon" class="icon"
          /></el-icon>
        </template>
      </el-input>
      <p class="tag">密码</p>
      <el-input
        v-model="password"
        type="password"
        show-password
        placeholder="请输入您的密码"
        class="input"
        @keypress.enter="toLogin"
      >
        <template #prefix>
          <el-icon class="el-input__icon"
            ><img src="../../assets/password.png" alt="icon" class="icon"
          /></el-icon>
        </template>
      </el-input>
      <el-button
        auto-insert-space
        class="loginBtn redBtn"
        @click="toLogin"
        :loading="loginLoading"
        >登录</el-button
      >
    </div>
  </div>
</template>

<script>
import { getToken, setToken } from "@/utils/auth";
import { login } from "@/api/login";
export default {
  data() {
    return {
      account: "",
      password: "",
      loginLoading: false,
    };
  },
  methods: {
    toLogin() {
      if (!this.account) {
        ElMessage.warning("请输入您的用户名");
        return;
      }
      if (!this.password) {
        ElMessage.warning("请输入您的密码");
        return;
      }
      this.loginLoading = true;
      login({ account: this.account, pass: this.password })
        .then(({ data: { code: code, msg: msg }, ...res }) => {
          if (code === 0) {
            ElMessage.success("登录成功");
            setToken(res.headers["token"]);
            this.loginLoading = false;
            this.$router.push(this.$route.query.from || "/");
          } else {
            ElMessage.error(msg);
            this.password = "";
            this.loginLoading = false;
          }
        })
        .catch(() => {
          ElMessage.error("登录失败");
          this.loginLoading = false;
        });
    },
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
  background-color: #fafafa;
  display: flex;
  justify-content: center;
}
.content {
  width: 815px;
  height: 100%;
  background-color: white;
  padding: 160px 170px;
}
.input {
  height: 42px;
  font-size: 18px;
  margin-bottom: 24px;
}
.icon {
  width: 1em;
  height: 1em;
}
.title {
  color: #2f2f2f;
  font-size: 28px;
  margin-bottom: 12px;
}
.hint {
  color: #9f9f9f;
  font-size: 20px;
  margin-bottom: 64px;
}
.tag {
  color: #505050;
  font-size: 20px;
  margin-bottom: 12px;
}
.loginBtn {
  margin-top: 120px;
  width: 100%;
  height: 48px;
  border-radius: 4px;
}
</style>