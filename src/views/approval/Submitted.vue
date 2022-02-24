<template>
  <el-table :data="tableData" style="width: 100%" stripe >
    <el-table-column prop="type" label="任务类型" width="300" fit />
    <el-table-column prop="createDate" label="创建时间" width="450"/>
    <el-table-column prop="condition" label="任务状态" width="300" fit/>
    <el-table-column fixed="right" label="操作" width="120">
      <template #default="scope">
        <el-button type="text" size="small" @click="seeDetail(scope.row)"
        >查看详情</el-button
        >
      </template>
    </el-table-column>

  </el-table>

  <el-dialog v-model="detailVisible">
    <el-form>
      <el-form-item>
        <el-descriptions title="任务详情" :column="2" border>
          <el-descriptions-item label="任务编号：">{{taskDetail.applicationId}}</el-descriptions-item>
          <el-descriptions-item label="任务类型：">{{taskDetail.type}}</el-descriptions-item>
          <el-descriptions-item label="发起人：">{{taskDetail.applicantId}}</el-descriptions-item>
          <el-descriptions-item label="审批人：" v-if="taskDetail.approvalId">{{taskDetail.approvalId}}</el-descriptions-item>

          <el-descriptions-item label="宿管：" v-if="taskDetail.dormkeeperId">{{taskDetail.dormkeeperId}}</el-descriptions-item>
          <el-descriptions-item label="辅导员：" v-if="taskDetail.counselorId">{{taskDetail.counselorId}}</el-descriptions-item>
          <el-descriptions-item label="宿舍公寓领导：" v-if="taskDetail.dormmanagerId">{{taskDetail.dormmanagerId}}</el-descriptions-item>


          <el-descriptions-item label="晚归日期：" v-if="taskDetail.lateDate">{{taskDetail.lateDate}}</el-descriptions-item>
          <el-descriptions-item label="描述：">{{taskDetail.message}}</el-descriptions-item>
          <el-descriptions-item label="附件：" v-if="taskDetail.fileAddr"><el-button @click="downLoad">点击下载</el-button></el-descriptions-item>
        </el-descriptions>
      </el-form-item>
    </el-form>

  </el-dialog>

</template>

<script>
import request from "../../utils/request";
import {ElMessage} from "element-plus";
export default {
  name: "Submitted",
  created() {
    this.load();
  },

  data(){
    return{
      tableData: [],
      taskDetail: {},
      detailVisible: false
    }
  },
  methods:{
    downLoad() {
      window.open(this.taskDetail.fileAddr);
    },
    seeDetail(row) {
      request.get("/announce/submitDetail",{
        params:{
          id: row.applicationId
        }
      }).then(res=>{
        if (res.code === 666) {
          this.taskDetail = res.data;
          this.taskDetail.type = row.type;
        }else ElMessage.error("获取详情失败，请重试");
      })
      this.detailVisible = true;
    },
    load() {
      request.get("/announce/getSubmittedTaskList", {
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