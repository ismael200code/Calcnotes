import type { NotesDataEtudiant } from "../../types/data_type";



export default function takeNotes(data: NotesDataEtudiant) {
  const notes = {exam:[],control:[]}
  const finalNotes: {id:number,name:string,coef:number,examNote:number,controlNote:number} [] = []
  

  for(let i = 0; i<data.data.exam.low.length; i++) {
    notes.exam.push(data.data.exam.low[i])
  }
    for(let i = 0; i<data.data.exam.middle.length; i++) {
    notes.exam.push(data.data.exam.middle[i])
  }
  for(let i = 0; i<data.data.exam.good.length; i++) {
    notes.exam.push(data.data.exam.good[i])
  }
  for(let i = 0; i<data.data.exam.high.length; i++) {
    notes.exam.push(data.data.exam.high[i])
  }

  for(let i = 0; i<data.data.control.low.length; i++) {
    notes.control.push(data.data.control.low[i])
  }
    for(let i = 0; i<data.data.control.middle.length; i++) {
    notes.control.push(data.data.control.middle[i])
  }
  for(let i = 0; i<data.data.control.good.length; i++) {
    notes.control.push(data.data.control.good[i])
  }
  for(let i = 0; i<data.data.control.high.length; i++) {
    notes.control.push(data.data.control.high[i])
  }


  // finalNotes implement
  for (let i = 0; i<notes.exam.length; i++) {
    const finalNote = {id:notes.exam[i][3],name:notes.exam[i][0],coef:notes.exam[i][4],examNote:notes.exam[i][1],controlNote:0}
    for (let x = 0; x<notes.control.length; x++) {
      if (notes.control[x][0]===finalNote.name) {
        finalNote.controlNote = notes.control[x][1]
        break
      }
    }
    finalNotes.push(finalNote)
  }



  return finalNotes
}