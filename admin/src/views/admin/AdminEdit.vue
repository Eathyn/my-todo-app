<template>
  <div>
    <div v-for="admin in admins" :key="admin.id">
      {{ admin.id }} - {{ admin.email }} - {{ admin.name }}
      <button @click="deleteAdmin(admin.id)">删除</button>
      <button @click="openAdminModifyModal(admin.id)">编辑</button>
    </div>
    <div class="adminModifyModal" v-if="modalSeen">
      <label for="email">邮箱</label><input type="text" id="email" name="email" v-model="adminModified.model.email" required>
      <label for="name">用户名称</label><input type="text" id="name" name="name" v-model="adminModified.model.name" required>
      <label for="password">密码</label><input type="password" id="password" name="password" v-model="adminModified.model.password">
      <button @click="closeAdminModifyModal">取消</button>
      <button @click="modifyAdmin">确认</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminEdit',
  data() {
    return {
      admins: [],
      modalSeen: false,
      adminModified: {
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
    async getAllAdmins() {
      const res = await this.$http.get('/admins')
      return res.data
    },
    async deleteAdmin(id) {
      await this.$http.delete(`/admin/${id}`)
      this.admins = await this.getAllAdmins()
    },
    async openAdminModifyModal(id) {
      const res = await this.$http.get(`/admin/${id}`)
      this.adminModified.id = res.data.id
      this.adminModified.model.email = res.data.email
      this.adminModified.model.name = res.data.name
      this.adminModified.model.password = ''
      this.modalSeen = true
    },
    closeAdminModifyModal() {
      this.adminModified.id = ''
      this.adminModified.model.email = ''
      this.adminModified.model.name = ''
      this.adminModified.model.password = ''
      this.modalSeen = false
    },
    async modifyAdmin() {
      await this.$http.patch(`/admin/${this.adminModified.id}`, this.adminModified.model)
      this.admins = await this.getAllAdmins()
      await this.closeAdminModifyModal()
    },
  },
  async created() {
    this.admins = await this.getAllAdmins()
  },
}
</script>

<style scoped>

</style>
