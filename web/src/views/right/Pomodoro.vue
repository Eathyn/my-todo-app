<template>
  <div id="pomodoro">
    <div v-if="taskCountdown">正在进行 : {{ taskCountdown.name }}</div>
    <div class="time">
      {{ pomodoro.minute.toString().padStart(2, '0') }} :
      {{ pomodoro.second.toString().padStart(2, '0') }}
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Pomodoro',
  computed: {
    ...mapGetters(['taskCountdown', 'pomodoro',])
  },
  methods: {
    ...mapActions(['updatePomodoro'])
  },
  created() {
    this.$store.dispatch('updatePomodoro')
  },
}
</script>

<style scoped>
#pomodoro {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80px;
  text-align: center;
  border-bottom: 1px solid rgb(73 74 77 / 0.22);
}

#pomodoro > :nth-child(1) {
  font-size: 20px;
  padding-bottom: 5px;
  color: #5d5c5cd9;

}
#pomodoro > :nth-child(2) {
  font-size: 16px;
  color: #5d5c5cd9;
}

.time {
  font-size: 20px;
}
</style>
