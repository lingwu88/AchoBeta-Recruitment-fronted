<script lang="ts" setup>
import {formType} from '@/utils/formType'
import type { UploadFileInfo } from 'naive-ui'
// import { PropTypes } from '@/utils/propTypes'
import { ref , onMounted } from 'vue'
import { useRouter , useRoute } from 'vue-router'
import titleBlock from '@/components/titleBlock.vue'
import navigationTop from '@/components/navigationTop.vue'
import Add12Filled from '@vicons/fluent/Add12Filled'
import { submitResume } from '@/api/api'
import { queryResume } from '@/api/api'
import { useStore } from '@/store/index'
// import type { UploadCustomRequestOptions } from 'naive-ui'
import { useMessage } from 'naive-ui'

const storage=useStore()
const message=useMessage()
const title = ref<string>('')
const router=useRouter()
const params = useRoute().query

function isValidStudentId(studentId:string) {
  const inputRegex = /^\d{13}$/
  if(inputRegex.test(studentId)){
    return !inputRegex.test(studentId)        //如果是数字，则返回false，不会进入判定
  }
}
function isValidGrade(grade:number) {
  const inputRegex = /^\d{4}$/
  if(inputRegex.test(grade.toString())){
    return !inputRegex.test(grade.toString())        //如果是数字，则返回false，不会进入判定
  }
}

function isValidEmail(email:string) {
  const emailRegex = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  return !emailRegex.test(email)
}

function isValidPhone(phone:string) {
  const phoneRegex = /^\d{11}$/
  return !phoneRegex.test(phone)
}

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
    name:null,   //姓名
    gender:null, //性别
    grade:null,  //年级
    major:null,  //专业
    className:null,  //班级
    email:null,  //邮箱
    phoneNumber:null,  //phoneNumber
    reason:null, //加入AB的理由
    introduce:null, //简介
    experience:null, //经历
    image:"https://tse3-mm.cn.bing.net/th/id/OIP-C.fE-acoWUqqkKPSuQfR8NQwHaHW?w=179&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",  //证件照
    awards:null, //获奖经历
    remark:null //备注
  },
  stuAttachmentDTOList:[{
    filename:'', //文件名
    attachment:'' //附件列表
  }]
})

const submit=()=>{
  // router.push({path:'glanceActivities',query:{batchId:form.value.stuSimpleResumeDTO.batchId?.toString()}})
  if(form.value.stuSimpleResumeDTO.studentId==null || form.value.stuSimpleResumeDTO.studentId.trim()==='' || isValidStudentId(form.value.stuSimpleResumeDTO.studentId)){ //学号
    message.error('学号有误!')
    return
  }
  if(form.value.stuSimpleResumeDTO.name==null || form.value.stuSimpleResumeDTO.name.trim()===''){   //姓名
    message.error('请输入姓名')
    return
  }
  if(form.value.stuSimpleResumeDTO.gender==null){     //性别
    message.error('请选择性别')
    return
  }
  if(form.value.stuSimpleResumeDTO.grade==null || isValidGrade(form.value.stuSimpleResumeDTO.grade)){     //年级
    message.error('年级有误!')
    return
  }
  if(form.value.stuSimpleResumeDTO.major==null || form.value.stuSimpleResumeDTO.major.trim()===''){    //专业
    message.error('请输入专业')
    return
  }
  if(form.value.stuSimpleResumeDTO.className==null || form.value.stuSimpleResumeDTO.studentId.trim()===''){
    message.error('班级')
    return
  }
  if(form.value.stuSimpleResumeDTO.email==null || form.value.stuSimpleResumeDTO.email.trim()==='' || isValidEmail(form.value.stuSimpleResumeDTO.email)){
    message.error('邮箱有误!')
    return
  }
  if(form.value.stuSimpleResumeDTO.phoneNumber==null || form.value.stuSimpleResumeDTO.phoneNumber.trim()==='' || isValidPhone(form.value.stuSimpleResumeDTO.phoneNumber)){
    message.error('手机号有误!')
    return
  }
  if(form.value.stuSimpleResumeDTO.reason==null || form.value.stuSimpleResumeDTO.reason.trim()===''){
    message.error('请输入加入AB的理由')
    return
  }
  if(form.value.stuSimpleResumeDTO.introduce==null || form.value.stuSimpleResumeDTO.introduce.trim()===''){
    message.error('请输入简历')
    return
  }
  if(form.value.stuSimpleResumeDTO.experience==null || form.value.stuSimpleResumeDTO.experience.trim()===''){
    message.error('请输入经历')
    return
  }
  if(form.value.stuSimpleResumeDTO.image==null || form.value.stuSimpleResumeDTO.image.trim()===''){
    message.error('请上传证件照')
    return
  }
  if(form.value.stuSimpleResumeDTO.awards==null || form.value.stuSimpleResumeDTO.awards.trim()===''){
    message.error('请完善获奖经历')
    return
  }
  submitResume(storage.token,form.value).then(res=>{
    console.log(res);
  }).catch(err=>{
    console.log(err);
    
  })
}
const toActivities=()=>{
  router.push({path:'/glanceActivities',query:{batchId:params.batchId}})
}

onMounted(()=>{
  form.value.stuSimpleResumeDTO.batchId=parseInt(params.batchId as string)      //将上个页面选择的id，送到当前页面作为不可更改批次使用
  title.value = (params.title as string)
  queryResume((params.batchId as string ),storage.token).then(res=>{
    console.log(res);
    if(res.data.code===200){   //如果200，且有简历上传过
      form.value.stuSimpleResumeDTO.batchId=res.data.data.stuSimpleResumeVO.batchId
      form.value.stuSimpleResumeDTO.studentId=res.data.data.stuSimpleResumeVO.studentId
      form.value.stuSimpleResumeDTO.name=res.data.data.stuSimpleResumeVO.name
      form.value.stuSimpleResumeDTO.gender=res.data.data.stuSimpleResumeVO.gender
      form.value.stuSimpleResumeDTO.grade=res.data.data.stuSimpleResumeVO.grade
      form.value.stuSimpleResumeDTO.major=res.data.data.stuSimpleResumeVO.major
      form.value.stuSimpleResumeDTO.className=res.data.data.stuSimpleResumeVO.className
      form.value.stuSimpleResumeDTO.email=res.data.data.stuSimpleResumeVO.email
      form.value.stuSimpleResumeDTO.phoneNumber=res.data.data.stuSimpleResumeVO.phoneNumber
      form.value.stuSimpleResumeDTO.reason=res.data.data.stuSimpleResumeVO.reason
      form.value.stuSimpleResumeDTO.introduce=res.data.data.stuSimpleResumeVO.introduce
      form.value.stuSimpleResumeDTO.experience=res.data.data.stuSimpleResumeVO.experience
      form.value.stuSimpleResumeDTO.image=res.data.data.stuSimpleResumeVO.image
      form.value.stuSimpleResumeDTO.awards=res.data.data.stuSimpleResumeVO.awards
      form.value.stuSimpleResumeDTO.remark=res.data.data.stuSimpleResumeVO.remark
    }
  }).catch(err=>{
    console.log(err);
    
  })
})

const beforeUpload=(data:{          //可以通过这个，获取上传文件信息
  file: UploadFileInfo
})=>{
  console.log(data.file);
}
</script>

<template>
  <div class="resume-layout">
    <navigationTop class="top"></navigationTop>
    <n-h1 class="header-description">
      <n-text type="primary">
        {{ title }}
      </n-text>
    </n-h1>
    <n-form
      :model="form"
      label-align="left"
      label-placement="top"
      label-width="10vw"
      class="form"
    >
    <titleBlock title="个人信息" class="title"></titleBlock>
      <n-form-item label="证件照" class="label-width" required>
        <n-upload
          list-type="image-card"
          :max="1"
          :default-upload="false"
          accept="image/png,image/jpeg,image/jpg"
          class="photo"
          @before-upload="beforeUpload"
        >
        快来上传你的靓照吧~
        </n-upload>
      </n-form-item>
      <n-form-item  label="姓名" class="label-width" required >
          <n-input v-model:value="form.stuSimpleResumeDTO.name" class="width"/>
      </n-form-item>
      <n-form-item  label="招新批次" class="label-width" required readonly>
        <n-input v-model:value="form.stuSimpleResumeDTO.batchId" class="width" disabled/>
      </n-form-item>
      <n-form-item  label="学号" class="label-width" required>
          <n-input v-model:value="form.stuSimpleResumeDTO.studentId" class="width" />
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
          <n-input v-model.number:value="form.stuSimpleResumeDTO.grade" class="width" :input-props="{ type:'number' }"/>
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
              <n-icon size="48" :depth="2">
                <Add12Filled />
              </n-icon>
            </div>
            <n-text style="font-size: 16px">
              点击该区域来上传文件
            </n-text>
          </n-upload-dragger>
        </n-upload>
      </n-form-item>
      <n-flex justify="space-around" class="flex-button">
        <n-button type="success" @click="submit">提交简历</n-button>
        <n-button type="info" @click="submit">存为草稿</n-button>
      </n-flex>
      <n-button type="warning" class="last-button" @click="toActivities">查看批次活动</n-button>
    </n-form>
  </div>
</template>

<style scoped>
.resume-layout{
  width:100vw;
  min-height:auto;
  background-color: #71cde9;
}
.top{
  z-index: 999;
  position: sticky;
  top: 0;
}
.header-description{
  margin: 2vh 0 0 2vw;
}
.label-width{
  margin: 0 0 0 3vw;
  height: auto!important;;
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
  padding:0 0 2vh 0;
  margin:0 6vw 0 auto;
}
.last-button{
  width: 40vw;
  margin:1vh 0 2vh 27vw;
}
.title{
  margin: 3vh 0 0 4vw;
}
</style>
