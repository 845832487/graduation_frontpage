<template>
  <el-form
      ref="ruleFormRef"
      :model="s"
      status-icon
      label-width="100px"
      class="demo-ruleForm">
    <el-form-item>
      <div style="font-size: 25px;font-weight: bold;margin: 5px">分配宿舍</div>
    </el-form-item>
    <el-form-item label="选择宿舍楼">
      <el-select v-model="buildingChoice" class="m-2" placeholder="Select" size="normal">
        <el-option
            v-for="item in buildingIds"
            :key="item.value"
            :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="选择性别">
      <el-select v-model="sexChoice" class="m-2" placeholder="Select" size="normal">
        <el-option
            v-for="item in sex"
            :key="item.key"
            :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="提示">
      <div>
        <h3>
          <span>当前选择宿舍楼 </span>
          <span style="color: brown;font-weight: bolder;font-size: larger">【{{ buildingChoice }}】</span>
          <span>余量为</span>
          <span style="color: brown;font-weight: bolder;font-size: larger">【{{ roomsLeft }}】</span>
          <el-button type="normal" @click="getRoomsLeft" style="margin-left: 15px">刷新余量</el-button>
        </h3>
        <div style="margin: 15px"></div>
        <h3>
          <span>当前性别为</span>
          <span style="color: brown;font-weight: bolder;font-size: larger">【{{ sexChoice }}】</span>
          <span>且未分配宿舍学生数量为</span>
          <span style="color: brown;font-weight: bolder;font-size: larger">【{{ studentsLeft }}】</span>
          <span>人</span>
          <el-button type="normal" style="margin-left: 15px" @click="getStudentsLeft">刷新学生数量</el-button>
        </h3>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="allocate">确定分配</el-button>
    </el-form-item>
  </el-form>


</template>

<script>
import request from "../../utils/request";
import {ElMessage} from "element-plus";

export default {
  name: "AllocateDorm",
  created() {
    this.getBuilding();
  },
  data() {
    return {
      studentsLeft: 0,
      roomsLeft: 0,
      buildingChoice: '',
      buildingIds: [],
      sexChoice: '',
      sex: [{
        key: true,
        value: '男'
      },
        {
          key: false,
          value: '女'
        }]
    }
  },

  methods: {
    getRoomsLeft() {
      if (this.buildingChoice === '') {
        ElMessage.error("请选择宿舍楼后刷新");
      } else {
        request.get("/dormDetail/getRoomsLeft", {
          params: {
            buildingId: this.buildingChoice
          }
        }).then(res => {
          if (res.code === 666) {
            ElMessage.success("刷新成功");
            this.roomsLeft = res.data;
          } else {
            ElMessage.error("刷新失败")
          }

        });
      }
    },
    getStudentsLeft() {
      if (this.sexChoice === '') {
        ElMessage.error("请选择性别后刷新");
      } else {
        request.get("/dormDetail/getStudentsLeft", {
          params: {
            sex: this.sexChoice === '男' ? 1 : 0
          }
        }).then(res => {
          if (res.code === 666) {
            ElMessage.success("刷新成功");
            this.studentsLeft = res.data;
          } else {
            ElMessage.error("刷新失败")
          }
        });
      }

    },
    getBuilding() {
      request.get("/dormDetail/getDormBuilding").then(res => {
        for (let i = 0; i < res.data.length; i++) {
          let temp = {};
          temp.key = res.data[i];
          temp.value = res.data[i];
          this.buildingIds.push(temp);
        }
        console.log(this.buildingIds);
      })
    },
    allocate() {
      request.get("/dormDetail/allocate",{
        params:{
          buildingNum: this.buildingChoice,
          sex: this.sexChoice === '男' ? 1 : 0
        }
      }).then(res=>{
        if (res.code === 666) {
          ElMessage.success(res.data);
        }else ElMessage.error(res.msg);
      })
    }
  }
}
</script>

<style scoped>

</style>