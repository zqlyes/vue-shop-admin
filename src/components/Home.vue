<template>
  <el-container class="home">
    <el-header>
      <div class="logo"></div>
      <div class="title">
        <h1>电商管理系统</h1>
      </div>
      <div class="logout">
        <span>欢迎光临</span>
        <a href="javascipt:;" @click="logout">退出</a>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="1-1"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router
          >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/users">
              <i class="el-icon-menu"></i>
              <span>用户列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="/roles">
              <i class="el-icon-menu"></i>
              <span>角色列表</span>
            </el-menu-item>
            <el-menu-item index="/rights">
              <i class="el-icon-menu"></i>
              <span>权限列表</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    async logout() {
      try {
        await this.$confirm('您确定要退出本系统吗？', '温馨提示', {
          type: 'warning'
        })
        localStorage.removeItem('token')
        this.$router.push('/login')
        this.$message.success('退出成功')
      } catch (error) {
        this.$message.info('取消退出')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  .el-header {
    background-color: #b3c1cd;
    display: flex;

    .logo {
      width: 180px;
      background: url('~@/assets/logo.png') no-repeat;
      background-size: contain;
      background-position: center center;
    }

    .title {
      flex: 1;

      h1 {
        text-align: center;
        line-height: 60px;
        color: #fff;
        font-size: 30px;
      }
    }

    .logout {
      width: 180px;
      line-height: 60px;
      text-align: right;
      font-weight: bold;

      a {
        color: orange;
      }
    }
  }

  .el-aside {
    background-color: #545c64;

    .el-submenu {
      width: 200px;
    }
  }

  .el-main {
    background-color: #d4dfe4;
  }
}
</style>
