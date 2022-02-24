<template>
  <div style="margin: 0px">
    <el-row>
      <el-col span="8">
        <div style="margin: 15px">
          <el-button @click="add_student">新增</el-button>
          <el-button @click="multiAddVisible = true">批量导入</el-button>
          <el-popconfirm title="确定删除?"
                         @confirm="delMultiStudent">
            <template #reference>
              <el-button type="danger"> 批量删除
              </el-button>
            </template>
          </el-popconfirm>

        </div>
      </el-col>
      <div style="margin:15px;padding-left: 35px">
        <el-input v-model="input" placeholder="输入姓名查询" style="width: 60%" clearable/>
        <el-button style="margin-left: 10px" @click="load">搜索</el-button>
      </div>
    </el-row>

<!--显示学生信息主页面-->
    <el-table @selection-change="selectChange"
              :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
              stripe style="width: 100%;padding: 15px" >
      <el-table-column type="selection" />
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
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      >
      </el-pagination>
<!--      新增|修改学生信息页面-->
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
        </el-form>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveAddStudent"
        >确认</el-button>
      </span>
        </template>
      </el-dialog>


<!--      批量添加学生信息页面-->
      <el-dialog
          v-model="multiAddVisible"
          title="批量导入学生信息"
          width="65%">
        <el-form model="form" label-width="120px">
          <el-upload
              accept=".xlsx,.xls"
              :auto-upload="false"
              :show-file-list="false"
              :on-change="handle"
          >
            <el-button type="primary">{{upLoadTip}}</el-button>
          </el-upload>
          <el-table :data="studentList" stripe style="width: 100%;padding: 15px">
            <el-table-column prop="id" label="学号" width="180"/>
            <el-table-column prop="name" label="姓名" width="180"/>
            <el-table-column prop="sex" label="性别" width="180" :formatter="sexFormat"/>
            <el-table-column prop="buildingNum" label="宿舍楼编号" width="180"/>
            <el-table-column prop="dormNum" label="宿舍编号" width="180"/>
          </el-table>


        </el-form>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="multiAddVisible = false">取消</el-button>
        <el-button type="primary" @click="upLoad" :disabled="canUpload"
        >确认添加</el-button>
      </span>
        </template>
      </el-dialog>

<!--导出学生信息页面-->



    </div>
  </div>

</template>

<script>
import request from "../../utils/request";
import {ElMessage} from 'element-plus'
import {readFile} from "../../utils/fileUtils";
import xlsx from 'xlsx';

export default {
  name: 'StudentDetail',
  components: {},

  mounted() {
  },
  created() {
    this.load();
  },



  data() {
    return {
      upLoadTip: '上传excel文件',
      canUpload: true,
      studentList: [],
      multiAddVisible: false,
      inputDisabled: false,
      dialogVisible: false,
      input: '',
      currentPage: 1,
      pageSize: 10,
      total: 0,
      search: '',
      preId: 0,
      form: {},
      tableData: [],
      selectedList: []
    }
  },
  methods: {
    delMultiStudent() {
      request.delete("/studentDetail/delMultiStudents",{
        data:{
          studentDetails:this.selectedList
        }
      }).then(res=>{
        if (res.code === 666) {
          this.load();
          ElMessage.success(res.data);
        } else ElMessage.error(res.msg);
      })
    },

    selectChange(val) {
      this.selectedList = val;
      console.log(val)
    },
    upLoad() {
      request.put("/studentDetail/addMultiStudents", this.studentList).then(res=>{
        if (res.code === 666) {
          this.load();
          ElMessage.success(res.data);
        }else ElMessage.error(res.msg);
      })
      this.studentList = null;
      this.multiAddVisible = false;
      this.canUpload = true;
      this.upLoadTip = '上传excel文件';
    },
    async handle(ev) {
      let file = ev.raw;
      if (!file) return;
      let data = await readFile(file);
      let workBook = xlsx.read(data, {type: "binary"}),
          workSheet = workBook.Sheets[workBook.SheetNames[0]];
      let arr = [];
      xlsx.utils.sheet_to_json(workSheet).forEach(item=>{
        let obj = {};
        obj.id = String(item["学号"]);
        obj.name = String(item["姓名"]);
        obj.sex = item["性别"] === "男";
        obj.buildingNum = item["楼号"];
        obj.dormNum = item["宿舍号"];
        arr.push(obj);
      })
      this.studentList = arr;
      this.upLoadTip = '上传成功';
      this.canUpload = false;
    },
    inputChange(form) {
      this.inputDisabled = form.id;
    },
    delInfo(row) {
      this.form = JSON.parse(JSON.stringify(row));
      request.delete("/studentDetail/delSingleStudent", {
        params: {
          studentId: this.form.id
        }
      }).then(res => {
        if (res.code === 666) {
          ElMessage.success("删除成功")
        } else ElMessage.error("删除失败")
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
      request.get("/studentDetail/findPage", {
        params: {
          pageNum: this.currentPage,
          pageSize: 1000,
          search: this.input
        }
      }).then(res => {
        this.tableData = res.data.records
        this.total = this.tableData.length;
      });
    },
    add_student() {
      this.dialogVisible = true;
      this.form = {}
      this.inputChange(this.form);
    },
    saveAddStudent() {
      if (this.preId === this.form.id) {
        //修改
        request.put("/studentDetail/updStudent", this.form).then(res => {
          if (res.code === 666) {
            ElMessage.success("修改成功")
            this.dialogVisible = false;
          } else ElMessage.error("修改失败")
          this.preId = 0;
        });
      } else {
        //添加
        request.post("/studentDetail/addOneStudent", this.form).then(res => {
          if (res.code === 666) {
            ElMessage.success("添加成功")
            this.dialogVisible = false;
          } else ElMessage.error(res.msg)
        });

      }
      this.load();

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
      } else if (row.inOut === false) {
        return '离宿'
      } else return '数据异常'
    },
    dormLeaderFormat(row) {
      if (row.isDormLeader === true) {
        return '舍长'
      } else if (row.isDormLeader === false) {
        return '舍员'
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;    //动态改变
    },
    handleCurrentChange(val) {
      this.currentPage = val;    //动态改变
    }
  }
}


</script>
