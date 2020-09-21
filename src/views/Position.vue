<template>
  <div class="container">
    <div class="handle-box">
      <el-button type="primary" @click="handleAdd">添加职位</el-button>
    </div>
    <el-table
      :data="posData.filter(data => !search || data.pname.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column label="职位编号 " prop="pid"></el-table-column>
      <el-table-column label="职位名" prop="pname"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="editform" label-width="70px">
        <el-form-item label="职位编号">
          <el-input v-model="editform.pid"></el-input>
        </el-form-item>
        <el-form-item label="职位名">
          <el-input v-model="editform.pname"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加弹出框 -->
    <el-dialog title="添加" :visible.sync="addVisible" width="30%">
      <el-form ref="form" :model="addform" label-width="70px">
        <el-form-item label="职位编号">
          <el-input v-model="addform.pid"></el-input>
        </el-form-item>
        <el-form-item label="职位名">
          <el-input v-model="addform.pname"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posData: [],
      search: "",
      editVisible: false,
      addVisible: false,
      editform: {},
      addform: {},
      oldpid: "",
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios.get("/api/posList").then((res) => {
        if (res.data.code == "500") {
          this.posData = res.data.results;
        }
      });
    },
    handleAdd() {
      this.addVisible = true;
    },
    // 保存添加
    saveAdd() {
      this.$axios.post("/api/addPos", this.addform).then((res) => {
        if (res.status === 200) {
          this.addVisible = false;
          this.$message.success(`修改第 ${this.idx + 1} 行成功`);
          this.$set(this.posData, this.idx, this.editform);
          this.getData();
        } else {
          this.$message({
            type: "success",
            message: "添加失败!",
          });
        }
      });
    },
    // 编辑操作
    handleEdit(index, row) {
      this.idx = index;
      this.editform = row;
      this.oldpid = row.pid;
      this.editVisible = true;
    },
    // 保存编辑
    saveEdit() {
      this.$axios
        .post("/api/updatePos", {
          newpid: this.editform.pid,
          newpname: this.editform.pname,
          pid: this.oldpid,
        })
        .then((res) => {
          if (res.status === 200) {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.posData, this.idx, this.editform);
          }
        });
    },
    // 删除操作
    handleDelete(index, row) {
      // 二次确认删除
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning",
      })
        .then(() => {
          this.$axios.post("/api/deletePos", { pid: row.pid }).then((res) => {
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
  },
};
</script>

<style>
.handle-box {
  margin-bottom: 20px;
}
</style>