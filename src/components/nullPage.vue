<script lang="ts" setup>
import { PropTypes } from '@/utils/type/propTypes'
defineOptions({
  name:'nullPage'
})
const props = defineProps({
  desctiption:PropTypes.string.def('')
})
</script>

<template>
  <div>{{ props.desctiption }}</div>
</template>

<style scoped>
</style>
