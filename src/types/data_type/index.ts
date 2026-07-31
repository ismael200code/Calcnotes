export interface DataTypeEtudiant {
  id: number
  unitesId: number
  name: string
  coef: number
  difficultyExam: 'low' | 'middle' | 'good' | 'high'
  difficultyTest: 'low' | 'middle' | 'good' | 'high'

}
export interface DataTypeEleve {
  id: number
  name: string
  coef: number
  difficultyMoyenne: 'low' | 'middle' | 'good' | 'high'
}
export type DataTypeState = {
  etudiant: { id: number, name: string, coef: number, data: DataTypeEtudiant[] }[],//[string,DataTypeEtudiant [],string,number] [],
  eleve: DataTypeEleve[]
  moyenneEleve: number 
  moyenneEtudiant: number 
}
export interface BullettinsData {
  control: {
    low: DataTypeEleve[]
    good: DataTypeEleve[]
    middle: DataTypeEleve[]
    high: DataTypeEleve[]
  }
  exam: {
    low: DataTypeEtudiant[]
    good: DataTypeEtudiant[]
    middle: DataTypeEtudiant[]
    high: DataTypeEtudiant[]
  }
}
export interface NotesDataEleve {
  code: number
  message: string
  data: {
    low: []
    middle: []
    good: []
    high: []
  } | boolean
  moyenne: number
}
export interface NotesDataEtudiant {
  code: number
  message: string
  data: {
    exam: {
      low: []
      middle: []
      good: []
      high: []
    },
    control: {
      low: []
      middle: []
      good: []
      high: []
    }

  }
  moyenne: number
}

export type DataContextType = [
  DataTypeState, React.Dispatch<React.SetStateAction<DataTypeState>>
]
