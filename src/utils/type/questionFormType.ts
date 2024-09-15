export interface QuestionAnswer {
  questionId:number|null,
  answer:string|null
}


export interface questionForm{
  participationId:number|null,
  questionAnswerDTOS:QuestionAnswer[],
  periodIds:number[]
}