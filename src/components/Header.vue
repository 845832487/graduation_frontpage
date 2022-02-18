<template>
    <el-row style="padding-top: 10px;border-bottom: black solid thin;padding-bottom: 15px">
      <el-col :span="4"><div style="color: dodgerblue;font-weight: bold;padding-left: 30px;display: flex;padding-top: 10px">宿舍管理系统</div></el-col>
      <el-col :span="16"></el-col>
      <el-col :span="4">
        <el-dropdown style="padding-top: 10px">
          用户管理
        <span class="el-dropdown-link">
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="$router.push('/personalInfo')">个人信息</el-dropdown-item>
              <el-dropdown-item @click="logout">推出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-col>
    </el-row>
</template>
<script>
import router from "../router";


export default {
  name: "Header",
  components: {ArrowDown},


  data(){
    return{
      userName: '用户名',
    }
  },
  methods: {

    logout() {
      sessionStorage.removeItem("auth");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("role");
      router.push("/login");
      ElMessage.success("注销用户成功");
    }
  }
};
import {ArrowDown} from "@element-plus/icons";
import {ElMessage} from "element-plus";



</script>
<style scoped>

</style>
