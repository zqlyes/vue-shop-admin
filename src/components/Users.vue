<template>
  <div class="users">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/users">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜素框 -->
    <el-input placeholder="请输入内容" v-model="query" class="input-with-select">
      <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
    </el-input>
    <el-button type="success" @click="showAdd" plain>添加用户</el-button>
    <!-- 用户列表 -->
    <el-table :data="userList" style="width: 100%">
      <el-table-column prop="username" label="姓名" width="200"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="200"></el-table-column>
      <el-table-column label="状态" width="200">
        <template slot-scope="scope">
          <el-switch @change="updateStatus(scope.row)" v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="showEdit(scope.row)" icon="el-icon-edit" circle size="mini"></el-button>
          <el-button type="danger" @click="delUser(scope.row.id)" icon="el-icon-delete" circle size="mini"></el-button>
          <el-button type="success" icon="el-icon-check" plain round size="mini">分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[2, 4, 6, 8, 10]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!-- 添加用户的对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="40%">
      <el-form :model="addForm" ref="addForm" label-width="80px" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email" placeholder="请输入用户邮箱"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户的对话框 -->
    <el-dialog
      title="修改用户"
      :visible.sync="editDialogVisible"
      width="40%">
      <el-form :model="editForm" ref="editForm" label-width="80px" :rules="rules">
        <el-form-item label="用户名">
          <el-tag type="info">{{editForm.username}}</el-tag>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email" placeholder="请输入用户邮箱"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="editForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userList: [],
      query: '',
      currentPage: 1,
      pageSize: 2,
      total: 0,
      addDialogVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editDialogVisible: false,
      editForm: {
        id: '',
        email: '',
        mobile: '',
        username: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
        ],
        mobile: [
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '请输入有效的手机号',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      let res = await this.axios({
        method: 'get',
        url: 'users',
        params: {
          query: this.query,
          pagenum: this.currentPage,
          pagesize: this.pageSize
        }
      })
      // ES6的结构语法
      let { data, meta: { status } } = res
      if (status === 200) {
        this.userList = data.users
        this.total = data.total
      }
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getUserList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getUserList()
    },
    searchUser() {
      this.currentPage = 1
      this.getUserList()
      this.query = ''
    },
    async delUser(id) {
      try {
        await this.$confirm('你确定要删除该用户吗?', '温馨提示', {
          type: 'warning'
        })
        let res = await this.axios({
          method: 'delete',
          url: 'users/' + id
        })
        let { meta } = res
        if (meta.status === 200) {
          if (this.userList.length <= 1 && this.currentPage > 1) {
            this.currentPage--
          }
          this.$message.success(meta.msg)
          this.getUserList()
          this.$message.error('删除成功')
        } else {
          this.$message.error('删除失败')
        }
      } catch (error) {
        this.$message.info('取消删除')
      }
    },
    async updateStatus(user) {
      let res = await this.axios({
        method: 'put',
        url: `users/${user.id}/state/${user.mg_state}`
      })
      let { meta } = res
      if (meta.status === 200) {
        this.$message.success(meta.msg)
      } else {
        this.$message.error(meta.msg)
      }
    },
    showAdd() {
      this.addDialogVisible = true
    },
    async addUser() {
      try {
        await this.$refs.addForm.validate()
        let res = await this.axios({
          method: 'post',
          url: 'users',
          data: this.addForm
        })
        if (res.meta.status === 201) {
          this.$refs.addForm.resetFields()
          this.addDialogVisible = false
          this.total++
          this.currentPage = Math.ceil(this.total / this.pageSize)
          this.getUserList()
          this.$message.success('添加用户成功')
        } else {
          this.$message.error(res.meta.msg)
        }
      } catch (error) {
        return false
      }
    },
    async showEdit(user) {
      this.editDialogVisible = true
      let res = await this.axios({
        method: 'get',
        url: `users/${user.id}`
      })
      this.editForm.id = res.data.id
      this.editForm.email = res.data.email
      this.editForm.mobile = res.data.mobile
      this.editForm.username = res.data.username
    },
    async editUser() {
      try {
        await this.$refs.editForm.validate()
        let res = await this.axios({
          method: 'put',
          url: `users/${this.editForm.id}`,
          data: this.editForm
        })
        if (res.meta.status === 200) {
          this.$refs.editForm.resetFields()
          this.editDialogVisible = false
          this.getUserList()
          this.$message.success(res.meta.msg)
        } else {
          this.$message.error(res.meta.msg)
        }
      } catch (error) {
        return false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  height: 30px;
  line-height: 30px;
}
.input-with-select {
  width: 400px;
  margin-bottom: 5px;
}
</style>
