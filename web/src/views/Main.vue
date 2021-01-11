<template>
  <div id="main">
    <LeftView/>
    <MiddleView/>
    <RightView/>
  </div>
</template>

<script>
import LeftView from './left/LeftView'
import MiddleView from './middle/MiddleView'
import RightView from './right/RightView'

export default {
  name: 'Main',
  components: {
    LeftView,
    MiddleView,
    RightView,
  }
}
</script>

<style scoped>
#main {
  display: flex;
}
</style>
