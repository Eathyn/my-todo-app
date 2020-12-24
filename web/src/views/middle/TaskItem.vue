<template>
  <li>{{ taskItem.name }}</li>
</template>

<script>
export default {
  name: 'TaskItem',
  props: ['taskItem'],
}
</script>

<style scoped>

</style>
