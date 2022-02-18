<template>
  <el-container>
    <el-aside width="400px">
      <div>
        <div style="text-align:center;padding-top: 50px">
<!--          -->
          <el-upload
              class="avatar-uploader"
              action="http://localhost:8081/icon/upload"
              :show-file-list="false"
              :on-success="upLoadIcon"

          >
            <el-avatar
                fit="cover"
                :src="userDetail.icon"
                :size="300"
                style="margin: 25px"
            ></el-avatar>
          </el-upload>
<!--          -->
          <el-row>

              <el-button round>
                <el-upload
                    action="http://localhost:8081/icon/upload"
                    :on-success="upLoadIcon"
                >
                  更换头像
                </el-upload>
              </el-button>

            <el-button type="primary" round @click="toChangeInfo">修改个人信息</el-button>
            <el-button type="info" round @click="toChangePassword">修改密码</el-button>
          </el-row>

        </div>
      </div>
    </el-aside>
    <el-main style="padding-top: 8%">
      <el-descriptions title="个人信息" size="large" v-if="userRole">
        <el-descriptions-item label="姓名：">{{ userDetail.name }}</el-descriptions-item>
        <el-descriptions-item label="账号：">{{ userDetail.id }}</el-descriptions-item>
        <el-descriptions-item label="邮箱：">{{ userDetail.email }}</el-descriptions-item>
        <el-descriptions-item label="手机：">{{ userDetail.telephone }}</el-descriptions-item>
        <el-descriptions-item label="性别：">{{ userDetail.sex === true ? '男' : '女' }}</el-descriptions-item>
        <el-descriptions-item label="身份：">{{ userDetail.isDormLeader === '1' ? '舍长' : '舍员' }}</el-descriptions-item>
        <el-descriptions-item label="宿舍号：">{{ userDetail.buildingNum + '-' + userDetail.dormNum }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions title="个人信息" size="large" v-if="!userRole">
        <el-descriptions-item label="姓名：">{{ userDetail.name }}</el-descriptions-item>
        <el-descriptions-item label="账号：">{{ userDetail.id }}</el-descriptions-item>
        <el-descriptions-item label="邮箱：">{{ userDetail.email }}</el-descriptions-item>
        <el-descriptions-item label="手机：">{{ userDetail.telephone }}</el-descriptions-item>
        <el-descriptions-item label="性别：">{{ userDetail.sex === true ? '男' : '女' }}</el-descriptions-item>
        <el-descriptions-item label="职位：">{{ userDetail.job }}</el-descriptions-item>
        <el-descriptions-item label="负责宿舍楼号：">
          {{ userDetail.buildingInCharge !== null ? userDetail.buildingInCharge : '无' }}
        </el-descriptions-item>
      </el-descriptions>
    </el-main>


  </el-container>

  <!--修改员工信息-->
  <el-dialog
      :append-to-body="true"
      v-model="changeWorkerInfoVisible"
      title="修改个人信息"
      width="30%">
    <el-form model="form" label-width="120px">
      <el-form-item label="手机">
        <el-input v-model="userDetail.telephone" style="width: 80%"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="userDetail.email" style="width: 80%"></el-input>
      </el-form-item>
      <el-form-item label="负责楼号">
        <el-input v-model="userDetail.buildingInCharge" style="width: 80%"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="changeWorkerInfoVisible = false">取消</el-button>
        <el-button type="primary"
                   @click="changeWorkerInfo">确认</el-button>
      </span>
    </template>
  </el-dialog>

  <!--  修改学生个人信息-->
  <el-dialog
      :append-to-body="true"
      v-model="changeStudentInfoVisible"
      title="修改个人信息"
      width="30%">
    <el-form model="form" label-width="120px">
      <el-form-item label="手机">
        <el-input v-model="userDetail.telephone" style="width: 80%"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="userDetail.email" style="width: 80%"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="changeStudentInfoVisible = false">取消</el-button>
        <el-button type="primary"
                   @click="changeStudentInfo">确认</el-button>
      </span>
    </template>
  </el-dialog>


  <el-dialog
      :append-to-body="true"
      v-model="changPasswordVisible"
      title="修改密码"
      width="30%">
    <el-form model="form" label-width="120px">
      <el-form-item label="旧密码">
        <el-input v-model="passwordForm.oldPassword" style="width: 80%" type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="passwordForm.newPassword" style="width: 80%" type="password"></el-input>
      </el-form-item>
      <el-form-item label="再次输入密码">
        <el-input v-model="passwordForm.secondInput" style="width: 80%" type="password"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="changPasswordVisible = false">取消</el-button>
        <el-button type="primary"
                   @click="changePassword">确认</el-button>
      </span>
    </template>
  </el-dialog>


</template>

<script>
import request from "../../utils/request";
import {ElMessage} from "element-plus";

export default {
  created() {
    this.changeDescription();
    this.getUserInfo();
  },

  data() {
    return {
      icon: '',
      changPasswordVisible: false,
      changeWorkerInfoVisible: false,
      changeStudentInfoVisible: false,
      userRole: false, //true：学生  | false：员工

      userDetail: {},
      passwordForm: {}
    }
  },
  methods: {
    upLoadIcon(res) {
      this.userDetail.icon = res.data;
      if (sessionStorage.getItem("role") === 'student') {
        request.post("/studentDetail/updStudentPersonalInfo", this.userDetail).then(res => {
          if (res.code === 666) {
            ElMessage.success("修改成功");
            this.changeStudentInfoVisible = false;
            this.getUserInfo();
          } else ElMessage.error("修改失败");
        });
      } else {
        request.post("/workerDetail/updWorkerPersonalInfo", this.userDetail).then(res => {
          if (res.code === 666) {
            ElMessage.success("修改成功");
            this.changeWorkerInfoVisible = false;
            this.getUserInfo();
          } else ElMessage.error("修改失败");
        });
      }
    },
    changePassword() {
      if (this.passwordForm.newPassword !== this.passwordForm.secondInput) {
        ElMessage.error("两次输入密码不一致");
      } else {
        request.get("/loginPage/getPasswordById",{
          params:{
            userId: sessionStorage.getItem("user"),
            oldPassword: this.passwordForm.oldPassword,
            newPassword: this.passwordForm.newPassword
          }
        }).then(res=>{
          if (res.code !== 666) {
            ElMessage.error(res.msg);
          } else {
            ElMessage.success(res.data);
            this.changPasswordVisible = false;
          }
        })
      }
    },
    toChangePassword() {
      this.changPasswordVisible = true;
    },
    changeStudentInfo() {
      request.post("/studentDetail/updStudentPersonalInfo", this.userDetail).then(res => {
        if (res.code === 666) {
          ElMessage.success("修改成功");
          this.changeStudentInfoVisible = false;
          this.getUserInfo();
        } else ElMessage.error("修改失败");
      });
    },
    changeWorkerInfo() {
      request.post("/workerDetail/updWorkerPersonalInfo", this.userDetail).then(res => {
        if (res.code === 666) {
          ElMessage.success("修改成功");
          this.changeWorkerInfoVisible = false;
          this.getUserInfo();
        } else ElMessage.error("修改失败");
      });
    },
    toChangeInfo() {
      if (sessionStorage.getItem("role") === 'student') {
        this.changeStudentInfoVisible = true;
      } else this.changeWorkerInfoVisible = true;

    },
    changeDescription() {
      this.userRole = sessionStorage.getItem('role') === 'student';
    },
    getUserInfo() {
      if (this.userRole) {
        request.get("/studentDetail/getStudentDetailById", {
          params: {
            studentId: sessionStorage.getItem("user")
          }
        }).then(res => {
          this.userDetail = res.data;
        })
      } else {
        request.get("/workerDetail/getWorkerDetailById", {
          params: {
            workerId: sessionStorage.getItem("user")
          }
        }).then(res => {
          this.userDetail = res.data;
        })
      }
    }
  }
};
</script>

<style scoped>

</style>