<script lang="ts" setup>
import {formType} from '@/utils/formType'
import {ref} from 'vue'
import titleBlock from '@/components/titleBlock.vue'
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
    class="form"
  >
  <div class="space"></div>
  <titleBlock title="个人信息" class="title"></titleBlock>
    <n-form-item label="证件照" class="label-width" required>
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
    <n-form-item  label="姓名" class="label-width" required >
        <n-input v-model:value="form.stuSimpleResumeDTO.name" class="width"/>
    </n-form-item>
    <n-form-item  label="招新批次" class="label-width" required>
      <n-select v-model:value="form.stuSimpleResumeDTO.batchId" :options="options" class="width"/>
    </n-form-item>
    <n-form-item  label="学号" class="label-width" required>
        <n-input v-model:value="form.stuSimpleResumeDTO.studentId" class="width"/>
    </n-form-item>
    <n-form-item  label="性别" class="label-width" required>
      <n-radio-group v-model:value="form.stuSimpleResumeDTO.gender" name="radiogroup">
        <n-space>
          <n-radio v-for="item in gender" :key="item.value" :value="item.value">
            {{ item.label }}
          </n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item  label="年级" class="label-width" required>
        <n-input v-model:value="form.stuSimpleResumeDTO.grade" class="width"/>
    </n-form-item>
    <n-form-item  label="专业" class="label-width" required>
        <n-input v-model:value="form.stuSimpleResumeDTO.major" class="width"/>
    </n-form-item>
    <n-form-item  label="班级" class="label-width" required>
        <n-input v-model:value="form.stuSimpleResumeDTO.className" class="width"/>
    </n-form-item>
    <n-form-item  label="邮箱" class="label-width" required>
        <n-input v-model:value="form.stuSimpleResumeDTO.email" class="width"/>
    </n-form-item>
    <n-form-item  label="手机号" class="label-width" required>
        <n-input v-model:value="form.stuSimpleResumeDTO.phoneNumber" class="width"/>
    </n-form-item>
    <n-form-item  label="简介" class="label-width" required>
        <n-input v-model:value="form.stuSimpleResumeDTO.introduce" class="width"/>
    </n-form-item>
    <n-form-item  label="经历" class="label-width" required>
        <n-input v-model:value="form.stuSimpleResumeDTO.experience" type="textarea" class="width" />
    </n-form-item>
    <n-form-item  label="获奖经历" class="label-width" required>
        <n-input v-model:value="form.stuSimpleResumeDTO.awards" type="textarea" class="width"/>
    </n-form-item>
    <n-form-item  label="加入理由" class="label-width" required>
        <n-input v-model:value="form.stuSimpleResumeDTO.reason" type="textarea" class="width"/>
    </n-form-item>
    <n-form-item  label="备注" class="label-width">
        <n-input v-model:value="form.stuSimpleResumeDTO.remark" class="width"/>
    </n-form-item>
    <div class="space"></div>
    <titleBlock title="附件上传" class="title"></titleBlock>
    <n-form-item label="附件" class="label-width" required>
      <n-upload
        multiple
        directory-dnd
        default-uoload="false"
        :max="5"
        class="width"
      >
        <n-upload-dragger>
          <div style="margin-bottom: 12px">
            <n-icon size="48" :depth="3">
              <ArchiveIcon />
            </n-icon>
          </div>
          <n-text style="font-size: 16px">
            点击该区域来上传文件
          </n-text>
        </n-upload-dragger>
      </n-upload>
    </n-form-item>
    <n-form-item >
      <n-flex justify="space-around" class="flex-button">
        <n-button type="success" @click="submit">提交简历</n-button>
        <n-button type="info" @click="submit">存为草稿</n-button>
      </n-flex>
    </n-form-item>
  </n-form>
</template>

<style scoped>
.label-width{
  margin: 0 0 0 3vw;
}
.width{
  width: 94vw;
  border-radius: 5px;
}
.space{
  background-color: rgba(255, 255, 255, 0.756);
  height: 1vh;
  margin: 0 0 2vh 0;
}
.flex-button{
  width: 90vw;
  margin:0 6vw 0 auto;
}
.title{
  margin: 3vh 0 0 4vw;
}
</style>
