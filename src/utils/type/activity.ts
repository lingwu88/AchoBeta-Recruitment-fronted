export interface Activity{
  id:number|null,
  paperId:number|null,
  target:{
    anyMatch:{
      grade:Array<number>|null,
      useId:Array<number>|null
    },
    allMatch:{
      status:Array<number>|null
    }
  },
  title:string|null,
  description:string|null,
  isRun:string|null,
  deadline:string|null,
  createTime:string|null
}