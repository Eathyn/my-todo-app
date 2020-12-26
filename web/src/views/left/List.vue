<template>
  <div>
    <ul>
      <ListItem v-for="listItem in listItems" :key="listItem.id" :list-item="listItem"/>
    </ul>
    <div @click="seen = true">添加清单</div>
    <ListCreate :seen="seen" @closeModal="seen = false"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ListItem from '@/views/left/ListItem'
import ListCreate from '@/views/left/ListCreate'

export default {
  name: 'List',
  data() {
    return {
      seen: false,
    }
  },
  computed: {
    ...mapGetters(['listItems'])
  },
  methods: {
    ...mapActions(['getListItems']),
  },
  created() {
    this.$store.dispatch('getListItems')
  },
  components: {
    ListItem,
    ListCreate,
  },
}
</script>

<style scoped>

</style>
