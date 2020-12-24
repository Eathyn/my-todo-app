<template>
  <div id="main">
    <LeftView/>
    <MiddleView/>
    <RightView/>
  </div>
</template>

<script>
import LeftView from '@/views/left/LeftView'
import MiddleView from '@/views/middle/MiddleView'
import RightView from '@/views/right/RightView'

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
