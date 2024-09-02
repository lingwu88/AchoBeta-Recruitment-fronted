<script lang="ts" setup>
import interviewResult from '@/components/interviewResult.vue'
import interviewArrangement from '@/components/interviewArrangement.vue'
</script>

<template>
  <div class="interview-layout">
    <interviewResult></interviewResult>
    <interviewArrangement></interviewArrangement>
  </div>
</template>

<style scoped>
.interview-layout{
  width: 100vw;
  min-height: 80vh;
}
</style>
