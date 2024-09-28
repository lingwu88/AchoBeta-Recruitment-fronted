export interface attachmentList{
  filename:string, //文件名
  attachment:number //附件列表资源码
}

export interface formType{
  stuSimpleResumeDTO:{
    batchId: number|null,    //招新批次
    studentId:string|null,       //学号
    name:string|null,   //姓名
    gender:number|null, //性别
    grade:number|null,  //年级
    major:string|null,  //专业
    className:string|null,  //班级
    email:string|null,  //邮箱
    phoneNumber:string|null,  //phoneNumber
    reason:string|null, //加入AB的理由
    introduce:string|null, //简介
    experience:string|null, //经历
    image:number|null,  //资源码
    awards:string|null, //获奖经历
    remark:string|null, //备注
    stateCount:number|null
  },
  stuAttachmentDTOList:attachmentList[]
}