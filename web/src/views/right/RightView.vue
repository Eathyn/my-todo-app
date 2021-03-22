<template>
  <div id="right-view">
    <Countdown/>
  </div>
</template>

<script>
import Countdown from './Countdown'

export default {
  name: 'RightView',
  components: {
    Countdown,
  },
}
</script>

<style scoped>
#right-view {
  box-sizing: border-box;
  width: 542px;
  height: 100vh;
  padding: 0 20px;
  background-color: #ffffff;
}
</style>
