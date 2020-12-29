<template>
  <li @click="getTasks" :id="listItem.id" @contextmenu.stop.prevent="showMenu">
    <span>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-category"></use>
      </svg>
    </span>
    <span id="username">{{ listItem.name }}</span>
  </li>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ListItem',
  props: ['listItem'],
  methods: {
    ...mapActions(['getTaskItems', 'updateSelected', 'updateListItemMenu',
      'showMenu']),

    getTasks() {
      this.$store.dispatch('updateSelected', this.listItem.id)
      this.$store.dispatch('getTaskItems', this.selected)
    },

    showMenu(event) {
      const menu = {
        left: event.pageX,
        top: event.pageY,
        display: 'block',
      }
      this.$store.dispatch('updateListItemMenu', menu)

      // for edit popup
      const listItem = {
        id: this.listItem.id,
        name: this.listItem.name,
      }
      this.$store.dispatch('updateListItem', listItem)
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
  opacity: 0.8;
  list-style-type: none;
  line-height: 2.1;
  border-radius: 4px;
}
li:hover {
  background-color: #6275bf;
}
.icon {
  width: 1.5em;
  height: 1.5em;
  vertical-align: -0.35em;
  fill: currentColor;
  overflow: hidden;
}
#username {
  padding-left: 10px;
}
</style>
