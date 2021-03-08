<template>
  <li @click="getTasks" :id="listItem.id" @contextmenu.stop.prevent="toggleListMenu" :tabindex="listItem.id">
    <span><svg class="icon" aria-hidden="true"><use xlink:href="#icon-category"></use></svg></span>
    <span class="listName">{{ listItem.name }}</span>
  </li>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import listIcon from '../../assets/icons/list'

export default {
  name: 'ListItem',
  props: ['listItem'],
  computed: {
    ...mapGetters(['clickedList']),
  },
  methods: {
    ...mapActions(['updateClickedList', 'updateTaskItems', 'toggleListMenu', 'updateListItem']),

    async getTasks() {
      await this.$store.dispatch('updateClickedList', this.listItem.id)
      await this.$store.dispatch('updateTaskItems', this.clickedList.tasks)
    },
    toggleListMenu(evt) {
      this.$store.dispatch('toggleListMenu', evt)
      this.updateList()
    },
    updateList() {
      const { id, name } = this.listItem
      this.$store.dispatch('updateListItem', { id, name })
    },
  },
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
  outline: none;
}
li:hover {
  background-color: rgba(0,0,0,0.06);
}
li:active {
  background-color: rgba(0,0,0,0.12);
}
li:focus {
  background-color: rgba(0, 0, 0, 0.2);
}
.icon {
  width: 1.5em;
  height: 1.5em;
  vertical-align: -0.35em;
  fill: currentColor;
  overflow: hidden;
}
.listName {
  padding-left: 10px;
}
</style>
