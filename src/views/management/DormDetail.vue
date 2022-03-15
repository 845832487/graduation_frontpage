<template>
  <div style="margin: 0px">
    <el-row>
      <el-col span="8">
        <div style="margin: 15px">
          <el-button @click="multiAddVisible = true" v-if="checkAuth('admin')">批量导入</el-button>


        </div>
      </el-col>
      <div style="margin:15px;padding-left: 35px">
        <el-input v-model="input" placeholder="楼号或宿舍号查询" style="width: 60%" clearable/>
        <el-button style="margin-left: 10px" @click="load">搜索</el-button>
      </div>
    </el-row>

    <!--显示学生信息主页面-->
    <el-table @selection-change="selectChange"
              :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
              stripe style="width: 100%;padding: 15px" >
      <el-table-column type="selection" />
      <el-table-column prop="buildingId" label="楼号" width="180"/>
      <el-table-column prop="dormId" label="宿舍号" width="180"/>
      <el-table-column prop="roomsLeft" label="剩余床位" width="180"/>
      <el-table-column prop="capacity" label="床位总数" width="180"/>



      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="editInfo(scope.row)"
          >宿舍详情
          </el-button>

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
          title="宿舍信息"
          width="60%">
        <el-form model="form" label-width="120px">
<!--          -->

          <el-descriptions
              v-for="item in dormDetail"
              class="margin-top"
              title="学生信息"
              :column="6"
              :size="size"
              border
          >

            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  姓名
                </div>
              </template>
              {{item.name}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  性别
                </div>
              </template>
              {{item.sex===true?'男':'女'}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  宿舍号
                </div>
              </template>
              {{item.buildingNum + '-' + item.dormNum}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  身份
                </div>
              </template>
              {{item.isDormLeader === true?'舍长':'舍员'}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  状态
                </div>
              </template>
              <el-tag type="success" v-if="item.inOut === true">在宿</el-tag>
              <el-tag type="danger" v-if="item.inOut === false">离宿</el-tag>
            </el-descriptions-item>

            <el-descriptions-item>
                <el-button type="primary">修改</el-button>
            </el-descriptions-item>
          </el-descriptions>




          <!--          -->
        </el-form>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveAddStudent"
        >确认</el-button>
      </span>
        </template>
      </el-dialog>


      <!--      批量添加宿舍信息页面-->
      <el-dialog
          v-model="multiAddVisible"
          title="导入宿舍信息"
          width="50%">
        <el-form model="form" label-width="100%">
          <el-upload
              accept=".xlsx,.xls"
              :auto-upload="false"
              :show-file-list="false"
              :on-change="handle"
          >
            <el-button type="primary">{{upLoadTip}}</el-button>
          </el-upload>
          <el-table :data="dormList" stripe style="width: 100%;padding: 15px">
            <el-table-column prop="buildingId" label="楼号" width="200px"/>
            <el-table-column prop="dormId" label="宿舍号" width="200px%"/>
            <el-table-column prop="roomsLeft" label="剩余床位" width="200px%"/>
            <el-table-column prop="capacity" label="床位数量" width="200px%"/>
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

  created() {
    this.load();
  },



  data() {
    return {
      upLoadTip: '上传excel文件',
      canUpload: true,
      dormList: [],
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
      selectedList: [],
      dormDetail:[]
    }
  },
  methods: {
    checkAuth(role) {
      return sessionStorage.getItem('role') === role;
    },
    selectChange(val) {
      this.selectedList = val;
    },
    upLoad() {
      request.put("/dormDetail/addMultiDorms", this.dormList).then(res => {
        if (res.code === 666) {
          this.load();
          ElMessage.success(res.data);
        } else ElMessage.error(res.msg);
      })
      this.dormList = null;
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
      xlsx.utils.sheet_to_json(workSheet).forEach(item => {
        let obj = {};
        obj.buildingId = String(item["楼号"]);
        obj.dormId = String(item["宿舍号"]);
        obj.roomsLeft = String(item["剩余床位"]);
        obj.capacity = item["床位总数"]
        arr.push(obj);
      })
      this.dormList = arr;
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
      console.log(row);
      request.get("/dormDetail/findStudent", {
        params: {
          buildingNum: row.buildingId,
          dormNum: row.dormId,
        }
      }).then(res => {
        this.dialogVisible = true;
        this.dormDetail = res.data;
      })

    },
    load() {
      request.get("/dormDetail/findPage", {
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

    handleSizeChange(val) {
      this.pageSize = val;    //动态改变
    },
    handleCurrentChange(val) {
      this.currentPage = val;    //动态改变
    }
  }
}


</script>
