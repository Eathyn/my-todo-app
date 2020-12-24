<template>
  <div>
    <h1>Register</h1>
    <form @submit="submitForm">
      <label for="name">Name:
        <input v-model="model.name" id="name" type="text" name="name">
      </label>
      <label for="email">Email:
        <input v-model="model.email" id="email" type="email" name="email">
      </label>
      <label for=password>Password:
        <input v-model="model.password" id="password" type="password" name="password">
      </label>
      <button>submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      model: {
        name: '',
        email: '',
        password: '',
      }
    }
  },
  methods: {
    submitForm(evt) {
      evt.preventDefault()
      this.$http.post('/register', this.model)
    },
  }
}
</script>

<style scoped>

</style>
