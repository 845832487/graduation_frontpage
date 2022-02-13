<template>

<!--    做到这 喝多了 继续做 后端接口也还没写 -->
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        label-width="100px"
        class="demo-ruleForm"
    >
      <el-form-item label="申请人" prop="pass">
        <el-input
            v-model="ruleForm.applicantId"
            type="text"
            autocomplete="off"
            disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="申请原因" prop="checkPass" >
        <el-input
            v-model="ruleForm.message"
            type="textarea"
            :rows="10"
            autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="上传证明" prop="上传证明">
        <el-upload>123</el-upload>
      </el-form-item>

      <el-form-item label="晚归日期">
        <el-date-picker
          type="date"
          placeholder="选择晚归日期"
          >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
        >Submit</el-button
        >
        <el-button >Reset</el-button>
      </el-form-item>
    </el-form>


</template>

<script>
export default {
  name: "returnLate",
  data() {
    return{
      ruleForm: {
        applicantId: sessionStorage.getItem("user")

      }
    }
  }
}
</script>

<style scoped>

</style>