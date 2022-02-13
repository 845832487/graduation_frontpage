<template>
  <div style="width: 100%; height: 100vh;background-color: darkslateblue;overflow: hidden">
    <div style="width: 20%;margin: 15% auto">
      <div style="text-align: center;font-size: 30px;padding: 30px;font-weight: bolder;color: #daf0ff">欢迎登陆</div>

      <el-form ref="formRef" :model="loginForm">


        <el-form-item size="normal">
          <el-input placeholder="账号" v-model="loginForm.id" type="text"></el-input>
        </el-form-item>
        <el-form-item size="normal">
          <el-input placeholder="密码" v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <div style="color: red" v-text="returnMessage"></div>
          <el-button style="width: 100%" type="primary" @click="login">登录</el-button>
        </el-form-item>
        <el-form-item>
          <div style="color: red" v-text="returnMessage"></div>
          <el-button style="width: 100%" type="danger" @click="toChangePwdVisible=!toChangePwdVisible">密码找回</el-button>
        </el-form-item>
      </el-form>


    </div>
    <el-dialog
        v-model="toChangePwdVisible"
        title="密码找回"
        width="35%">
      <el-form model="form" label-width="120px">
        <el-form-item label="账号（学号）">
          <el-input v-model="forgetPasswordForm.id" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input v-model="forgetPasswordForm.code" style="width:55%"></el-input>
          <el-button style="margin-left: 5%" @click="sendEmail">{{ content }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 80%" type="primary"
                     @click="toChangePassword">下一步
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>


    <el-dialog
        v-model="changePwdVisible"
        title="密码找回"
        width="35%">
      <el-form model="form" label-width="120px">
        <el-form-item label="新的密码">
          <el-input type="password" v-model="changePasswordForm.password1" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="再次确认">
          <el-input type="password" v-model="changePasswordForm.password2" style="width:80%"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 80%" type="primary"
                     @click="changePassword">确认
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>

</template>

<script>
import {ElMessage} from 'element-plus'
import qs from 'qs'

import request from "../utils/request";
import {isEmpty} from "element-plus/es/utils/util";

export default {
  name: "Login",
  data() {
    return {
      returnCode: '',
      content: '发送验证码',
      timeCountDown: 60,
      returnMessage: '',
      toChangePwdVisible: false,
      changePwdVisible: false,
      loginForm: {},
      forgetPasswordForm: {},
      changePasswordForm: {}
    };
  },
  methods: {
    changePassword() {
      let reg = "^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$";
      let re = new RegExp(reg);
      if (this.changePasswordForm.password1 !== this.changePasswordForm.password2) {
        ElMessage.error("两次输入的密码不一致")
      }else if (!re.test(this.changePasswordForm.password1)) {
        ElMessage.error("密码必须包含字母数字两种，长度6-20位，不允许有符号");
      } else {
        request.post("/loginPage/changePassword",{
          id: this.forgetPasswordForm.id,
          password: this.changePasswordForm.password1
        }).then(res=>{
          if (res.code === 666) {
            ElMessage.success(res.data);
            location.reload();
          }else ElMessage.error(res.msg);
        })
      }
    },
    toChangePassword() {
      request.post("/loginPage/checkForgetPasswordEmail", this.forgetPasswordForm).then(res => {
        if (res.code === 666) {
          ElMessage.success(res.data);
          this.toChangePwdVisible = false;
          this.changePwdVisible = true;
        } else ElMessage.error(res.msg);
      })
    },
    countDown() {
      let clock = window.setInterval(() => {
        this.timeCountDown--
        this.content = this.timeCountDown + '秒后重新发送'
        if (this.timeCountDown < 0) {     //当倒计时小于0时清除定时器
          window.clearInterval(clock)
          this.content = '重新发送验证码'
          this.timeCountDown = 60
        }
      }, 1000)
    },
    sendEmail() {
      if (isEmpty(this.forgetPasswordForm.id) || this.forgetPasswordForm.id.split(' ').join('').length === 0) {
        ElMessage.error("输入学号不能为空");
      } else {
        request.get("/loginPage/getForgetPasswordCode", {
          params: {
            id: this.forgetPasswordForm.id
          }
        }).then(res => {
          if (res.code === 666) {
            this.countDown();
            ElMessage.success(res.data)
          } else ElMessage.error(res.msg);
        })
      }
    },

    login() {
      if (isEmpty(this.loginForm.id) || isEmpty(this.loginForm.password)
          || this.loginForm.id.split(' ').join('').length === 0 || this.loginForm.password.split(' ').join('').length === 0) {
        ElMessage.error("账号名或密码不能为空");
      } else {
        request.post("/loginPage/login", this.loginForm).then(res => {
          if (res.code === 666) {
            ElMessage.success("登录成功")
            sessionStorage.setItem("auth", "1");
            sessionStorage.setItem("user", this.loginForm.id);
            this.getUserInfo();

          } else ElMessage.error(res.msg)
        });
      }
    },
    getUserInfo() {
      request.get("/userRole/getInfo", {
        params: {
          id: sessionStorage.getItem("user")
        }
      }).then(res => {
        if (res.code === 666) {
          sessionStorage.setItem("role", res.data.role);
          this.$router.push("/personalInfo")
        }
      })
    }


  }
}
</script>


<style scoped>

</style>