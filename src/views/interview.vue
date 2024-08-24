<script lang="ts" setup>
import interviewResult from '@/components/interviewResult.vue'
import interviewArrangement from '@/components/interviewArrangement.vue'
import { ref } from 'vue'
const interviewTurn=ref('初试')
</script>

<template>
  <div class="interview-layout">
    <p class="interview-name">{{ interviewTurn }}</p>
    <interviewResult></interviewResult>
    <interviewArrangement></interviewArrangement>
  </div>
</template>

<style scoped>
.interview-layout{
  width: 100vw;
  min-height: 80vh;
}
.interview-name{
  font-size: 1.6rem;
  font-weight: bolder;
  margin: 3vh 0 0 40vw;
}
</style>
