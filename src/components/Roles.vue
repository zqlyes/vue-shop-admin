<template>
  <div class="roles">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/roles">权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加角色按钮 -->
    <el-button type="success" plain>添加角色</el-button>
    <!-- 角色列表 -->
    <el-table :data="rolesList"></el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rolesList: []
    }
  },
  methods: {
    async getRolesList() {
      let res = await this.axios.get('roles')
      if (res.meta.status === 200) {
        this.rolesList = res.data
      }
    }
  },
  created() {
    this.getRolesList()
  }
}
</script>

<style>
</style>
