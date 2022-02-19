<template>

<!--    做到这 喝多了 继续做 后端接口也还没写 -->
    <el-form
        ref="ruleFormRef"
        :model="returnLateForm"
        status-icon
        label-width="100px"
        class="demo-ruleForm"
    >
      <el-form-item label="申请人" prop="pass">
        <el-input
            v-model="returnLateForm.applicantId"
            type="text"
            autocomplete="off"
            disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="申请原因" prop="checkPass" >
        <el-input
            v-model="returnLateForm.message"
            type="textarea"
            :rows="10"
            autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="上传证明" prop="上传证明">
        <el-upload
            action="http://localhost:8081/icon/upload"
            :on-success="setThisUrl"
        >
          <el-button type="primary">点击上传</el-button>
          <template #tip>
          </template>
        </el-upload>

      </el-form-item>

      <el-form-item label="晚归日期">
        <el-date-picker
            v-model="returnLateForm.lateDate"
          type="date"
          placeholder="选择晚归日期"
          >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="选择审批人">
      <el-select v-model="returnLateForm.approvalId" placeholder="选择宿管">
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
        >确定提交</el-button
        >
      </el-form-item>
    </el-form>


</template>

<script>
import request from "../../utils/request";
import {ElMessage} from "element-plus";
export default {
  created() {
    this.getDormKeeper();
  },

  name: "returnLate",
  data() {
    return{
      returnLateForm: {
        applicantId: sessionStorage.getItem("user"),
      },
      approvalList: []
    }
  },
  methods:{
    setThisUrl(res) {
      this.returnLateForm.fileAddr = res.data;
    },
    submitForm() {
      if (this.returnLateForm.approvalId === undefined || this.returnLateForm.lateDate === undefined) {
        ElMessage.error("必须选择晚归日期以及审批人");
      } else {
        this.returnLateForm.aplicationId = '';
        request.put("/returnLate/insReturnLate", this.returnLateForm).then(res => {
          if (res.code === 666) {
            ElMessage.success(res.data);
            this.$router.push('/appSubmitted');
          } else ElMessage.error(res.msg)
        });
      }

    },
    getDormKeeper() {
      request.get("/returnLate/getAllDormKeeper").then(res => {
        this.approvalList = res.data;
      });
    }
  }
}
</script>

<style scoped>

</style>