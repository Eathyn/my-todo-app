<template>
  <div>
    <label for="email">邮箱</label><input type="email" id="email" name="email" v-model="model.email">
    <label for="name">用户名</label><input type="text" id="name" name="id" v-model="model.name">
    <label for="password">密码</label><input type="password" id="password" name="password" v-model="model.password">
    <button @click="submit">提交</button>
  </div>
</template>

<script>
export default {
  name: 'UserAdd',
  data() {
    return {
      model: {
        email: '',
        name: '',
        password: '',
      }
    }
  },
  methods: {
    submit() {
      this.$http.post('/userAdd', this.model)
      this.model.email = ''
      this.model.name = ''
      this.model.password = ''
    },
  }
}
</script>

<style scoped>

</style>
