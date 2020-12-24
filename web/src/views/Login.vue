<template>
  <div>
    <h1>Login</h1>
    <form @submit="login">
      <label for="email">Email:
        <input v-model="model.email" id="email" type="email" name="email">
      </label>
      <label for="password">Password:
        <input v-model="model.password" id="password" type="password" name="password">
      </label>
      <button>Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      model: {
        email: '',
        password: '',
      }
    }
  },
  methods: {
    async login(evt) {
      evt.preventDefault()
      const res = await this.$http.post('/login', this.model)
      localStorage.token = res.data.token
      localStorage.name = res.data.name
      await this.$router.push('/')
    },
  }
}
</script>

<style scoped>

</style>
