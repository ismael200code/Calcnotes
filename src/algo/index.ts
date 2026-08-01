import type { DataUser, StudentNotesType } from "./types/type"
import moyenGeneral from "./utils/moyen_general"
import calculMoyenWithPercentage from "./utils/moyen_percent"
import calculStudentMoyen from "./utils/student_moyen"



function mainAlgo (arrayData: DataUser[], moyenGoal: number, percentCompos: number | null = 0) {


  // 1. Collecte des données:
  if (arrayData.length === 0) return false
  if (!moyenGoal) return {code:500,data:false}
  const difficulty = {
    low: [0, 1, 2, 3, 4],
    middle: [5, 6, 7, 8, 9],
    good: [10, 11, 12, 13, 14],
    high: [15, 16, 17, 18, 19]
  }


  // 2. Verifier si la moyenne recherchée est atteignable
  const notesVerify = []
  for (let i = 0; i < arrayData.length; i++) {
    const moyenControl = difficulty[arrayData[i].difficultyTest][4]
    const moyenExam = difficulty[arrayData[i].difficultyExam][4]
    const moyen = percentCompos ? calculMoyenWithPercentage(percentCompos, moyenExam, moyenControl) : moyenExam
    const coef = arrayData[i].coef
    notesVerify.push([moyen, coef])
  }
  const resultVerify: number = moyenGeneral(notesVerify)
  if (resultVerify < moyenGoal) {
    return {code: 100,message:"Impossible d'obtenir la moyenne voulu. Modifier les estimations.", moyenne:resultVerify, data:false}
  }


  // 3. Chercher la moyenne general avec la moyenne des broches de notes
  const notesMoyennes = []
  for (let i = 0; i < arrayData.length; i++) {
    const moyenControl = difficulty[arrayData[i].difficultyTest][2]
    const moyenExam = difficulty[arrayData[i].difficultyExam][2]
    const moyen = percentCompos ? calculMoyenWithPercentage(percentCompos, moyenExam, moyenControl) : moyenExam
    const coef = arrayData[i].coef
    notesMoyennes.push([moyen, coef])
  }
  const resultMoyenne = moyenGeneral(notesMoyennes)
  



  // 4. Modification des notes si resultat non satisfaisante
  const studentNotes: StudentNotesType = {
    // Crée un objet où stoker les notes organiser de l'etudiant
    control: {
      low: [],
      middle: [],
      good: [],
      high: []
    },
    exam: {
      low: [],
      middle: [],
      good: [],
      high: []
    }
  }

  for (let i = 0; i < arrayData.length; i++) {
    // Remplir les données des notes de l'etudiants
    if (percentCompos) {
      studentNotes.control[arrayData[i].difficultyTest].push([arrayData[i].name, difficulty[arrayData[i].difficultyTest][2], arrayData[i].coef,arrayData[i].id,arrayData[i].secondCoef])
    }
    studentNotes.exam[arrayData[i].difficultyExam].push([arrayData[i].name, difficulty[arrayData[i].difficultyExam][2], arrayData[i].coef,arrayData[i].id,arrayData[i].secondCoef])
  }
  

  if (resultMoyenne >= moyenGoal && resultMoyenne < moyenGoal + 1) return {code:200, message:"Moyenne atteignable !", moyenne:resultMoyenne, data:studentNotes}

  // resultat < moyenGoal
  if (resultMoyenne < moyenGoal) {

    // Itération 1
    //boucle d'addition exam good=>middle=>low=>high
    for (let i = 0; i < studentNotes.exam.good.length; i++) {
      studentNotes.exam.good[i][1] += 1
      const currentMoyen = percentCompos ? calculStudentMoyen(studentNotes, percentCompos) : calculStudentMoyen(studentNotes)
      if (currentMoyen >= moyenGoal) return {code:200, message:"Moyenne atteignable !", moyenne:currentMoyen, data:studentNotes}
    }
    for (let i = 0; i < studentNotes.exam.middle.length; i++) {
      studentNotes.exam.middle[i][1] += 1
      const currentMoyen = percentCompos ? calculStudentMoyen(studentNotes, percentCompos) : calculStudentMoyen(studentNotes)
      if (currentMoyen >= moyenGoal) return {code:200, message:"Moyenne atteignable !", moyenne:currentMoyen, data:studentNotes}
    }
    for (let i = 0; i < studentNotes.exam.low.length; i++) {
      studentNotes.exam.low[i][1] += 1
      const currentMoyen = percentCompos ? calculStudentMoyen(studentNotes, percentCompos) : calculStudentMoyen(studentNotes)
      if (currentMoyen >= moyenGoal) return {code:200, message:"Moyenne atteignable !", moyenne:currentMoyen, data:studentNotes}
    }
    for (let i = 0; i < studentNotes.exam.high.length; i++) {
      studentNotes.exam.high[i][1] += 1
      const currentMoyen = percentCompos ? calculStudentMoyen(studentNotes, percentCompos) : calculStudentMoyen(studentNotes)
      if (currentMoyen >= moyenGoal) return {code:200, message:"Moyenne atteignable !", moyenne:currentMoyen, data:studentNotes}
    }

    //boucle d'addition control good=>middle=>low=>high
    if (percentCompos) {
      for (let i = 0; i < studentNotes.control.good.length; i++) {
        studentNotes.control.good[i][1] += 1
        const currentMoyen = calculStudentMoyen(studentNotes, percentCompos)
        if (currentMoyen >= moyenGoal) return {code:200, message:"Moyenne atteignable !", moyenne:currentMoyen, data:studentNotes}
      }
      for (let i = 0; i < studentNotes.control.middle.length; i++) {
        studentNotes.control.middle[i][1] += 1
        const currentMoyen = calculStudentMoyen(studentNotes, percentCompos)
        if (currentMoyen >= moyenGoal) return {code:200, message:"Moyenne atteignable !", moyenne:currentMoyen, data:studentNotes}
      }
      for (let i = 0; i < studentNotes.control.low.length; i++) {
        studentNotes.control.low[i][1] += 1
        const currentMoyen = calculStudentMoyen(studentNotes, percentCompos)
        if (currentMoyen >= moyenGoal) return {code:200, message:"Moyenne atteignable !", moyenne:currentMoyen, data:studentNotes}
      }
      for (let i = 0; i < studentNotes.control.high.length; i++) {
        studentNotes.control.high[i][1] += 1
        const currentMoyen = calculStudentMoyen(studentNotes, percentCompos)
        if (currentMoyen >= moyenGoal) return {code:200, message:"Moyenne atteignable !", moyenne:currentMoyen, data:studentNotes}
      }
    }

    // Itération 2
    //boucle d'addition exam good=>middle=>low=>high
    for (let i = 0; i < studentNotes.exam.good.length; i++) {
      studentNotes.exam.good[i][1] += 1
      const currentMoyen = percentCompos ? calculStudentMoyen(studentNotes, percentCompos) : calculStudentMoyen(studentNotes)
      if (currentMoyen >= moyenGoal) return {code:200, message:"Moyenne atteignable !", moyenne:currentMoyen, data:studentNotes}
    }
    for (let i = 0; i < studentNotes.exam.middle.length; i++) {
      studentNotes.exam.middle[i][1] += 1
      const currentMoyen = percentCompos ? calculStudentMoyen(studentNotes, percentCompos) : calculStudentMoyen(studentNotes)
      if (currentMoyen >= moyenGoal) return {code:200, message:"Moyenne atteignable !", moyenne:currentMoyen, data:studentNotes}
    }
    for (let i = 0; i < studentNotes.exam.low.length; i++) {
      studentNotes.exam.low[i][1] += 1
      const currentMoyen = percentCompos ? calculStudentMoyen(studentNotes, percentCompos) : calculStudentMoyen(studentNotes)
      if (currentMoyen >= moyenGoal) return {code:200, message:"Moyenne atteignable !", moyenne:currentMoyen, data:studentNotes}
    }
    for (let i = 0; i < studentNotes.exam.high.length; i++) {
      studentNotes.exam.high[i][1] += 1
      const currentMoyen = percentCompos ? calculStudentMoyen(studentNotes, percentCompos) : calculStudentMoyen(studentNotes)
      if (currentMoyen >= moyenGoal) return {code:200, message:"Moyenne atteignable !", moyenne:currentMoyen, data:studentNotes}
    }

    //boucle d'addition control good=>middle=>low=>high
    if (percentCompos) {
      for (let i = 0; i < studentNotes.control.good.length; i++) {
        studentNotes.control.good[i][1] += 1
        const currentMoyen = calculStudentMoyen(studentNotes, percentCompos)
        if (currentMoyen >= moyenGoal) return {code:200, message:"Moyenne atteignable !", moyenne:currentMoyen, data:studentNotes}
      }
      for (let i = 0; i < studentNotes.control.middle.length; i++) {
        studentNotes.control.middle[i][1] += 1
        const currentMoyen = calculStudentMoyen(studentNotes, percentCompos)
        if (currentMoyen >= moyenGoal) return {code:200, message:"Moyenne atteignable !", moyenne:currentMoyen, data:studentNotes}
      }
      for (let i = 0; i < studentNotes.control.low.length; i++) {
        studentNotes.control.low[i][1] += 1
        const currentMoyen = calculStudentMoyen(studentNotes, percentCompos)
        if (currentMoyen >= moyenGoal) return {code:200, message:"Moyenne atteignable !", moyenne:currentMoyen, data:studentNotes}
      }
      for (let i = 0; i < studentNotes.control.high.length; i++) {
        studentNotes.control.high[i][1] += 1
        const currentMoyen = calculStudentMoyen(studentNotes, percentCompos)
        if (currentMoyen >= moyenGoal) return {code:200, message:"Moyenne atteignable !", moyenne:currentMoyen, data:studentNotes}
      }
    }



  }


  // Resultat > moyenGoal

  // Itération 1
  //boucle de soustraction exam high=>low=>good=>middle
  for (let i = 0; i < studentNotes.exam.high.length; i++) {
    studentNotes.exam.high[i][1] -= 1
    const currentMoyen = percentCompos ? calculStudentMoyen(studentNotes, percentCompos) : calculStudentMoyen(studentNotes)
    if (currentMoyen <= moyenGoal + 0.8) return {code:200, message:"Moyenne atteignable !", moyenne:currentMoyen, data:studentNotes}
  }
  for (let i = 0; i < studentNotes.exam.low.length; i++) {
    studentNotes.exam.low[i][1] -= 1
    const currentMoyen = percentCompos ? calculStudentMoyen(studentNotes, percentCompos) : calculStudentMoyen(studentNotes)
    if (currentMoyen <= moyenGoal + 0.8) return {code:200, message:"Moyenne atteignable !", moyenne:currentMoyen, data:studentNotes}
  }
  for (let i = 0; i < studentNotes.exam.good.length; i++) {
    studentNotes.exam.good[i][1] -= 1
    const currentMoyen = percentCompos ? calculStudentMoyen(studentNotes, percentCompos) : calculStudentMoyen(studentNotes)
    if (currentMoyen <= moyenGoal + 0.8) return {code:200, message:"Moyenne atteignable !", moyenne:currentMoyen, data:studentNotes}
  }
  for (let i = 0; i < studentNotes.exam.middle.length; i++) {
    studentNotes.exam.middle[i][1] -= 1
    const currentMoyen = percentCompos ? calculStudentMoyen(studentNotes, percentCompos) : calculStudentMoyen(studentNotes)
    if (currentMoyen <= moyenGoal + 0.8) return {code:200, message:"Moyenne atteignable !", moyenne:currentMoyen, data:studentNotes}
  }

  //boucle de soustraction control high=>low=>good=>middle
  if (percentCompos) {
    for (let i = 0; i < studentNotes.control.high.length; i++) {
      studentNotes.control.high[i][1] += 1
      const currentMoyen = calculStudentMoyen(studentNotes, percentCompos)
      if (currentMoyen <= moyenGoal + 0.8) return {code:200, message:"Moyenne atteignable !", moyenne:currentMoyen, data:studentNotes}
    }
    for (let i = 0; i < studentNotes.control.low.length; i++) {
      studentNotes.control.low[i][1] += 1
      const currentMoyen = calculStudentMoyen(studentNotes, percentCompos)
      if (currentMoyen <= moyenGoal + 0.8) return {code:200, message:"Moyenne atteignable !", moyenne:currentMoyen, data:studentNotes}
    }
    for (let i = 0; i < studentNotes.control.good.length; i++) {
      studentNotes.control.good[i][1] += 1
      const currentMoyen = calculStudentMoyen(studentNotes, percentCompos)
      if (currentMoyen <= moyenGoal + 0.8) return {code:200, message:"Moyenne atteignable !", moyenne:currentMoyen, data:studentNotes}
    }
    for (let i = 0; i < studentNotes.control.middle.length; i++) {
      studentNotes.control.middle[i][1] += 1
      const currentMoyen = calculStudentMoyen(studentNotes, percentCompos)
      if (currentMoyen <= moyenGoal + 0.8) return {code:200, message:"Moyenne atteignable !", moyenne:currentMoyen, data:studentNotes}
    }
  }


  // Itération 2
  //boucle de soustraction exam high=>low=>good=>middle
  for (let i = 0; i < studentNotes.exam.high.length; i++) {
    studentNotes.exam.high[i][1] -= 1
    const currentMoyen = percentCompos ? calculStudentMoyen(studentNotes, percentCompos) : calculStudentMoyen(studentNotes)
    if (currentMoyen <= moyenGoal + 0.8) return {code:200, message:"Moyenne atteignable !", moyenne:currentMoyen, data:studentNotes}
  }
  for (let i = 0; i < studentNotes.exam.low.length; i++) {
    studentNotes.exam.low[i][1] -= 1
    const currentMoyen = percentCompos ? calculStudentMoyen(studentNotes, percentCompos) : calculStudentMoyen(studentNotes)
    if (currentMoyen <= moyenGoal + 0.8) return {code:200, message:"Moyenne atteignable !", moyenne:currentMoyen, data:studentNotes}
  }
  for (let i = 0; i < studentNotes.exam.good.length; i++) {
    studentNotes.exam.good[i][1] -= 1
    const currentMoyen = percentCompos ? calculStudentMoyen(studentNotes, percentCompos) : calculStudentMoyen(studentNotes)
    if (currentMoyen <= moyenGoal + 0.8) return {code:200, message:"Moyenne atteignable !", moyenne:currentMoyen, data:studentNotes}
  }
  for (let i = 0; i < studentNotes.exam.middle.length; i++) {
    studentNotes.exam.middle[i][1] -= 1
    const currentMoyen = percentCompos ? calculStudentMoyen(studentNotes, percentCompos) : calculStudentMoyen(studentNotes)
    if (currentMoyen <= moyenGoal + 0.8) return {code:200, message:"Moyenne atteignable !", moyenne:currentMoyen, data:studentNotes}
  }

  //boucle de soustraction control high=>low=>good=>middle
  if (percentCompos) {
    for (let i = 0; i < studentNotes.control.high.length; i++) {
      studentNotes.control.high[i][1] += 1
      const currentMoyen = calculStudentMoyen(studentNotes, percentCompos)
      if (currentMoyen <= moyenGoal + 0.8) return {code:200, message:"Moyenne atteignable !", moyenne:currentMoyen, data:studentNotes}
    }
    for (let i = 0; i < studentNotes.control.low.length; i++) {
      studentNotes.control.low[i][1] += 1
      const currentMoyen = calculStudentMoyen(studentNotes, percentCompos)
      if (currentMoyen <= moyenGoal + 0.8) return {code:200, message:"Moyenne atteignable !", moyenne:currentMoyen, data:studentNotes}
    }
    for (let i = 0; i < studentNotes.control.good.length; i++) {
      studentNotes.control.good[i][1] += 1
      const currentMoyen = calculStudentMoyen(studentNotes, percentCompos)
      if (currentMoyen <= moyenGoal + 0.8) return {code:200, message:"Moyenne atteignable !", moyenne:currentMoyen, data:studentNotes}
    }
    for (let i = 0; i < studentNotes.control.middle.length; i++) {
      studentNotes.control.middle[i][1] += 1
      const currentMoyen = calculStudentMoyen(studentNotes, percentCompos)
      if (currentMoyen <= moyenGoal + 0.8) return {code:200, message:"Moyenne atteignable !", moyenne:currentMoyen, data:studentNotes}
    }
  }

  return {code: 300,message:"Moyenne la plus basse possible avec vos niveaux selectionné", moyenne:calculStudentMoyen(studentNotes, percentCompos), data:studentNotes}

}







export default mainAlgo

// // Testing Zone
// const testData: DataUser[] = [
//   {
//     name: "math",
//     coef: 5,
//     difficultyExam: 'high',
//     difficultyTest: "middle"
//   },
//   {
//     name: "francais",
//     coef: 4,
//     difficultyExam: "good",
//     difficultyTest: "middle"
//   },
//   {
//     name: "anglais",
//     coef: 3,
//     difficultyExam: "middle",
//     difficultyTest: "high"
//   },
//   {
//     name: "svt",
//     coef: 4,
//     difficultyExam: "middle",
//     difficultyTest: "good"
//   },
// ]

// console.log(main(testData, 17))
