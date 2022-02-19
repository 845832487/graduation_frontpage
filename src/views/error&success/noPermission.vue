<template>

  <el-result
      icon="error"
      title="错误"
      sub-title="权限不足，无法访问"
  >
    <template #extra>

    </template>
  </el-result>
</template>

<script>
export default {
  name: "noPermission"
}
</script>

<style scoped>

</style>