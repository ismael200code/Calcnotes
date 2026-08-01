export interface DataUser {
  id: number
  name: string
  coef: number
  secondCoef:number
  difficultyExam: 'low' | 'middle' | 'good' | 'high'
  difficultyTest: 'low' | 'middle' | 'good' | 'high'
}
export interface StudentNotesType {
  control: {
    low: [string, number, number,number,number][]
    middle: [string, number, number,number,number][]
    good: [string, number, number,number,number][]
    high: [string, number, number,number,number][]
  }
  exam: {
    low: [string, number, number,number,number][]
    middle: [string, number, number,number,number][]
    good: [string, number, number,number,number][]
    high: [string, number, number,number,number][]
  }
}
export interface DataTypeEleve {
    id: number
    name: string
    coef: number
    difficultyMoyenne: 'low' | 'middle' | 'good' | 'high'
}