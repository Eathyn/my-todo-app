<template>
  <div>
    <div v-for="user in users" :key="user.id">
      {{ user.id }} - {{ user.email }} - {{ user.name }} - {{ user.role }}
      <button :id="user.id" @click="deleteUser(user.id)">删除</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserDelete',
  data() {
    return {
      users: [],
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
  },
  async created() {
    this.users = await this.getAllUsers()
  },
}
</script>

<style scoped>

</style>
