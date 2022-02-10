<template>
  <div>
    <el-container>
      <el-header><Header/></el-header>
      <div>
        <el-container>
          <el-aside width="200px" ><Aside/></el-aside>
          <el-main><router-view/></el-main>
        </el-container>
      </div>
    </el-container>
  </div>
</template>

<script>
import Header from "../components/Header";
import Aside from "../components/Aside";
export default {
  name: "Layout",
  components: {
    Header,
    Aside
  },

}

</script>

<style scoped>

</style>