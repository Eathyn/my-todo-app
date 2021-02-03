<template>
  <html>
  <head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
    <title>Admin Login</title>
  </head>

  <body class="text-center">
  <main class="form-signin">
    <h1 class="h3 mb-3 fw-normal">管理员登录</h1>
    <form>
      <label for="email" class="mb-3 w-100">
        <input v-model="model.email" id="email" type="email" name="email" class="form-control" placeholder="邮箱">
      </label>
      <label for=password class="mb-d w-100">
        <input v-model="model.password" id="password" type="password" name="password" class="form-control" placeholder="密码">
      </label>
      <button class="w-100 btn btn-lg btn-primary" type="submit" @click.stop.prevent="login">登录</button>
    </form>
  </main>
  </body>
  </html>
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
    async login() {
      const res = await this.$http.post('/login', this.model)
      localStorage.token = res.data.token
      localStorage.name = res.data.name

      // init
      this.model.email = ''
      this.model.password = ''

      // route to app page
      await this.$router.push('/')
    },
  }
}
</script>

<style scoped>
html,
body {
  height: 100vh;
  width: 100%;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
