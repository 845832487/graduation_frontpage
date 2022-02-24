<template>

  <!--    做到这 喝多了 继续做 后端接口也还没写 -->
  <el-form
      ref="ruleFormRef"
      :model="checkinForm"
      status-icon
      label-width="100px"
      class="demo-ruleForm"
  >
    <el-form-item>
      <div style="font-size: 25px;font-weight: bold;margin: 5px">开学入住登记</div>
    </el-form-item>
    <el-form-item label="申请人" prop="pass">
      <el-input
          v-model="checkinForm.applicantId"
          type="text"
          autocomplete="off"
          disabled
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

    <el-form-item label="选择审批人">
      <el-select v-model="checkinForm.approvalId" placeholder="选择宿管">
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

  name: "TermStartCheckin",
  data() {
    return{
      checkinForm: {
        applicantId: sessionStorage.getItem("user"),
      },
      approvalList: []
    }
  },
  methods:{
    setThisUrl(res) {
      this.checkinForm.fileAddr = res.data;
    },
    submitForm() {
      if (this.checkinForm.approvalId === undefined) {
        ElMessage.error("必须选择审批人");
      } else {
        this.checkinForm.aplicationId = '';
        request.put("/termStartCheckin", this.checkinForm).then(res => {
          if (res.code === 666) {
            ElMessage.success(res.data);
            this.$router.push('/appSubmitted');
          } else ElMessage.error(res.msg)
        });
      }

    },
    getDormKeeper() {
      request.get("/returnLate/getAllDormKeeper",{
        params:{
          id: sessionStorage.getItem("user")
        }
      }).then(res => {
        this.approvalList = res.data;
      });
    }
  }
}
</script>

<style scoped>

</style>