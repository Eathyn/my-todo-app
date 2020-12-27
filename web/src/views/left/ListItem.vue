<template>
  <li @click="getTasks" @contextmenu.stop.prevent="showMenu">{{ listItem.name }}</li>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ListItem',
  props: ['listItem'],
  methods: {
    ...mapActions(['getTaskItems', 'updateSelected', 'updateListItemMenu']),

    getTasks() {
      this.$store.dispatch('updateSelected', this.listItem.id)
      this.$store.dispatch('getTaskItems', this.selected)
    },

    showMenu(event) {
      this.$store.dispatch('updateListItemMenu', {
        left: event.pageX,
        top: event.pageY,
        display: 'block',
      })
    },
  },
  computed: {
    ...mapGetters(['selected'])
  }
}
</script>

<style scoped>
li {
  height: 36px;
  padding: 0 12px;
  color: #fefefe;
  list-style-type: none;
  line-height: 2.1;
  border-radius: 4px;
}
li:hover {
  background-color: #6275bf;
}
</style>
