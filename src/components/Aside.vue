<template>
  <div>
    <el-menu
        style="height: calc(100vh - 60px)"
        :default-active="this.activeIndex"
        :default-openeds="this.opends"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"

    >
      <el-sub-menu index="1" >
        <template #title>
          <el-icon><location /></el-icon>
          <span>信息管理</span>
        </template>
          <el-menu-item index="/personalInfo" @click="this.$router.push('/personalInfo')">个人信息</el-menu-item>
          <el-menu-item v-if="studentManageVisible" index="/studentDetail" @click="this.$router.push('/studentDetail')">学生管理</el-menu-item>
          <el-menu-item v-if="workerManageVisible" index="/workerDetail" @click="this.$router.push('/workerDetail')">员工管理</el-menu-item>

      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <el-icon><document /></el-icon>
          <span>日常功能</span>
        </template>
        <el-menu-item index="/returnLate" @click="this.$router.push('/returnLate')">晚归申请</el-menu-item>
        <el-menu-item index="2-2">水电维修</el-menu-item>
        <el-menu-item index="2-3">宿舍送水</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="3" >
        <template #title>
          <el-icon><setting /></el-icon>
          <span>通知审批</span>
        </template>
        <el-menu-item index="3-1">待处理
          <el-tag class="ml-2" type="danger" size="small" style="margin-left: 5px">99</el-tag>
        </el-menu-item>
        <el-menu-item index="3-2">已处理</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="4">
        <template #title>
          <el-icon><icon-menu /></el-icon>
          <span>其他功能</span>
        </template>
        <el-menu-item index="4-1">退宿申请</el-menu-item>
        <el-menu-item index="4-2">开学入住登记</el-menu-item>
        <el-menu-item index="4-3">期末离宿登记</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>


</template>



<script>
import request from "../utils/request";

export default {
  data() {
    return {
      studentManageVisible: false,
      workerManageVisible: false,
      activeIndex: '',
      opends: ['1','3'],
    };
  },
  created() {
    this.show();
    /*
        this.getUserInfo();
    */
    this.activeIndex = this.$route.path;
  },
  methods: {
    show() {
      switch (sessionStorage.getItem('role')) {
        case 'student':
          this.studentManageVisible = false;
          this.workerManageVisible = false;
          break;
        case 'worker':
          this.studentManageVisible = true;
          this.workerManageVisible = false;
          break;
        case 'admin':
          this.studentManageVisible = true;
          this.workerManageVisible = true;
      }
    },
    getUserInfo() {
      request.get("/userRole/getInfo", {
        params: {
          id: sessionStorage.getItem("user")
        }
      }).then(res => {
        if (res.code === 666) {
          /*if (res.data.role === 'student') {
            this.studentManageVisible = false;
            this.workerManageVisible = false;
          }else if (res.data.role === ''){}*/
        }
      })
    }
  },

  components:{
    Location,
    Document,
    IconMenu,
    Setting,

  }

}
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
} from '@element-plus/icons-vue'
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>



<style></style>
