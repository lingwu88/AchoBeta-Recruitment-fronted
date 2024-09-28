<script lang="ts" setup>
import {formType , attachmentList} from '@/utils/type/formType'
import type { UploadFileInfo } from 'naive-ui'
// import { PropTypes } from '@/utils/propTypes'
import { ref , onMounted , watch , onBeforeUnmount} from 'vue'
import { useRouter , useRoute } from 'vue-router'
import titleBlock from '@/components/titleBlock.vue'
import navigationTop from '@/components/navigationTop.vue'
import Add12Filled from '@vicons/fluent/Add12Filled'
import { submitResume , queryResume , uploadFileList , uploadPicture , resourcePreview , deleteResource} from '@/api/api'
import { useStore } from '@/store/index'
import { useMessage,useDialog } from 'naive-ui'
import { deCode } from '@/utils/URIProtect'
import { useIdStore } from '@/store/idStore'

const pageHeight=ref(document.documentElement.scrollHeight)
const idStore = useIdStore()
const storage=useStore()
const message=useMessage()
const dialog=useDialog()
const title = ref<string>('')
const batchId = ref<string>('')
const count = ref<number>(3)
const router=useRouter()
const params = useRoute().query

const showModal = ref<boolean>(false)
const fileList = ref<UploadFileInfo[]>([])


let fileArr:File[] = []             //有值时才说明有新文件，没值则说明没有新文件（有旧文件和没有旧文件）
let picture:File | null = null
let compareList:attachmentList[] = []           //用来对比是否有删附件资源
let fileListCode:attachmentList[] = []     //附件资源码
let pictureCode:number|null = null
//资源上传的file表单类型
const pictureData = new FormData()
const fileListData = new FormData()

function isValidStudentId(studentId:string) {
  const inputRegex = /^20\d{8,11}$/
   //符合条件(true)，则返回false；不符合条件(false)，则返回true
   return !inputRegex.test(studentId)        //如果是数字，则返回false，不会进入判定
}
function isValidGrade(grade:number) {
  const inputRegex = /^\d{4}$/
  return !inputRegex.test(grade.toString())        //如果是数字，则返回false，不会进入判定
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
    image:null,  //证件照
    awards:null, //获奖经历
    remark:null, //备注,
    stateCount:999      //剩余可提交次数
  },
  stuAttachmentDTOList:[]
})

const judgDelete = async function(){
    //先判断是否有删除曾经的
    //以对照附件表中的资源码为样本，对比fileListCode这个即将上传的附件资源码列表，查看即将上传的表中是否能找到对照表的码，不行则为删除
    for(const item of compareList){
    
      const hasValue = fileListCode.some(obj=>obj.attachment === item.attachment)
      
      if(!hasValue){                               //hasValue为true，说明有该值，即没被删掉;为false，则说明fileListCode里面没有item的值，已经在用户可视处删除了
        console.log('没错,这个资源已经被删掉了');
        await deleteResource(storage.token,item.attachment).then(async res=>{
          console.log(res);
          if(res.data.code === 200){                              //还要删附件列表
            console.log('成功删除');                              //找被删去的资源码在表单数据中的下表

            const index = await (async (code: number) => {
            for (let i = 0; i < form.value.stuAttachmentDTOList.length; i++) {
              if (form.value.stuAttachmentDTOList[i].attachment === code) {
                console.log('找到应该被删除的附件下标'+i);
                form.value.stuAttachmentDTOList.splice(i,1)        //修改目前fileListCode的数组，删去附件列表中被删去的元素
                console.log(form.value.stuAttachmentDTOList);
                return i;  // 返回找到的索引
                
              }
            }
            return -1;  // 没找到返回 -1
          })(item.attachment);
          console.log(index);
            
          }
          else{
            message.warning(res.data.message)
            showModal.value = false
          }
          
        })
      }
    };
}

const submit= async ()=>{
  if(form.value.stuSimpleResumeDTO.name==null || form.value.stuSimpleResumeDTO.name.trim()===''){   //姓名
    message.error('请输入姓名')
    return
  }
  if(form.value.stuSimpleResumeDTO.studentId==null || form.value.stuSimpleResumeDTO.studentId.trim()==='' || isValidStudentId(form.value.stuSimpleResumeDTO.studentId)){ //学号
    message.error('请输入20开头的11~13位的学号!')
    return
  }
  if(form.value.stuSimpleResumeDTO.gender==null){     //性别
    message.error('请选择性别')
    return
  }
  if(form.value.stuSimpleResumeDTO.grade==null || isValidGrade(form.value.stuSimpleResumeDTO.grade)){     //年级
    message.error('请输入20xx格式年级!')
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
    message.error('邮箱输入有误!')
    return
  }
  if(form.value.stuSimpleResumeDTO.phoneNumber==null || form.value.stuSimpleResumeDTO.phoneNumber.trim()==='' || isValidPhone(form.value.stuSimpleResumeDTO.phoneNumber)){
    message.error('请输入11位手机号!')
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
  // if(form.value.stuSimpleResumeDTO.image==null || form.value.stuSimpleResumeDTO.image.trim()===''){
  //   message.error('请上传证件照')
  //   return
  // }
  if(form.value.stuSimpleResumeDTO.awards==null || form.value.stuSimpleResumeDTO.awards.trim()===''){
    message.error('请完善获奖经历')
    return
  }
    
    //加载动画
    showModal.value = true
    console.log('打开动画');
    
  //判断是否有证件照
  if((form.value.stuSimpleResumeDTO.image === null || pictureCode === null ) && picture === null){         //返回值即没有图片，也没上传过图片
    message.error('请上传证件照!')
    showModal.value = false
    return
  }
  else if(form.value.stuSimpleResumeDTO.image === null && picture != null){      //没有上传过照片，第一次上传证件照
    console.log('第一次上传证件照');

    //如何判断是否重复上传 —— 不用判断是否重复上传了？直接覆盖？？
    await uploadPicture(storage.token,pictureData).then(res=>{
      console.log(res);
      if(res.data.code === 200){
        form.value.stuSimpleResumeDTO.image = res.data.data           //赋值
        console.log('第一次上传资源成功');
        
      }
      else{
        message.warning(res.data.message)
        showModal.value = false
      }
    }).catch(err=>{
      console.log(err);                  //出错就退出！
      showModal.value = false
    })
  }
  else if(form.value.stuSimpleResumeDTO.image != null && picture != null){
    console.log('有新资源上传,删除老资源');
    await deleteResource(storage.token,form.value.stuSimpleResumeDTO.image).then(res=>{
      if(res.data.code === 200){
        console.log('删除老资源成功');
      }
      else{
        message.warning(res.data.message)
        showModal.value = false
      }
    }).catch(err=>{
      console.log(err);
      showModal.value = false
    })

    //上传新的证件照
    await uploadPicture(storage.token,pictureData).then(res=>{
      console.log(res);
      if(res.data.code === 200){
        form.value.stuSimpleResumeDTO.image = res.data.data           //赋值
        console.log('新证件照上传成功');
      }
      else{
        message.warning(res.data.message)
        showModal.value = false
      }
    }).catch(err=>{
      console.log(err);                  //出错就退出！
      showModal.value = false
    })
  }
  

  if(fileArr.length!=0){          //如果有新附件列表  （如何避免重复上传）
  //开始资源上传,先是附件列表
    console.log('有新增附件');
  
    await uploadFileList(storage.token,fileListData).then(res=>{
      if(res.data.code === 200){
        form.value.stuAttachmentDTOList = []                //将表单数据重置，之后操作统一赋值
        //赋值构造 ，将新的附件列表资源码返回到对象数组
        for(let i=0 ; i<res.data.data.length;i++){
          fileListCode.push({
            filename:fileArr[i].name,
            attachment:res.data.data[i]
          })
          console.log(res.data.data[i]);
          
        }

        console.log(fileListCode);
      }
      else{
        message.warning(res.data.message)
        showModal.value = false
      }

      
      //给简历附件列表数组推进新值
      fileListCode.forEach(item=>{
        form.value.stuAttachmentDTOList.push({
          filename:item.filename,
          attachment:item.attachment
        })
      })
      console.log(form.value.stuAttachmentDTOList);

    }).catch(err=>{
      console.log(err);
      showModal.value = false
    })
  }

  // const upload = document.getElementById('upload');
  // console.log(upload.files);                         //upload可以接收到上传的图片，但是不清楚上传后又删除会怎样
  




  judgDelete().then(()=>{
    submitResume(storage.token,form.value).then(res=>{
      console.log(res);
      if(res.data.code===200){
        message.success('提交成功')
        if(count.value)
          count.value--;
      }
      else{
        message.warning(res.data.message)
        showModal.value = false
      }
    }).catch(err=>{
      console.log(err);
      showModal.value = false
    })
  }).catch(err=>{
    console.log(err);
    showModal.value = false
  })
  showModal.value = false
}

const toActivities=()=>{
  router.push({path:'/glanceActivities'})
}

const toProcess=()=>{
  router.push({path:'/process'})
}

onMounted(()=>{
  if(idStore.getBatchId()!=null)     //如果地址栏不为空
    batchId.value = (idStore.getBatchId() as string)
  else{
    message.error('请先选择你的招新批次!!!')
  }
  form.value.stuSimpleResumeDTO.batchId=parseInt(batchId.value as string)     //将上个页面选择的id，送到当前页面作为不可更改批次使用
  title.value = deCode(params.title as string)
  
  queryResume((batchId.value as string),storage.token).then(res=>{
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
      form.value.stuSimpleResumeDTO.stateCount=res.data.data.stuSimpleResumeVO.submitCount
      //将返回数据赋值给附件列表
      form.value.stuAttachmentDTOList=res.data.data.stuAttachmentVOList
      //对照附件表也拿到了原本资源码
      compareList=res.data.data.stuAttachmentVOList
      pictureCode=res.data.data.stuSimpleResumeVO.image

      dialog.success({
        title: '您已填写简历',
        content: '是否直接查看该批次活下的活动?',
        positiveText: '是',
        negativeText: '否',
        onPositiveClick: () => {
          toActivities()
        },
        onNegativeClick: () => {
        }
      })

      //如果有图片资源码
      if(form.value.stuSimpleResumeDTO.image!=null){
          resourcePreview((form.value.stuSimpleResumeDTO.image)).then(res=>{
          fileList.value = []
            //将二进制的utf8字符码转换为base64码去访问
          const src = `data: image/jpeg;base64,${btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))}`;
          // const byteString = atob(src.split(',')[1]); // 解码 Base64
          // const mimeString = src.split(',')[0].split(':')[1].split(';')[0]; // 获取 MIME 类型

          // // 创建 Uint8Array
          // const ab = new Uint8Array(byteString.length);
          // for (let i = 0; i < byteString.length; i++) {
          //     ab[i] = byteString.charCodeAt(i);
          // }

          // // 创建 Blob
          // const blob = new Blob([ab], { type: mimeString });

          // // 创建 URL
          // const url = URL.createObjectURL(blob);
          // console.log(url);
          
          // fileList.value.push({
          //   id:'a',
          //   status:'finished',
          //   name:'一张照片',
          //   file:src
          // })

          //将图片添加到证件照元素中
          const imgContainer = document.getElementById('imgContainer');
          const img = document.getElementById('img');
          const icon = document.getElementById('icon');
          (imgContainer as HTMLElement).style.display = 'block';
          (icon as HTMLElement).style.display = 'none';
          (img as HTMLImageElement).src = src;
          // const p = document.createElement('img')
          // p.src = src
          // document.body.appendChild(p)
          // console.log(src);
          
        }).catch(err=>{
          console.log(err);
          
        })
      }

      if(form.value.stuAttachmentDTOList.length){     //如果附件列表有长度
        const files = form.value.stuAttachmentDTOList
        files.forEach(item => {
          fileList.value.push({
            id:(item.attachment).toString(),
            status:'finished',
            name:item.filename
          })
          fileListCode.push({
            filename:item.filename,
            attachment:item.attachment
          })
        });
        console.log(fileListCode);
        
      }

    }
    else{       //没填写过简历时
      message.warning('请先填写简历')
    }
  }).catch(err=>{
    console.log(err);
    
  })
  window.addEventListener('resize',watchHeight)
})

watch(()=>form.value.stuSimpleResumeDTO.stateCount,(New,old)=>{
  console.log(old);
  if(New!=null)
     count.value = 3-New
  
})

//监听添加事件，实际文件为file+fileList
const beforeUploadPicture = (event:Event)=>{
  const target = event.target as HTMLInputElement
  console.log(target);
  
  if((target.files as FileList).length){                    //如果文件有长度，即有上传图片
    const imgContainer = document.getElementById('imgContainer')
    const img = document.getElementById('img')
    const icon = document.getElementById('icon')
    let imgUrl = ''

    //设置图片上传需要数据
    picture = ( target.files as FileList)[0];
    
    (imgContainer as HTMLElement).style.display = 'block';
    (icon as HTMLElement).style.display = 'none';
    imgUrl = window.URL.createObjectURL(picture);
    (img as HTMLImageElement).src = imgUrl;

    pictureData.set('file',picture)           //重新设置图片
  }
}

const delImage = ()=>{
  const imgContainer = document.getElementById('imgContainer');
  const img = document.getElementById('img');
  const icon = document.getElementById('icon');

  (img as HTMLImageElement).src = '';
  (imgContainer as HTMLElement).style.display = 'none';
  (icon as HTMLElement).style.display = 'inline-block';
//删除设置的某个图片
  picture = null
  pictureData.delete('file')
  pictureCode = null
}
// const removeUploadPicture = (event)=>{
//   // picture = null
//   // pictureData.delete('file')
// }

// const controlModal = ()=>{
//   const del = document.getElementById('delImg');
//   console.log(del);
  
//   (del as HTMLElement).style.display = 'block';
//   (del as HTMLElement).style.fontSize = '20px';
// }

//监听添加事件，实际文件为file+fileList
const beforeUploadList = (data:{
  file:UploadFileInfo,
  fileList:UploadFileInfo[]
})=>{
  console.log(data.file);
  console.log(data.fileList);
  
  
  fileArr = []


  //区分新增的文件的文件与返回的文件 —— 是否有file属性
  data.fileList.forEach(item=>{
    if(item.file != null){                //只返回有file，不会将曾经上传过后返回来的文件当作新的文件使用
      fileArr.push(item.file)
    }
  })

  //再添加新增文件
  fileArr.push((data.file.file as File))

  //先添加数组，再添加file（新文件）
  //保险起见，每次都先删除file键值，不选择直接覆盖
  fileListData.delete('file')
  //为表单数据逐个新增file进同一个键中，而不能使用set方法!!
  fileArr.forEach((item:File)=>{
    fileListData.append('file',item)
  })
  // console.log(fileListData)
  console.log(fileArr);
  
}

//根据名字移除，如果移除的元素有file，那么直接移除；如果没有，表明是曾经上传过的资源要移除，还需额外移除fileListCode
const removeUploadList = async(data:{
  file:UploadFileInfo,
  fileList:UploadFileInfo[]
})=>{
  
  let newfile = []
  newfile = await data.fileList.filter(async(item:UploadFileInfo)=>{
    console.log(item);
    
    if(item.file===null && data.file.name == item.name){      //如果是要删除的元素，且为曾经上传过的文件

    const index = await (async (code: number) => {
        for (let i = 0; i < fileListCode.length; i++) {
          if (fileListCode[i].attachment === code) {
            return i;  // 返回找到的索引
          }
        }
        return -1;  // 没找到返回 -1
      })(Number(item.id));
      fileListCode.splice(index,1)        //修改目前fileListCode的数组，删去附件列表中被删去的元素

      return ((data.file as UploadFileInfo).name != item.name);
    }
    
    return ((data.file as UploadFileInfo).name != item.name);         //根据名字删除，得到一个根据名字区分的新数组
  })
  //得到新的附件列表数组后

  //重新给表单数组赋值,只赋值有file的，说明是新增的
  fileArr = []
  newfile.forEach(item=>{
    if(item.file!=null){
      fileArr.push(item.file)
    }
    else{
      console.log('这是上传过的文件');
    }

  })
  
  fileListData.delete('file')
  //为表单数据逐个新增file进同一个键中，而不能使用set方法!!
  fileArr.forEach((item:File)=>{
    fileListData.append('file',item)
  })
  console.log(fileListCode);
  
}

const watchHeight=()=>{
  // document.body.style.height = `${pageHeight.value}px`           //使文档恢复初试页面高度
    // (document.getElementById("app") as HTMLElement).style.height = pageHeight.value + "px";
    const vh = pageHeight.value * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

onBeforeUnmount(()=>{
  window.removeEventListener('resize',watchHeight)
})
</script>

<template>
  <div class="resume-layout">
    <navigationTop class="top" :pageHeight="pageHeight"></navigationTop>
    <n-h1 class="header-description">
        {{ title }}
    </n-h1>
    <n-button type="info" @click="toProcess" class="Resumeprocess">简历进度</n-button>
    <n-form
      :model="form"
      label-align="left"
      label-placement="top"
      label-width="10vw"
      id="form"
    >
    <titleBlock title="个人信息" class="title"></titleBlock>
      <n-form-item label="证件照" class="label-width" required>
        <!-- <n-upload
          list-type="image-card"
          :default-file-list="fileList"
          :max="1"
          :default-upload="false"
          accept="image/png,image/jpeg,image/jpg"
          class="photo"
          @before-upload="beforeUploadPicture"
          @remove="removeUploadPicture"
        >
        快来上传你的靓照吧~
        </n-upload> -->
        <div class="content">
          <input type="file" id="upload" @change="beforeUploadPicture">
          <div class="view">
            <div id="imgContainer" >
              <img id="img">
              <div id="img-mask">
                <span id="delImg" @click="delImage">x</span>
              </div>
            </div>
            <span id="icon">+</span>
          </div>
        </div>
      </n-form-item>
      <n-form-item  label="姓名" class="label-width" required >
          <n-input v-model:value="form.stuSimpleResumeDTO.name" class="width" placeholder="请填写姓名"/>
      </n-form-item>
      <n-form-item  label="学号" class="label-width" required>
          <n-input v-model:value="form.stuSimpleResumeDTO.studentId" class="width" placeholder="11~13位学号" />
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
          <n-input v-model:value="form.stuSimpleResumeDTO.grade" class="width" :input-props="{ type:'number' }" placeholder="20xx格式填写"/>
      </n-form-item>
      <n-form-item  label="专业 ( 乱填后果自负!! )" class="label-width" required>
          <n-input v-model:value="form.stuSimpleResumeDTO.major" class="width"/>
      </n-form-item>
      <n-form-item  label="班级 ( 乱填后果自负!! )" class="label-width" required>
          <n-input v-model:value="form.stuSimpleResumeDTO.className" class="width"/>
      </n-form-item>
      <n-form-item  label="邮箱" class="label-width" required>
          <n-input v-model:value="form.stuSimpleResumeDTO.email" class="width" placeholder="请填写常用邮箱"/>
      </n-form-item>
      <n-form-item  label="手机号" class="label-width" required>
          <n-input v-model:value="form.stuSimpleResumeDTO.phoneNumber" class="width" placeholder="请填写常用手机号"/>
      </n-form-item>
      <n-form-item  label="简介" class="label-width" required>
          <n-input v-model:value="form.stuSimpleResumeDTO.introduce" type="textarea" class="width" placeholder="请填写个人简介"/>
      </n-form-item>
      <n-form-item  label="经历" class="label-width" required>
          <n-input v-model:value="form.stuSimpleResumeDTO.experience" type="textarea" class="width" placeholder="请填写个人经历"/>
      </n-form-item>
      <n-form-item  label="获奖经历" class="label-width" required>
          <n-input v-model:value="form.stuSimpleResumeDTO.awards" type="textarea" class="width" placeholder="请填写获奖经历"/>
      </n-form-item>
      <n-form-item  label="加入理由" class="label-width" required>
          <n-input v-model:value="form.stuSimpleResumeDTO.reason" type="textarea" class="width" placeholder="请填写加入理由"/>
      </n-form-item>
      <n-form-item  label="备注" class="label-width" placeholder="可选填备注">
          <n-input v-model:value="form.stuSimpleResumeDTO.remark" class="width"/>
      </n-form-item>
      <div class="space"></div>
      <titleBlock title="附件上传" class="title"></titleBlock>
      <n-form-item label="附件" class="label-width" required>
        <n-upload
          multiple
          directory-dnd
          :default-file-list="fileList"
          default-uoload="false"
          :max="5"
          class="width"
          @before-upload="beforeUploadList"
          @remove="removeUploadList"
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
        <n-button type="warning" secondary @click="toActivities">跳转活动</n-button>
      </n-flex>
      <p class="last-p">目前还剩下<span class="important-span">{{count}}</span>次可提交简历</p>
    </n-form>
    <n-modal :show="showModal">
      <div id="loader" >
        <div id="shadow"></div>
        <div id="box"></div>
      </div>
    </n-modal>
  </div>
</template>

<style scoped>
.resume-layout{
  width:100vw;
  min-height:calc(var(--vh,1vh)*50);
  background-color: #ffffff;
  box-sizing: content-box;
}
.top{
  z-index: 999;
  position: sticky;
  top: 0;
}
.header-description{
  margin: calc(var(--vh,1vh)*1) 0 0 2vw;
  font-size: 1.7rem;
}
.content{
  position:relative;
  width: 30vw;
  height: 30vw;
  background-color: #f3f4f6;;
}
.content input{
  position:absolute;
  opacity: 0;               /*隐藏掉 */
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.view{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
#icon{
  display: inline-block;
  font-size: 40px;
}
#imgContainer{
  position:absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: none;
}

#imgContainer img{
  width: 100%;
  height: 100%;
}

#img-mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    background: rgba(0, 0, 0, .3);
    transition: all .5s ease;
    display: flex;
    justify-content: center;
    align-items: center;
}

#delImg{
  display: block;
}

#imgContainer:hover #img-mask{
  opacity: 1;
} 

.label-width{
  margin: 0 5vw 0 5vw;
  width: 90vw;
  height: auto!important;;
}
.width{
  width: 85vw;
  min-height: calc(var(--vh,1vh)*7);
  line-height: calc(var(--vh,1vh)*7);
  vertical-align: middle;
  border-radius: 3%;
  background-color: #f3f4f6;
}
.space{
  background-color: rgba(255, 255, 255, 0.756);
  height: calc(var(--vh,1vh)*1);
  margin: 0 0 2vh 0;
}
.flex-button{
  width: 90vw;
  padding:0 0 calc(var(--vh,1vh)*1) 0;
  margin:0 6vw 0 auto;
}
.last-button{
  width: 40vw;
  margin:calc(var(--vh,1vh)*1) 0 calc(var(--vh,1vh)*2) 27vw;
}
.last-p{
  text-align: center;
  padding:calc(var(--vh,1vh)*1) 0 calc(var(--vh,1vh)*2) 0;
}
.important-span{
  font-weight: bolder;
  color: rgb(227, 60, 60)
}
.title{
  margin: calc(var(--vh,1vh)*3) 0 calc(var(--vh,1vh)*2) 4vw;
}
.Resumeprocess{
  margin:calc(var(--vh,1vh)*1) 0 0 2vw;
}

/*测试 */
#loader {
  /* Uncomment this to make it run! */
  /*
     animation: loader 5s linear infinite; 
  */
  position: absolute;
  top: calc(50% - 20px);
  left: calc(50% - 20px);
}
@keyframes loader {
  0% { left: -100px }
  100% { left: 110%; }
}
#box {
  width: 50px;
  height: 50px;
  background: #5aa1ff;
  animation: animate .5s linear infinite;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 3px;
}
@keyframes animate {
  17% { border-bottom-right-radius: 3px; }
  25% { transform: translateY(9px) rotate(22.5deg); }
  50% {
    transform: translateY(18px) scale(1,.9) rotate(45deg) ;
    border-bottom-right-radius: 40px;
  }
  75% { transform: translateY(9px) rotate(67.5deg); }
  100% { transform: translateY(0) rotate(90deg); }
} 
#shadow { 
  width: 50px;
  height: 5px;
  background: #000;
  opacity: 0.1;
  position: absolute;
  top: 59px;
  left: 0;
  border-radius: 50%;
  animation: shadow .5s linear infinite;
}
@keyframes shadow {
  50% {
    transform: scale(1.2,1);
  }
}


body {
  background: #6997DB; 
  overflow: hidden;
}
h4 {
  position: absolute;
  bottom: 20px;
  left: 20px;
  margin: 0;
  font-weight: 200;
  opacity: .5;
	font-family: sans-serif;
  color: #fff;
}

</style>
