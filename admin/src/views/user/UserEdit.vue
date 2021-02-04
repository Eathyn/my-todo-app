<template>
  <div>
    <div v-for="user in users" :key="user.id">
      {{ user.id }} - {{ user.email }} - {{ user.name }} - {{ user.role }}
      <button :id="user.id" @click="deleteUser(user.id)">删除</button>
      <button :id="user.id" @click="openUserModifyModal(user.id)">修改</button>
    </div>
    <div class="userModifyModal" v-if="modalSeen">
      <label for="email">邮箱</label><input type="text" id="email" name="email" v-model="userModified.model.email" required>
      <label for="name">用户名称</label><input type="text" id="name" name="name" v-model="userModified.model.name" required>
      <label for="password">密码</label><input type="password" id="password" name="password" v-model="userModified.model.password">
      <button @click="closeUserModifyModal">取消</button>
      <button @click="modifyUser">确认</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserEdit',
  data() {
    return {
      users: [],
      modalSeen: false,
      userModified: {
        id: '',
        model: {
          email: '',
          name: '',
          password: '',
        },
      },
    }
  },
  methods: {
    async getAllUsers() {
      const res = await this.$http.get('/users')
      return res.data
    },
    async deleteUser(id) {
      await this.$http.delete(`/user/${id}`)
      this.users = await this.getAllUsers()
    },
    async openUserModifyModal(id) {
      const res = await this.$http.get(`/user/${id}`)
      this.userModified.id = res.data.id
      this.userModified.model.email = res.data.email
      this.userModified.model.name = res.data.name
      this.userModified.model.password = ''
      this.modalSeen = true
    },
    closeUserModifyModal() {
      this.userModified.id = ''
      this.userModified.model.email = ''
      this.userModified.model.name = ''
      this.userModified.model.password = ''
      this.modalSeen = false
    },
    async modifyUser() {
      await this.$http.patch(`/user/${this.userModified.id}`, this.userModified.model)
      this.users = await this.getAllUsers()
      await this.closeUserModifyModal()
    },
  },
  async created() {
    this.users = await this.getAllUsers()
  },
}
</script>

<style scoped>

</style>
