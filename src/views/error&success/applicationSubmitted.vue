<template>
  <el-result
      icon="success"
      title="办理成功"
      sub-title="可在已提交菜单查看办理记录"
  >
    <template #extra>
      <el-button type="primary" @click="$router.push('/submitted')">已提交菜单</el-button>
    </template>
  </el-result>
</template>

<script>
export default {
  name: "applicationSubmitted"
}
</script>

<style scoped>

</style>