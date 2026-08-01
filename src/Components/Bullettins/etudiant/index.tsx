import { Fragment, useContext } from "react"
import { DataContext } from "../../../utils/context/data_context"
import takeNotes from "../../../utils/Take_Notes"
import calculMoyenMatiere from "../../../utils/Calcul_Moyen_Matiere"
import calculMoyenUnite from "../../../utils/Calcul_Moyen_Unite"
import tronquerNombre from "../../../utils/Trunc"
import type { NotesDataEtudiant } from "../../../types/data_type"






const BullettinEtudiant = ({data: dataAlgo}:{data: NotesDataEtudiant}) => {

  const [data] = useContext(DataContext)
  const notes = takeNotes(dataAlgo)



  return (
    <table className="font-table">
      <thead>
        <tr className="font-semibold text-sm lg:text-2xl md:text-2xl">
          <td>Matière</td>
          <td>Coef</td>
          <td>C.C</td>
          <td>Exam</td>
          <td>Moyenne</td>
        </tr>
      </thead>
      <tbody className="text-sm lg:text-xl md:text-xl">
      {
        data.etudiant.map((unites)=>(
          <Fragment key={unites.id} >
            <tr className="bg-gray-500">
              <td>UE: {unites.name}</td>
              <td>{unites.coef}</td>
              <td></td>
              <td></td>
              <td>{calculMoyenUnite(unites.id, notes)}</td>
            </tr>
            {notes.map((note)=>{
              if(note.id===unites.id) {
                return (
                  <tr key={(note.name+note.id).replaceAll(" ","")}>
                    <td>{note.name}</td>
                    <td>{note.coef}</td>
                    <td>{note.controlNote}</td>
                    <td>{note.examNote}</td>
                    <td>{tronquerNombre(calculMoyenMatiere(note.controlNote,note.examNote))}</td>
                  </tr>
                )
              }
            })}
          </Fragment>
        ))
      }
      </tbody>
    </table>
  )
}

export default BullettinEtudiant