<template>
  <div class="container">
    <div class="header">
      <div>待办清单应用后台管理系统</div>
      <div>
        <svg class="icon" aria-hidden="true"><use xlink:href="#icon-bussiness-man"></use></svg>
        <span>管理员</span>
      </div>
    </div>
    <div class="main">
      <div class="col1">
        <div class="personal">
          <router-link to="/personal" tag="div" class="classification">
            <svg class="icon" aria-hidden="true"><use xlink:href="#icon-bussiness-man"></use></svg>
            <span>个人信息管理</span>
          </router-link>
        </div>
        <div class="user">
          <div class="classification">
            <svg class="icon" aria-hidden="true"><use xlink:href="#icon-Customermanagement"></use></svg>
            <span>用户管理</span>
          </div>
          <div>
            <router-link to="/user/add" tag="div" class="action">
              <svg class="icon" aria-hidden="true"><use xlink:href="#icon-add-select"></use></svg>
              <span>增加用户</span>
            </router-link>
            <router-link to="/user/edit" tag="div" class="action">
              <svg class="icon" aria-hidden="true"><use xlink:href="#icon-editor"></use></svg>
              <span>编辑用户</span>
            </router-link>
          </div>
        </div>
        <div class="admin">
          <div class="classification">
            <svg class="icon" aria-hidden="true"><use xlink:href="#icon-Customermanagement-fill"></use></svg>
            <span>管理员管理</span>
          </div>
          <div>
            <router-link to="/admin/add" tag="div" class="action">
              <svg class="icon" aria-hidden="true"><use xlink:href="#icon-add-select"></use></svg>
              <span>增加管理员</span>
            </router-link>
            <router-link to="/admin/edit" tag="div" class="action">
              <svg class="icon" aria-hidden="true"><use xlink:href="#icon-editor"></use></svg>
              <span>编辑管理员</span>
            </router-link>
          </div>
        </div>
      </div>
      <div class="col2">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import personalIcon from '../assets/icons/personal'
// eslint-disable-next-line no-unused-vars
import userIcon from '../assets/icons/user'
// eslint-disable-next-line no-unused-vars
import adminIcon from '../assets/icons/admin'
// eslint-disable-next-line no-unused-vars
import addIcon from '../assets/icons/add'
// eslint-disable-next-line no-unused-vars
import editIcon from '../assets/icons/edit'

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
.icon {
  width: 1.5em;
  height: 1.5em;
  padding-right: 5px;
  vertical-align: -0.35em;
  fill: currentColor;
  overflow: hidden;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fafafa;
  box-sizing: border-box;
  padding: 40px 0 0 0;
}
.header {
  display: flex;
  justify-content: space-between;
  width: 60%;
  box-sizing: border-box;
  padding: 0 70px 40px 70px;
  font-size: 22px;
}
.main {
  display: flex;
  width: 60%;
  height: 80vh;
  border: 1px solid #f2f2f2;
}
.col1 {
  background-color: #ffffff;
  width: 25%;
  color: #51545a;
  box-sizing: border-box;
  padding: 30px;
  border-right: 1px solid #f2f2f2;
}
.col2 {
  background-color: #ffffff;
  width: 75%;
  box-sizing: border-box;
  padding: 30px;
}

.personal, .user, .admin {
  box-sizing: border-box;
  padding: 0 0 15px 0;
}
.classification, .action {
  box-sizing: border-box;
}
.classification {
  padding: 0 0 10px 0;
}
.action {
  margin: 0 0 10px 10px;
}

.action:hover, .personal > div:hover {
  font-weight: bold;
  cursor: pointer;
}
</style>
