<template>
<!--  <div style="height: 50px;line-height: 50px;border-bottom: 1px solid;display: flex">
    <div style="width: 200px;padding-left: 30px;font-weight: bold;color: cornflowerblue">后台管理</div>
    <div style="flex: 1"></div>
    <div style="width: 150px">
      <el-dropdown split-button type="primary" @click="handleClick">
        用户名
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
            <el-dropdown-item>Action 4</el-dropdown-item>
            <el-dropdown-item>Action 5</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>-->

    <el-row style="padding-top: 10px;border-bottom: black solid thin;padding-bottom: 15px">
      <el-col :span="4"><div style="color: dodgerblue;font-weight: bold;padding-left: 30px;display: flex;padding-top: 10px">宿舍管理系统</div></el-col>
      <el-col :span="16"></el-col>
      <el-col :span="4">
        <el-dropdown style="padding-top: 10px">
        <span class="el-dropdown-link">
          用户名
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>注销用户</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-col>
    </el-row>
</template>
<script>
export default {
  name: "Header",
  components: {ArrowDown}
};
import {ArrowDown} from "@element-plus/icons";
</script>
<style scoped>

</style>
