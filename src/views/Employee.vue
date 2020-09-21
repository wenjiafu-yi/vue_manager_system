<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="query.ename" placeholder="用户名" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
      <el-table
        :data="empData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column prop="eid" label="ID" width="55" align="center"></el-table-column>
        <el-table-column prop="ename" label="用户名"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="nname" label="民族"></el-table-column>
        <el-table-column prop="nativeplace" label="籍贯"></el-table-column>
        <el-table-column prop="nowaddress" label="现居地址"></el-table-column>
        <el-table-column prop="contactway" label="联系方式"></el-table-column>
        <el-table-column prop="idcard" label="身份证号码"></el-table-column>
        <el-table-column prop="major" label="专业"></el-table-column>
        <el-table-column prop="graduateschool" label="毕业学校"></el-table-column>
        <el-table-column prop="sal" label="工资"></el-table-column>
        <el-table-column prop="pname" label="职位"></el-table-column>
        <el-table-column prop="leader" label="领导"></el-table-column>
        <el-table-column prop="sname" label="部门"></el-table-column>
        <el-table-column prop="worktime" label="上岗时间"></el-table-column>
        <el-table-column label="操作" width="180" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >修改</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="query.pageIndex"
          :page-size="query.pageSize"
          :total="pageTotal"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="信息修改" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="现居地址">
          <el-input v-model="form.nowaddress"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="form.contactway"></el-input>
        </el-form-item>
        <el-form-item label="工资">
          <el-input type="number" v-model="form.sal"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { fetchData } from "../../api/index";
import moment from "moment";
export default {
  name: "basetable",
  data() {
    return {
      query: {
        ename: "",
        pageIndex: 1,
        pageSize: 50,
      },
      empData: [],
      multipleSelection: [],
      delList: [],
      editVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios.get("/api/empList").then((res) => {
        if (res.data.code == "500") {
          var list = [];
          for (let j = 0, len = res.data.results.length; j < len; j++) {
            res.data.results[j].worktime = moment(
              res.data.results[j].worktime
            ).format("YYYY-MM-DD HH:mm:ss");
            list.push(res.data.results[j]);
          }
          this.empData = list;
          this.pageTotal = list.length || 10;
        }
      });
    },
    // 触发搜索按钮
    handleSearch() {
      if (this.query.ename != "") {
        var name = this.query.ename;
        var arr = this.empData.filter(function (item) {
          return item.ename == name;
        });
        this.empData = arr;
      } else {
        this.getData();
      }
      //   this.$set(this.query, "pageIndex", 1);
      //   this.getData();
    },
    // 删除操作
    handleDelete(index, row) {
      // 二次确认删除
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning",
      })
        .then(() => {
          this.$axios.post("/api/deleteEmp", { eid: row.eid }).then((res) => {
            if (res.status === 200) {
              this.getData();
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 编辑操作
    handleEdit(index, row) {
      this.idx = index;
      this.form = row;
      this.editVisible = true;
    },
    // 保存编辑
    saveEdit() {
      this.$axios.post("/api/updateEmp", this.form).then((res) => {
        if (res.status === 200) {
          this.$message({
            type: "success",
            message: "修改成功",
          });
        }
      });
      this.editVisible = false;
      this.$message.success(`修改第 ${this.idx + 1} 行成功`);
      this.$set(this.empData, this.idx, this.form);
    },
    // 分页导航
    handlePageChange(val) {
      this.$set(this.query, "pageIndex", val);
      this.getData();
    },
  },
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
</style>
