<template>
  <li @click="getTasks">{{ listItem.name }}</li>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ListItem',
  props: ['listItem'],
  methods: {
    ...mapActions(['getTaskItems', 'updateSelected']),

    getTasks() {
      this.$store.dispatch('updateSelected', this.listItem.id)
      this.$store.dispatch('getTaskItems', this.selected)
    },
  },
  computed: {
    ...mapGetters(['selected'])
  }
}
</script>

<style scoped>

</style>
