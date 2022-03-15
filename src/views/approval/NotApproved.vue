<template>
  <el-table :data="tableData" style="width: 100%" stripe>
    <el-table-column prop="type" label="任务类型" width="300" fit/>
    <el-table-column prop="createDate" label="创建时间" width="450"/>
    <el-table-column prop="applicantId" label="申请人学号（账号）" width="300" fit/>
    <el-table-column prop="applicantName" label="申请人姓名" width="300" fit/>
    <el-table-column fixed="right" label="操作" width="120">
      <template #default="scope">
        <el-button type="text" size="small" @click="getDetail(scope.row)"
        >查看详情
        </el-button
        >
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="detailVisible">
    <el-form>
      <el-form-item>
        <el-descriptions title="任务详情" :column="2" border>
          <el-descriptions-item label="任务编号：">{{ taskDetail.applicationId }}</el-descriptions-item>
          <el-descriptions-item label="任务类型：">{{ taskDetail.type }}</el-descriptions-item>
          <el-descriptions-item label="发起人：">{{ taskDetail.applicantId }}</el-descriptions-item>
          <el-descriptions-item label="审批人：" v-if="taskDetail.approvalId">{{ taskDetail.approvalId }}
          </el-descriptions-item>

          <el-descriptions-item label="宿管：" v-if="taskDetail.dormkeeperId">{{ taskDetail.dormkeeperId }}
          </el-descriptions-item>
          <el-descriptions-item label="辅导员：" v-if="taskDetail.counselorId">{{ taskDetail.counselorId }}
          </el-descriptions-item>
          <el-descriptions-item label="宿舍公寓领导：" v-if="taskDetail.dormmanagerId">{{ taskDetail.dormmanagerId }}
          </el-descriptions-item>


          <el-descriptions-item label="晚归日期：" v-if="taskDetail.lateDate">{{ taskDetail.lateDate }}
          </el-descriptions-item>
          <el-descriptions-item label="描述：">{{ taskDetail.message }}</el-descriptions-item>
          <el-descriptions-item label="附件：" v-if="taskDetail.fileAddr">
            <el-button @click="downLoad">点击下载</el-button>
          </el-descriptions-item>
        </el-descriptions>
      </el-form-item>

      <el-form-item label="下一级审批人" v-if="counselorVisible">
        <el-select v-model="checkoutForm.counselorId" placeholder="选择辅导员">
          <el-option
              v-for="item in approvalList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              :disabled="item.disabled"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="下一级审批人" v-if="dormManagerVisible">
        <el-select v-model="checkoutForm.dormmanagerId" placeholder="选择公寓领导">
          <el-option
              v-for="item in approvalList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              :disabled="item.disabled"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit">同意申请</el-button>
        <el-button type="danger" @click="deny">拒绝申请</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

</template>

<script>
import request from "../../utils/request";
import {ElMessage} from "element-plus";

export default {
  name: "NotApproved",
  created() {
    this.load();
  },

  data() {
    return {
      tableData: [],
      detailVisible: false,
      taskDetail: {},
      checkoutForm: {},
      approvalList: [],
      counselorVisible: false,
      dormManagerVisible: false
    }
  },
  methods: {
    downLoad() {
      window.open(this.taskDetail.fileAddr);
    },
    submit() {
      if (this.taskDetail.applicationId.substring(0, 4) === 'tssq') {
        if (this.counselorVisible===true&&this.dormManagerVisible===false) {
          request.post("/checkout/updCheckoutCounselor", this.checkoutForm).then(res => {

          });
        }else if (this.dormManagerVisible===true&&this.counselorVisible===false) {
          request.post("/checkout/updDormManager",this.checkoutForm).then(res={
          })
        }else if (this.dormManagerVisible === false && this.counselorVisible === false) {
          request.get("/checkout/managerApprove", {
            params:{
              applicationId: this.taskDetail.applicationId
            }
          }).then(res=>{
            console.log(res);
          })
        }


      } else {
        request.get("/announce/submit",{
          params:{
            applicationId: this.taskDetail.applicationId
          }
        }).then(res => {
          if (res.code === 666) {
            ElMessage.success(res.data);
          } else ElMessage.error("审批失败");
        })
        this.taskDetail = {};
        this.counselorVisible = false;
        this.dormManagerVisible = false;
        this.detailVisible = false;
      }
      location.reload();
    },
    deny() {
      request.get("/announce/deny",{
        params:{
          applicationId: this.taskDetail.applicationId
        }
      }).then(res => {
        if (res.code === 666) {
          ElMessage.success(res.data);
        } else ElMessage.error("审批失败");
        this.dialogVisible = false;
        location.reload();
      })
    },
    getDetail(row) {
      this.taskDetail = {};
      request.get("/announce/submitDetail", {
        params: {
          id: row.applicationId
        }
      }).then(res => {
        if (res.code === 666) {
          this.taskDetail = res.data;
          if (res.data.applicationId.substring(0, 4) === 'tssq') {
            this.checkoutForm = res.data;
            if (this.taskDetail.counselorId === null) {
              request.get("/checkout/getCounselor").then(res => {
                this.approvalList = res.data;
                this.counselorVisible = true;
                this.dormManagerVisible = false;
              });
            } else if (this.taskDetail.dormmanagerId === null){
              request.get("/checkout/getDormManager").then(res => {
                this.approvalList = res.data;
                this.dormManagerVisible = true;
                this.counselorVisible = false;
              });
            }
          }
          this.taskDetail.type = row.type;
          console.log(this.taskDetail);
          this.detailVisible = true;
        } else ElMessage.error("获取详情失败，请重试");
      })


    },
    load() {
      request.get("/announce/getNotApprovedTaskList", {
        params: {
          id: sessionStorage.getItem("user")
        }
      }).then(res => {
        if (res.code === 666) {
          this.tableData = res.data;
        } else ElMessage.error("获取列表失败");

      })
    },

  }
}
</script>

<style scoped>

</style>