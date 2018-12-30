<template>
  <div class="rights">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/rights">权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 权限列表 -->
    <el-table :data="rightsList">
      <el-table-column type="index"></el-table-column>
      <el-table-column label="权限名称" prop="authName"></el-table-column>
      <el-table-column label="路径" prop="path"></el-table-column>
      <el-table-column label="层级">
        <template slot-scope="{row}">
          <span v-if="row.level === '0'">一级</span>
          <span v-else-if="row.level === '1'">二级</span>
          <span v-else>三级</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rightsList: []
    }
  },
  methods: {
    async getRightsList() {
      try {
        let res = await this.axios.get(`rights/list`)
        if (res.meta.status === 200) {
          this.rightsList = res.data
        }
      } catch (error) {
        this.$message.error('获取权限列表失败')
        return false
      }
    }
  },
  created() {
    this.getRightsList()
  }
}
</script>

<style>
</style>
