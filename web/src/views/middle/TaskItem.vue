<template>
  <li contenteditable="true">{{ taskItem.name }}</li>
</template>

<script>
export default {
  name: 'TaskItem',
  props: ['taskItem'],
}
</script>

<style scoped>
li {
  list-style-type: none;
  width: 635px;
  height: 35px;
  line-height: 2;
  padding: 0 12px;
  margin: 0 0 5px 0;
}
li:hover {
  background-color: rgba(66,83,136,0.06);
  border-radius: 4px;
}
li:focus {
  background-color: #eef0fb;
  outline: none;
}
</style>
