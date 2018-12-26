<template>
  <div class="login">
    <div class="box">
      <img src="@/assets/avatar.jpg" alt="">
      <el-form :model="form" :rules="rules" ref="form" label-width="80px" status-icon>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">登录</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'change' },
          { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    resetForm() {
      this.$refs['form'].resetFields()
    },
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (!valid) return false
        axios({
          method: 'post',
          url: 'http://localhost:8888/api/private/v1/login',
          data: this.form
        }).then(res => {
          console.log(res.data)
          if (res.data.meta.status === 200) {
            this.$message({
              message: res.data.meta.msg,
              type: 'success',
              duration: 1000
            })
            localStorage.setItem('token', res.data.data.token)
            this.$router.push('/home')
          } else {
            this.$message.error(res.data.meta.msg)
          }
        })
      })
    }
  }
}
</script>

<style lang="less">
  .login{
    height: 100%;
    background-color: #2D434C;
    overflow: hidden;

    .box{
      width: 500px;
      height: 280px;
      background-color: #fff;
      border-radius: 20px;
      margin: 200px auto 0;
      position: relative;
      padding: 80px 60px 0 30px;

      img{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: -70px;
        border-radius: 50%;
        border: 10px solid #fff;
      }

      .el-button ~ .el-button{
        margin-left: 80px;
      }

    }
  }
</style>
