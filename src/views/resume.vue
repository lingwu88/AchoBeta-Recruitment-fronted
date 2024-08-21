<script lang="ts" setup>
import {formType} from '@/utils/formType'
import {ref} from 'vue'

const options=[
  {
    label:1,
    value:1
  },
  {
    label:2,
    value:2
  }
]

const gender=[
  {
    value:0,
    label:'男'
  },
  {
    value:1,
    label:'女'
  }
]

const form=ref<formType>({
  stuSimpleResumeDTO:{
    batchId:null ,    //招新批次
    studentId:null,       //学号
    name:'fsda',   //姓名
    gender:null, //性别
    grade:null,  //年级
    major:null,  //专业
    className:null,  //班级
    email:null,  //邮箱
    phoneNumber:null,  //phoneNumber
    reason:null, //加入AB的理由
    introduce:null, //简介
    experience:null, //经历
    image:null,  //证件照
    awards:null, //获奖经历
    remark:null //备注
  },
  stuAttachmentDTOList:{
    filename:null, //文件名
    attachment:null //附件列表
  }
})
const fileList=ref([])

const submit=()=>{
  console.log(form.value.stuSimpleResumeDTO);
  
}
</script>

<template>
  <n-form
    :model="form"
    label-align="left"
    label-placement="top"
    label-width="10vw"
  >
    <n-form-item label="证件照">
      <n-upload
        :default-file-list="fileList"
        list-type="image-card"
        :max="1"
        :default-upload="false"
        accept="image/png,image/jpeg,image/jpg"
      >
      快来上传你的靓照吧~
      </n-upload>
    </n-form-item>
    <n-form-item  label="姓名">
        <n-input v-model:value="form.stuSimpleResumeDTO.name" round/>
    </n-form-item>
    <n-form-item  label="招新批次">
      <n-select v-model:value="form.stuSimpleResumeDTO.batchId" :options="options" round/>
    </n-form-item>
    <n-form-item  label="学号">
        <n-input v-model:value="form.stuSimpleResumeDTO.studentId" round/>
    </n-form-item>
    <n-form-item  label="性别">
      <n-radio-group v-model:value="form.stuSimpleResumeDTO.gender" name="radiogroup">
        <n-space>
          <n-radio v-for="item in gender" :key="item.value" :value="item.value">
            {{ item.label }}
          </n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item  label="年级">
        <n-input v-model:value="form.stuSimpleResumeDTO.grade" round/>
    </n-form-item>
    <n-form-item  label="专业">
        <n-input v-model:value="form.stuSimpleResumeDTO.major" round/>
    </n-form-item>
    <n-form-item  label="班级">
        <n-input v-model:value="form.stuSimpleResumeDTO.className" round/>
    </n-form-item>
    <n-form-item  label="邮箱">
        <n-input v-model:value="form.stuSimpleResumeDTO.email" round/>
    </n-form-item>
    <n-form-item  label="手机号">
        <n-input v-model:value="form.stuSimpleResumeDTO.phoneNumber" round/>
    </n-form-item>
    <n-form-item  label="简介">
        <n-input v-model:value="form.stuSimpleResumeDTO.introduce" round/>
    </n-form-item>
    <n-form-item  label="经历">
        <n-input v-model:value="form.stuSimpleResumeDTO.experience" type="textarea" />
    </n-form-item>
    <n-form-item  label="获奖经历">
        <n-input v-model:value="form.stuSimpleResumeDTO.awards" type="textarea" />
    </n-form-item>
    <n-form-item  label="加入理由">
        <n-input v-model:value="form.stuSimpleResumeDTO.reason" type="textarea" />
    </n-form-item>
    <n-form-item  label="备注">
        <n-input v-model:value="form.stuSimpleResumeDTO.remark" round/>
    </n-form-item>
    <n-form-item >
        <n-button type="success" @click="submit">提交简历</n-button>
    </n-form-item>
  </n-form>
</template>

<style>
</style>
