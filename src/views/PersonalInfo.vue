<template>

  <el-container>
    <el-aside width="400px">
      <div>
        <div style="text-align:center;padding-top: 50px">
          <el-avatar
              fit="cover"
              :src="iconUrl"
              :size="300"
              style="margin: 25px"
          ></el-avatar>
          <el-button round>更换头像</el-button>
          <el-button type="info" round>修改密码</el-button>
        </div>

      </div>
    </el-aside>
    <el-main style="padding-top: 8%">
      <el-row style="margin: 15px">
        <el-col :span="8"><div style="margin-left: 50%;font-family: 'Microsoft YaHei',monospace;font-weight: bold">
          姓名：</div></el-col>
        <el-col :span="16"><div style="font-family: 'Microsoft YaHei',monospace;font-weight: bold">
          冯有恒</div></el-col>
      </el-row>

      <el-row style="margin: 15px">
        <el-col :span="8"><div style="margin-left: 50%;font-family: 'Microsoft YaHei',monospace;font-weight: bold">
          学号：</div></el-col>
        <el-col :span="16"><div style="font-family: 'Microsoft YaHei',monospace;font-weight: bold">
          1806300014</div></el-col>
      </el-row>

      <el-row style="margin: 15px">
        <el-col :span="8"><div style="margin-left: 50%;font-family: 'Microsoft YaHei',monospace;font-weight: bold">
          宿舍楼：</div></el-col>
        <el-col :span="16"><div style="font-family: 'Microsoft YaHei',monospace;font-weight: bold">
          B22</div></el-col>
      </el-row>

      <el-row style="margin: 15px">
        <el-col :span="8"><div style="margin-left: 50%;font-family: 'Microsoft YaHei',monospace;font-weight: bold">
          宿舍号：</div></el-col>
        <el-col :span="16"><div style="font-family: 'Microsoft YaHei',monospace;font-weight: bold">
          701</div></el-col>
      </el-row>

      <el-row style="margin: 15px">
        <el-col :span="8"><div style="margin-left: 50%;font-family: 'Microsoft YaHei',monospace;font-weight: bold">
          性别：</div></el-col>
        <el-col :span="16"><div style="font-family: 'Microsoft YaHei',monospace;font-weight: bold">
          男</div></el-col>
      </el-row>

      <el-row style="margin: 15px">
        <el-col :span="8"><div style="margin-left: 50%;font-family: 'Microsoft YaHei',monospace;font-weight: bold">
          手机号：</div></el-col>
        <el-col :span="16"><div style="font-family: 'Microsoft YaHei',monospace;font-weight: bold">
          13288468103</div></el-col>
      </el-row>

      <el-row style="margin: 15px">
        <el-col :span="8"><div style="margin-left: 50%;font-family: 'Microsoft YaHei',monospace;font-weight: bold">
          邮箱地址：</div></el-col>
        <el-col :span="16"><div style="font-family: 'Microsoft YaHei',monospace;font-weight: bold">
          8458324876@qq.com</div></el-col>
      </el-row>

      <el-row style="margin: 15px">
        <el-col :span="8"><div style="margin-left: 50%;font-family: 'Microsoft YaHei',monospace;font-weight: bold">
          身份：</div></el-col>
        <el-col :span="16"><div style="font-family: 'Microsoft YaHei',monospace;font-weight: bold">
          舍长</div></el-col>
      </el-row>

      <el-row style="margin: 15px">
        <el-col :span="8"><div style="margin-left: 50%;font-family: 'Microsoft YaHei',monospace;font-weight: bold">
          住宿情况：</div></el-col>
        <el-col :span="16"><div style="font-family: 'Microsoft YaHei',monospace;font-weight: bold">
          在宿</div></el-col>
      </el-row>





    </el-main>
  </el-container>
</template>

<script>
export default {
  data(){
    return {
      iconUrl: 'C:\\Users\\84583\\Desktop\\宿舍管理系统\\BackgroundSystem\\src\\main\\resources\\icon\\1.jpg',
    }
  }
};
</script>

<style scoped>

</style>