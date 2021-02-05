<template>
  <div class="container">
    <div class="col1">
      <div class="user">
        <div>用户管理</div>
        <div class="actions">
          <router-link to="/user/add" tag="div">增加用户</router-link>
          <router-link to="/user/edit" tag="div">编辑用户</router-link>
        </div>
      </div>
      <div class="admin">
        <div>管理员管理</div>
        <div class="actions">
          <router-link to="/admin/add" tag="div">增加管理员</router-link>
          <router-link to="/admin/edit" tag="div">编辑管理员</router-link>
        </div>
      </div>
    </div>
    <div class="col2">
      <nav>
        <div>待办清单应用后台管理系统</div>
        <div>管理员 : {{ admin.name }}</div>
      </nav>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data() {
    return {
      admin: {},
    }
  },
  methods: {
    async getAdmin(adminId) {
      const res = await this.$http.get(`/admin/${adminId}`)
      return res.data
    }
  },
  async created() {
    this.admin = await this.getAdmin(localStorage.adminId)
  },
}
</script>

<style scoped>
.container {
  display: flex;
  width: 100%;
  height: 100vh;
}
.col1 {
  background-color: indianred;
  width: 15%;
}
.col2 {
  background-color: #aaa9a9;
  width: 85%;
}

nav {
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 30px 60px 30px 40px;
  background-color: #5670d3;
}
</style>
