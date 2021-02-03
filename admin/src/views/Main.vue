<template>
  <div class="container">
    <div class="col1">
      <div class="user">
        <div>用户管理</div>
        <div class="actions">
          <router-link to="/user/add" tag="div">增加用户</router-link>
          <router-link to="/user/delete" tag="div">删除用户</router-link>
          <router-link to="/user/modify" tag="div">修改用户</router-link>
        </div>
      </div>
      <div class="admin">
        <div>管理员管理</div>
        <div class="actions">
          <router-link to="/admin/add" tag="div">增加管理员</router-link>
          <router-link to="/admin/delete" tag="div">删除管理员</router-link>
          <router-link to="/admin/modify" tag="div">修改管理员</router-link>
        </div>
      </div>
    </div>
    <router-view class="col2"></router-view>
  </div>
</template>

<script>
export default {
  name: 'Main',
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
</style>
