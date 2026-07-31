import { Link, Navigate, useParams } from "react-router-dom";
import Nav from "../../Components/Navigation";
import { useContext } from "react";
import { DataContext } from "../../utils/context/data_context";
import sendDataEleve from "../../utils/Send_Data_eleve";
import sendDataEtudiant from "../../utils/Send_data_etudiant";
import BullettinEleve from "../../Components/Bullettins/eleve";
import tronquerNombre from "../../utils/Trunc";
import type { NotesDataEleve, NotesDataEtudiant } from "../../types/data_type";
import BullettinEtudiant from "../../Components/Bullettins/etudiant";



function Resultat() {
  const { studentStatut } = useParams()
  const [data] = useContext(DataContext)

  if (studentStatut === "eleve") {
    if (data.eleve.length < 2 || !data.moyenneEleve) {

      return (
        <div className=" flex justify-center items-center">
          <div className="flex flex-col justify-center">
            <h2 className="text-center text-2xl font-bold">Erreur:</h2>
            <p className="text-center">Il n'y a pas assez de données pour faire la simulation: <i>Données manquante</i></p>
            <Link to={`/config/${studentStatut}`} className="p-3 bg-red-500 rounded-xl mt-6 text-center">revenir</Link>
          </div>
        </div>
      )
    }
    const dataBullettinEleve: NotesDataEleve = sendDataEleve(data.eleve, data.moyenneEleve)
    const moyenne = tronquerNombre(dataBullettinEleve.moyenne)
    if (dataBullettinEleve.code===200 || dataBullettinEleve.code===300) {
      return (
        <div>
          <Nav link={"config/" + studentStatut} name="Resultat" />
          <div className="flex flex-col justify-center items-center mt-5">
            <p className="italic text-center">{dataBullettinEleve.message}</p>
            <h3 className="font-semibold mt-3">Moyenne obtennu: {moyenne}</h3>
            <BullettinEleve data={dataBullettinEleve} />
          </div>
        </div>
      )
    }
    else if(dataBullettinEleve.code===100) {
      return(
        <div>
          <Nav link={"config/" + studentStatut} name="Resultat" />
          <div className="flex flex-col justify-center items-center mt-5">
            <p className="italic text-center">{dataBullettinEleve.message}</p>
          </div>
        </div>
      )
    }

  }
  else if (studentStatut === "etudiant") {
    if (data.etudiant.length < 0 || !data.moyenneEtudiant) {

      return (
        <div className=" flex justify-center items-center">
          <div className="flex flex-col justify-center">
            <h2 className="text-center text-2xl font-bold">Erreur:</h2>
            <p className="text-center">Il n'y a pas assez de données pour faire la simulation: <i>Données manquante</i></p>
            <Link to={`/config/${studentStatut}`} className="p-3 bg-red-500 rounded-xl mt-6 text-center">revenir</Link>
          </div>
        </div>
      )
    }
    const dataBullettinEtudiant: NotesDataEtudiant = sendDataEtudiant(data, data.moyenneEtudiant)
    const moyenne = tronquerNombre(dataBullettinEtudiant.moyenne)
    if (dataBullettinEtudiant.code===200 || dataBullettinEtudiant.code===300) {
      return (
        <div>
          <Nav link={"config/" + studentStatut} name="Resultat" />
          <div className="flex flex-col justify-center items-center mt-5">
            <p className="italic text-center">{dataBullettinEtudiant.message}</p>
            <h3 className="font-semibold mt-3">Moyenne obtennu: {moyenne}</h3>
            <BullettinEtudiant data={dataBullettinEtudiant} />
          </div>
        </div>
      )
    }
    else if(dataBullettinEtudiant.code===100) {
      return(
        <div>
          <Nav link={"config/" + studentStatut} name="Resultat" />
          <div className="flex flex-col justify-center items-center mt-5">
            <p className="italic text-center">{dataBullettinEtudiant.message}</p>
          </div>
        </div>
      )
    }
  }
  return <Navigate to="/" />
}
export default Resultat