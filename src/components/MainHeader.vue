<template>
  <div class="header noSelect">
    <p class="title">
      <span>{{ $route.matched[0]?.meta.title }}</span> -
      <span style="cursor: pointer" @click="goBack">{{
        $route.meta.title
      }}</span>
    </p>
    <div>
      <el-popconfirm
        title="您确定要退出登录吗？"
        confirm-button-text="确认"
        cancel-button-text="取消"
        @confirm="logout"
        width="200px"
      >
        <template #reference>
          <div class="user">
            <p>你好，管理员</p>
            <img src="../assets/x.jpg" />
          </div>
        </template>
      </el-popconfirm>
    </div>
  </div>
</template>

<script>
import getAssetsFile from "@/utils/pub-use";
import { removeToken } from "@/utils/auth";
export default {
  data() {
    return {
      isResizing: false,
      login: false,
      isCursor: false,
    };
  },
  methods: {
    getAssetsFile(url) {
      return getAssetsFile(url);
    },
    logout() {
      ElMessage.success("退出登录成功");
      removeToken();
      this.$router.push("/login");
    },
    goBack() {
      if (this.$route.meta.title?.split("-").length >= 2) {
        if (this.$router.options.history.state.back) {
          this.$router.back();
        } else {
          this.$router.push("/");
        }
      }
    },
  },
};
</script>

<style scoped>
.header {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 100px;
}
.title {
  font-size: 26px;
  color: #2f2f2f;
}
.user {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.user p {
  font-size: 24px;
}
.user img {
  margin-left: 24px;
  border-radius: 50%;
  width: 50px;
  height: 50px;
}
</style>