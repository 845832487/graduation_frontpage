<template>
  <div>
    <el-menu
        style="height: calc(100vh - 60px)"
        default-active="1-2"
        default-openeds="3,1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>信息管理</span>
        </template>
          <el-menu-item index="1-1">个人信息</el-menu-item>
          <el-menu-item index="1-2">学生管理</el-menu-item>
          <el-menu-item index="1-3">员工管理</el-menu-item>

      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <el-icon><document /></el-icon>
          <span>日常功能</span>
        </template>
        <el-menu-item index="2-1">晚归申请</el-menu-item>
        <el-menu-item index="2-2">水电维修</el-menu-item>
        <el-menu-item index="2-3">宿舍送水</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="3" >
        <template #title>
          <el-icon><setting /></el-icon>
          <span>通知审批</span>
        </template>
        <el-menu-item index="3-1">待处理
          <el-tag class="ml-2" type="danger" size="small" style="margin-left: 5px">{99}</el-tag>
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
export default {
  components:{
    Location,
    Document,
    IconMenu,
    Setting
  }
}
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
} from '@element-plus/icons-vue'

</script>



<style></style>
