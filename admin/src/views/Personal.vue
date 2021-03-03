<template>
  <div>
    <div class="header">
      <div class="portrait"><img src="../assets/imgs/avatar.png" alt="portrait"></div>
      <div class="name">{{ admin.name }}</div>
    </div>
    <div class="main">
      <h3>个人信息管理</h3>
      <div class="row">
        <div class="key">邮箱</div>
        <div class="value">
          <div v-if="!seen.emailInput">
            <div>{{ admin.email }}</div><div @click="openEmailInput">修改邮箱</div>
          </div>
          <div v-else>
            <label for="email"></label><input id="email" type="email" name="email" v-model="model.email" placeholder="新邮箱">
            <div class="buttons">
              <button @click="closeEmailInput">取消</button>
              <button @click="modifyEmail(adminId)">确认</button>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="key">名称</div>
        <div class="value">
          <div v-if="!seen.nameInput">
            <div>{{ admin.name }}</div><div @click="openNameInput">修改名称</div>
          </div>
          <div v-else>
            <label for="name"></label><input id="name" type="text" v-model="model.name" placeholder="新名称">
            <div class="buttons">
              <button @click="closeNameInput">取消</button>
              <button @click="modifyName(adminId)">确认</button>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="key">密码</div>
        <div class="value">
          <div v-if="!seen.passwordInput">
            <div>*****</div><div @click="openPasswordInput">修改密码</div>
          </div>
          <div v-else>
            <label for="currentPassword"></label><input id="currentPassword" type="password" name="currentPassword" v-model="model.currentPassword" placeholder="当前密码">
            <label for="newPassword"></label><input id="newPassword" type="password" name="newPassword" v-model="model.newPassword" placeholder="新密码">
            <label for="confirmedPassword"></label><input id="confirmedPassword" type="password" name="confirmedPassword" v-model="model.confirmedPassword" placeholder="确认新密码">
            <div class="buttons">
              <button @click="closePasswordInput">取消</button>
              <button @click="modifyPassword(adminId)">确认</button>
            </div>
          </div>
        </div>
      </div>
      <button @click="deleteAdminAccount(adminId)" class="button-delete">删除账户</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Personal',
  data() {
    return {
      adminId: localStorage.adminId,
      admin: {
        email: '',
        name: '',
        password: '',
      },
      model: {
        email: '',
        name: '',
        password: '',
        currentPassword: '',
        newPassword: '',
        confirmedPassword: '',
      },
      seen: {
        emailInput: false,
        nameInput: false,
        passwordInput: false,
      }
    }
  },
  methods: {
    async getAdmin(adminId) {
      const res = await this.$http.get(`/admin/${adminId}`)
      return res.data
    },
    openEmailInput() {
      this.seen.emailInput = true
    },
    openNameInput() {
      this.seen.nameInput = true
    },
    openPasswordInput() {
      this.seen.passwordInput = true
    },
    closeEmailInput() {
      this.seen.emailInput = false
    },
    closeNameInput() {
      this.seen.nameInput = false
    },
    closePasswordInput() {
      this.seen.passwordInput = false
    },
    async modifyEmail(adminId) {
      await this.$http.patch(`admin/${adminId}/email`, { email: this.model.email })
      this.admin = await this.getAdmin(adminId)
      this.seen.emailInput = false
    },
    async modifyName(adminId) {
      await this.$http.patch(`admin/${adminId}/name`, { name: this.model.name })
      this.admin = await this.getAdmin(adminId)
      this.seen.nameInput = false
    },
    async modifyPassword(adminId) {
      if (this.model.newPassword !== this.model.confirmedPassword) {
        alert('两次输入的密码不一致')
        this.model.newPassword = ''
        this.model.confirmedPassword = ''
        return
      }

      await this.$http.patch(`admin/${adminId}/password`, {
        currentPassword: this.model.currentPassword,
        newPassword: this.model.newPassword,
      })

      this.currentPassword = ''
      this.newPassword = ''
      this.confirmedPassword = ''
      this.seen.passwordInput = false
    },
    async deleteAdminAccount(adminId) {
      // delete account
      await this.$http.delete(`admin/${adminId}`)

      // clear token and adminId in localStorage
      localStorage.removeItem('token')
      localStorage.removeItem('adminId')

      // redirect to the register page
      await this.$router.push({path: '/register'})
    },
  },
  async created() {
    this.admin = await this.getAdmin(localStorage.adminId)
  },
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ecebeb;
  padding-bottom: 20px;
}
[alt='portrait'] {
  width: 100px;
  height: 100px;
}
.header > .name {
  font-size: 35px;
  box-sizing: border-box;
  padding: 0 0 60px 40px;
}

.row {
  box-sizing: border-box;
  padding: 20px 0;
  font-size: 18px;
  display: flex;
}
.row div {
  display: inline-block;
}
.key {
  padding-right: 200px;
}
.value > div:nth-child(1) > div:nth-child(2) {
  padding-left: 30px;
  font-size: 16px;
  color: #8c9ee1;
  vertical-align: 0.1em;
}
.value > div:nth-child(1) > div:nth-child(2):hover {
  cursor: pointer
}
.value input {
  padding: 8px 10px;
  border: 1px solid #e4e4e4;
  border-radius: 5px;
  outline: none;
  width: 220px;
}
.value input:focus {
  border: 1px solid #7086da;
}
.value button {
  width: 115px;
  height: 30px;
}
.row .buttons {
  display: flex;
  justify-content: space-between;
}
.buttons > button {
  border: 1px solid #e4e4e4;
  border-radius: 3px;
}
.buttons > button:active, .buttons > button:hover {
  outline: none;
}
.buttons > button:nth-child(1) {
  background-color: #eff1f6;
}
.buttons > button:nth-child(2) {
  background-color: #b1bdeb;
  color: #ffffff;
}
.buttons > button:nth-child(1):active, .buttons > button:nth-child(1):hover {
  background-color: #e6e9f1;
}
.buttons > button:nth-child(2):active, .buttons > button:nth-child(2):hover {
  background-color: #5670d3;
}
input {
  display: block;
  margin-bottom: 10px;
  color: #908c97;
}
.button-delete {
  font-size: 15px;
  box-sizing: border-box;
  padding: 8px 35px;
  border: none;
  border-radius: 3px;
  display: block;
  margin: 40px auto 0 auto;
}
.button-delete:hover {
  cursor: pointer;
  background-color: #e6e9f1;
}
</style>
