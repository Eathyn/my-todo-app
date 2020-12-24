<template>
  <label for="task">
    <input type="text" id="task" name="name" v-model="model.name"
           @keyup.enter="addTask">
  </label>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'TaskAdder',
  data() {
    return {
      model: {
        name: '',
      }
    }
  },
  methods: {
    ...mapActions(['addTaskItem']),

    addTask() {
      this.$store.dispatch('addTaskItem', {
        selected: this.selected,
        model: this.model,
      })
      this.model.name = ''
    },
  },
  computed: {
    ...mapGetters(['selected'])
  }
}
</script>

<style scoped>

</style>
