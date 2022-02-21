<template>
  <el-table :data="tableData" style="width: 100%" stripe>
    <el-table-column prop="type" label="任务类型" width="300" fit />
    <el-table-column prop="createDate" label="创建时间" width="450"/>
    <el-table-column prop="applicantId" label="申请人" width="300" fit/>
    <el-table-column prop="approvalId" label="处理人" width="300" fit/>
    <el-table-column fixed="right" label="操作" width="120">
      <template #default>
        <el-button type="text" size="small"
        >查看详情</el-button
        >
      </template>
    </el-table-column>
  </el-table>

</template>

<script>
import request from "../../utils/request";
import {ElMessage} from "element-plus";
export default {
  name: "Approved",
  created() {
    this.load();
  },

  data(){
    return{
      tableData: []
    }
  },
  methods:{
    load() {
      request.get("/announce/getApprovedTaskList", {
        params:{
          id: sessionStorage.getItem("user")
        }
      }).then(res=>{
        if (res.code === 666) {
          this.tableData = res.data;
        }else ElMessage.error("获取列表失败");

      })
    },

  }
}
</script>

<style scoped>

</style>