<script lang="ts" setup>
import { ref,computed } from 'vue'

const email=ref('')
const options=computed(()=>{
  return ['@gmail.com', '@163.com', '@qq.com'].map((suffix) => {
    const prefix = email.value.split('@')[0]
    return {
      label: prefix + suffix,
      value: prefix + suffix
    }
  })
})

</script>

<template>
  <div class="login-layout">
    <n-flex vertical class="flex-layout">
      <n-card title="邮箱登录" class="card-layout">
       <n-form>
        <n-form-item label="邮箱">
          <n-auto-complete
            v-model:value="email"
            :options="options"
            placeholder="请填写邮箱"
            clearable
            class="email-input"
          />
        </n-form-item>
       </n-form>
      </n-card>
    </n-flex>
  </div>
</template>

<style scoped>
.login-layout{
  width: 100vw;
  height: 100vh;
  background-color: aliceblue;
}
.flex-layout{
  height: 60vh;
  width: 100%;
  padding: 20vh 0 0 0;
}
.card-layout{
  border-width: 0;
}
</style>
