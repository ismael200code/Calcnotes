import mainAlgo from "../../algo";
import type { DataTypeEleve, NotesDataEleve } from "../../types/data_type";


const sendDataEleve = (data: DataTypeEleve[], moyenGoal: number) => {
  const dataSend = []
  for (let i = 0; i < data.length; i++) {
    const newData = { id: 0, name: data[i].name, coef: data[i].coef,secondCoef:data[i].coef, difficultyExam: data[i].difficultyMoyenne, difficultyTest: 'low' }
    dataSend.push(newData)
  }
  return mainAlgo(dataSend, moyenGoal) as NotesDataEleve
}

export default sendDataEleve