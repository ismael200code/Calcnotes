import type { StudentNotesType } from "../types/type"
import moyenGeneral from "./moyen_general"
import calculMoyenWithPercentage from "./moyen_percent"

const calculStudentMoyen = (student: StudentNotesType, percentCompos: number | null = 0): number => {
  // Calculer la moyenne pour les objets de types student

  const controlData: [string, number, number][] = []
  const examData: [string, number, number][] = []

  // Ajout des notes des controles
  if (percentCompos) {
    for (let i = 0; i < student.control.good.length; i++) {
      controlData.push([student.control.good[i][0], student.control.good[i][1], student.control.good[i][2]])
    }
    for (let i = 0; i < student.control.high.length; i++) {
      controlData.push([student.control.high[i][0], student.control.high[i][1], student.control.high[i][2]])
    }
    for (let i = 0; i < student.control.low.length; i++) {
      controlData.push([student.control.low[i][0], student.control.low[i][1], student.control.low[i][2]])
    }
    for (let i = 0; i < student.control.middle.length; i++) {
      controlData.push([student.control.middle[i][0], student.control.middle[i][1], student.control.middle[i][2]])
    }
  }

  // Ajout des notes des examens
  for (let i = 0; i < student.exam.good.length; i++) {
    examData.push([student.exam.good[i][0], student.exam.good[i][1], student.exam.good[i][2]])
  }
  for (let i = 0; i < student.exam.high.length; i++) {
    examData.push([student.exam.high[i][0], student.exam.high[i][1], student.exam.high[i][2]])
  }
  for (let i = 0; i < student.exam.low.length; i++) {
    examData.push([student.exam.low[i][0], student.exam.low[i][1], student.exam.low[i][2]])
  }
  for (let i = 0; i < student.exam.middle.length; i++) {
    examData.push([student.exam.middle[i][0], student.exam.middle[i][1], student.exam.middle[i][2]])
  }

  // Création du tableau de [moyenControl,moyenCompos,coef,nomMatiere]
  const moyenTable: [number, number, number, string][] = []
  if (percentCompos) {
    for (let i = 0; i < controlData.length; i++) {
      for (let n = 0; n < examData.length; n++) {
        if (controlData[i][0] === examData[n][0]) {
          moyenTable.push([controlData[i][1], examData[n][1], controlData[i][2], controlData[i][0]])
        }
      }
    }
  }

  // Création du tableau [moyenMatière,coef,nomMatiere]
  const moyenMatieres: [number, number, string][] = []
  if (percentCompos) {
    for (let i = 0; i < moyenTable.length; i++) {
      const moyenMatiere: number = calculMoyenWithPercentage(percentCompos, moyenTable[i][1], moyenTable[i][0])
      moyenMatieres.push([moyenMatiere, moyenTable[i][2], moyenTable[i][3]])
    }
  }
  for (let i = 0; i < examData.length; i++) {
    moyenMatieres.push([examData[i][1], examData[i][2], examData[i][0]])
  }

  return moyenGeneral(moyenMatieres)
}

export default calculStudentMoyen


//testing function
//  const studentNotes: StudentNotesType = {
//     // Crée un objet ou stoker les notes organiser de l'etudiant
//     control: {
//       low: [
//         ["francais",5,4]
//       ],
//       middle: [],
//       good: [
//         ["anglais",10,3],
//         ["math",12,5]
//       ],
//       high: []
//     },
//     exam: {
//       low: [],
//       middle: [
//         ["francais",10,4]
//       ],
//       good: [
//         ["math",12,5]
//       ],
//       high: [
//         ["anglais",17,3]
//       ]
//     }
//   }


//   console.log(calculStudentMoyen(studentNotes,75/100))