<template>
  <input type="text" name="name" v-model="model.name"
         @keyup.enter="addTask" placeholder="添加任务，回车即可保存">
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
input {
  width: 670px;
  height: 40px;
  padding: 0 12px;
  font-size: 14px;
  background-color: rgba(44,66,118,0.06);
  border-radius: 4px;
  outline: none;
  border: 1px solid transparent;
}
</style>
