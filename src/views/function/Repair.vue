<template>

  <!--    做到这 喝多了 继续做 后端接口也还没写 -->
  <el-form
      ref="ruleFormRef"
      :model="repairForm"
      status-icon
      label-width="100px"
      class="demo-ruleForm"
  >
    <el-form-item label="申请人" prop="pass">
      <el-input
          v-model="repairForm.applicantId"
          type="text"
          autocomplete="off"
          disabled
      ></el-input>
    </el-form-item>
    <el-form-item label="情况概述" prop="checkPass">
      <el-input
          v-model="repairForm.message"
          type="textarea"
          :rows="10"
          autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label="现场图片" prop="现场图片">
      <el-upload
          action="http://localhost:8081/icon/upload"
          :on-success="setThisUrl"
      >
        <el-button type="primary">点击上传</el-button>
        <template #tip>
        </template>
      </el-upload>
    </el-form-item>

    <el-form-item label="选择审批人">
      <el-select v-model="repairForm.approvalId" placeholder="选择修理工">
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
      <el-button type="primary"
                 @click="submitForm"
      >确定提交
      </el-button
      >
    </el-form-item>
  </el-form>


</template>

<script>
import request from "../../utils/request";
import {ElMessage} from "element-plus";

export default {
  created() {
    this.getRepairer();
  },

  name: "Repair",
  data() {
    return {
      repairForm: {
        applicantId: sessionStorage.getItem("user"),
      },
      approvalList: []
    }
  },
  methods: {
    setThisUrl(res) {
      this.repairForm.fileAddr = res.data;
    },
    submitForm() {
      if (this.repairForm.approvalId === undefined) {
        ElMessage.error("必须选择审批人");
      } else {
        this.repairForm.aplicationId = '';
        request.put("/repair/insRepair", this.repairForm).then(res => {
          if (res.code === 666) {
            ElMessage.success(res.data);
            this.$router.push('/appSubmitted');
          } else ElMessage.error(res.msg)
        })
      }

    },
    getRepairer() {
      request.get("/repair/getAllRepairer").then(res => {
        console.log(res);
        this.approvalList = res.data;
      });
    }
  }
}
</script>

<style scoped>

</style>