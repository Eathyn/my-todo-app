<template>
  <div>
    <div class="header">
      <div class="portrait"></div>
      <div class="name"></div>
    </div>
    <div class="main">
      <div>
        <div v-if="!seen.emailInput">
          <span>邮箱</span><span>{{ admin.email }}</span><span @click="openEmailInput">修改邮箱</span>
        </div>
        <div v-else>
          <label for="email"></label><input id="email" type="email" name="email" v-model="model.email">
          <button @click="closeEmailInput">取消</button>
          <button @click="modifyEmail(adminId)">确认</button>
        </div>
      </div>
      <div>
        <div v-if="!seen.nameInput">
          <span>名称</span><span>{{ admin.name }}</span><span @click="openNameInput">修改名称</span>
        </div>
        <div v-else>
          <label for="name"></label><input id="name" type="text" v-model="model.name">
          <button @click="closeNameInput">取消</button>
          <button @click="modifyName(adminId)">确认</button>
        </div>
      </div>
      <div>
        <div v-if="!seen.passwordInput">
          <span>密码</span><span>*****</span><span @click="openPasswordInput">修改密码</span>
        </div>
        <div v-else>
          <label for="currentPassword"></label><input id="currentPassword" type="password" name="currentPassword" v-model="model.currentPassword" placeholder="当前密码">
          <label for="newPassword"></label><input id="newPassword" type="password" name="newPassword" v-model="model.newPassword" placeholder="新密码">
          <label for="confirmedPassword"></label><input id="confirmedPassword" type="password" name="confirmedPassword" v-model="model.confirmedPassword" placeholder="确认新密码">
          <button @click="closePasswordInput">取消</button>
          <button @click="modifyPassword(adminId)">确认</button>
        </div>
      </div>
      <button @click="deleteAdminAccount(adminId)">删除账户</button>
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
.main {

}
</style>
