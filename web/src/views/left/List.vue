<template>
  <div>
    <ul>
      <ListItem v-for="listItem in listItems" :key="listItem.id" :list-item="listItem"/>
    </ul>

    <label for="list">New List:
      <input type="text" id="list" name="name" v-model="model.name"
        @keyup.enter="addList">
    </label>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ListItem from '@/views/left/ListItem'

export default {
  name: 'List',
  data() {
    return {
      model: {
        name: '',
      }
    }
  },
  computed: {
    ...mapGetters(['listItems'])
  },
  methods: {
    ...mapActions(['getListItems', 'addListItem']),

    async addList() {
      await this.$store.dispatch('addListItem', this.model)
      this.model.name = ''
    },
  },
  created() {
    this.$store.dispatch('getListItems')
  },
  components: {
    ListItem,
  }
}
</script>

<style scoped>

</style>
