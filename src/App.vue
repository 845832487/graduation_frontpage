<template>
  <div>
    <router-view/>
  </div>

<!--  <div>
    <el-container>
      <el-header><Header/></el-header>
      <div>
        <el-container>
          <el-aside width="200px" ><Aside/></el-aside>
          <el-main><router-view/></el-main>
        </el-container>
      </div>
    </el-container>
  </div>-->



</template>

<script>
import {ElMessage} from 'element-plus'
export default {
  created() {
    this.checkAuth();
  },

  methods: {
    checkAuth() {
      if (localStorage.getItem("auth") == null) {
        ElMessage.info("尚未登录，跳转登录页面")
        this.$router.push("/login");
      }
    }
  }
}

</script>




<style>

</style>
