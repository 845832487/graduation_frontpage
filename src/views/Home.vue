<template>
  <div style="margin: 15px">
    <el-row>
      <el-col span="8">
        <div style="margin: 15px">
          <el-button @click="add_student">新增</el-button>
          <el-button>批量导入</el-button>
          <el-button>导出</el-button>
        </div>
      </el-col>
      <div style="margin:15px;padding-left: 35px">
        <el-input v-model="input"  placeholder="输入姓名查询" style="width: 60%"/>
        <el-button style="margin-left: 10px" @click="load">搜索</el-button>
      </div>
    </el-row>


    <el-table :data="tableData" stripe style="width: 100%;padding: 15px">
      <el-table-column prop="id" label="学号" width="180"/>
      <el-table-column prop="name" label="姓名" width="180"/>
      <el-table-column prop="buildingNum" label="宿舍楼编号" width="180"/>
      <el-table-column prop="dormNum" label="宿舍编号" width="180"/>
      <el-table-column prop="sex" label="性别" width="180" :formatter="sexFormat"/>
      <el-table-column prop="is_dorm_leader" label="身份" width="180" :formatter="dormLeaderFormat"/>
      <el-table-column prop="telephone" label="联系电话"/>
      <el-table-column prop="inOut" label="住宿状态" :formatter="inOutFormat"/>

      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="editInfo(scope.row)"
          >修改
          </el-button>
          <el-popconfirm title="确定删除?"
          @confirm="delInfo(scope.row)">
            <template #reference>
              <el-button size="small"
                         type="danger"> 删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="demo-pagination-block">
      <el-pagination
          v-model:currentPage="currentPage"
          :page-sizes="[5, 10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      >
      </el-pagination>

      <el-dialog
          v-model="dialogVisible"
          title="学生信息"
          width="30%">
        <el-form model="form" label-width="120px">
          <el-form-item label="姓名">
            <el-input v-model="form.name" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="学号">
            <el-input v-model="form.id" style="width: 80%" v-bind:disabled="inputDisabled"></el-input>
          </el-form-item>
          <el-form-item label="宿舍楼编号">
            <el-input v-model="form.buildingNum" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="宿舍编号">
            <el-input v-model="form.dormNum" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="身份">
            <el-radio v-model="form.isDormLeader" :label=true>舍长</el-radio>
            <el-radio v-model="form.isDormLeader" :label=false>舍员</el-radio>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio v-model="form.sex" :label='true'>男</el-radio>
            <el-radio v-model="form.sex" :label=false>女</el-radio>
          </el-form-item>


        </el-form>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveAddStudent"
        >确认</el-button>
      </span>
        </template>
      </el-dialog>

    </div>
  </div>

</template>

<script>
import request from "../utils/request";
import {ElMessage} from 'element-plus'

export default {
  name: 'Home',
  components: {},

  created() {
    this.load()
  },
  data() {
    return {
      inputDisabled: false,
      dialogVisible: false,
      input: '',
      currentPage: 1,
      pageSize: 10,
      total: 0,
      search: '',
      preId: 0,
      form: {},
      tableData: []
    }
  },
  methods: {
    inputChange(form) {
      this.inputDisabled = form.id;
    },
    delInfo(row) {
      this.form = JSON.parse(JSON.stringify(row));
      request.delete("/api/StudentDetail/delSingleStudent",{
        params: {
          studentId: this.form.id
        }
      }).then(res => {
        if (res.code === 666) {
          ElMessage.success("删除成功")
        }else ElMessage.error("删除失败")
      });
      this.load()
    },
    editInfo(row) {
      this.form = JSON.parse(JSON.stringify(row));
      this.preId = this.form.id;
      this.inputChange(this.form);
      this.dialogVisible = true;
    },
    load() {
      console.log(this.input)
      request.get("/api/StudentDetail/findPage", {
        params: {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          search: this.input
        }
      }).then(res => {
        this.tableData = res.data.records
      });
    },
    add_student() {
      this.dialogVisible = true;
      this.form = {}
      this.inputChange(this.form);
    },
    saveAddStudent() {
      if (this.preId === this.form.id) {
        console.log("调用修改方法")
        request.put("/api/StudentDetail/updStudent", this.form).then(res => {
          if (res.code === 666) {
            ElMessage.success("修改成功")
          }else ElMessage.error("修改失败")
          this.preId = 0;
        });
      } else {
        console.log("调用添加方法")
        request.post("/api/StudentDetail/addOneStudent", this.form).then(res => {
          if (res.code === 666) {
            ElMessage.success("添加成功")
          }else ElMessage.error("学号已存在")
        });
      }
      this.load();
      this.dialogVisible = false;
    },
    sexFormat(row) {
      if (row.sex === true) {
        return '男'
      } else if (row.sex === false) {
        return '女'
      }
    },
    inOutFormat(row) {
      if (row.inOut === true) {
        return '在宿'
      }else if (row.inOut === false) {
        return '离宿'
      }else return '数据异常'
    },
    dormLeaderFormat(row) {
      if (row.isDormLeader === true) {
        return '舍长'
      } else if (row.isDormLeader === false) {
        return '舍员'
      }
    },
    handleSizeChange() {
    },
    handleCurrentChange() {

    }
  }
}


</script>
