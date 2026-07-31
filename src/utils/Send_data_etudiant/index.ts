import mainAlgo from "../../algo";
import type { DataTypeState, NotesDataEtudiant } from "../../types/data_type";


const sendDataEtudiant = (data: DataTypeState,moyenGoal: number) =>{
  const dataSend = []

  // first boucle for taking unités coef
  for (let i = 0; i< data.etudiant.length; i++) {
    const unitesCoef = data.etudiant[i].coef
    
    // take coef general of matieres in one unite
    let matieresGeneralCoef = 0
    for (let x = 0; x < data.etudiant[i].data.length; x++) {
      matieresGeneralCoef += data.etudiant[i].data[x].coef
    }

    // second boucle for send data into dataSend array
    for (let y = 0; y < data.etudiant[i].data.length; y++) {
      const newData = {id: data.etudiant[i].data[y].unitesId, name: data.etudiant[i].data[y].name, coef: (data.etudiant[i].data[y].coef/matieresGeneralCoef)*unitesCoef, secondCoef:data.etudiant[i].data[y].coef,difficultyExam: data.etudiant[i].data[y].difficultyExam, difficultyTest: data.etudiant[i].data[y].difficultyTest}
      dataSend.push(newData)
    }
  }
  

  return mainAlgo(dataSend,moyenGoal,75/100) as NotesDataEtudiant//Testing if it's works good
}

export default sendDataEtudiant