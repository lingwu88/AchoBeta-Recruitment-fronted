<script lang="ts" setup>
import { PropTypes } from '@/utils/type/propTypes'
defineOptions({
  name:'errPage'
})
const props = defineProps({
  status:PropTypes.string.def('error'),
  title:PropTypes.string.def('错误!'),
  description:PropTypes.string.def('出错!error..er..')
})
</script>

<template>
  <n-result
  :status=props.status
  :title=props.title
  :description=props.description
  >
  </n-result>
</template>

<style scoped>
</style>
