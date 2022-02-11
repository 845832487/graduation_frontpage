<template>
  <div>
    <el-container>
      <el-header><Header/></el-header>
      <div>
        <el-container>
          <el-aside width="200px" ><Aside/></el-aside>
          <el-main><router-view/></el-main>
        </el-container>
      </div>
    </el-container>
  </div>
</template>

<script>
import Header from "../components/Header";
import Aside from "../components/Aside";
import request from "../utils/request";
export default {
  name: "Layout",
  components: {
    Header,
    Aside
  },
  mounted() {
    this.checkAuth();
  },

  methods:{
    checkAuth() {
      request.get("/loginPage/checkAuth", {
        params: {
          userId: sessionStorage.getItem("user")
        }
      }).then(res => {
        if (res.code !== 666) {
          ElMessage.error(res.msg);
          sessionStorage.removeItem("auth");
          sessionStorage.removeItem("user");
          this.$router.push("/login");
        }
      });
    },
  }
}
window.addEventListener("beforeunload", function (e) {
  const confirmationMessage = "\o/";
  (e || window.event).returnValue = confirmationMessage; // Gecko and Trident
  return confirmationMessage; // Gecko and WebKit
});

</script>

<style scoped>

</style>